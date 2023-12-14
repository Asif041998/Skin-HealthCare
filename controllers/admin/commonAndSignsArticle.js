const Article = require("../../models/admin/articles");
const { Op } = require("sequelize");
const ArticleImage = require("../../models/admin/articleImages");
const ArticleRoutine = require("../../models/admin/articleRoutine");
const ArticleVideo = require("../../models/admin/articleVideos");
const ValidateId = require("../../services/exceptionHandling");
const skinIndexArticlesPostValidation = require("../../validations/admin/skinIndexArticles/skinArticlesPost");
const skinIndexArticlesPutValidation = require("../../validations/admin/skinIndexArticles/skinArticlesPost");
const { promises } = require("fs");
const { skincareRoutine101 } = require("./skincareRoutine101");
const SkincareSuggestion = require("../../models/admin/skincareSuggestion");

// CREATE THE SKIN HEALTH INDEXES
exports.createSkinHealthIndex = async (req, res) => {
  try {
    const { error } = skinIndexArticlesPostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const {
      title,
      description,
      image,
      article_content,
      article_type,
      status,
      screen_image,
      screen_image_title,
      content_type,
    } = req.body;

    const existingArticle = await Article.findOne({
      where: { title, article_type },
    });

    if (existingArticle) {
      return res
        .status(409)
        .json({
          message: `Article of type '${article_type}' with this title already exists`,
        });
    }

    const skinArticle = await Article.create({
      title,
      description,
      article_content,
      article_type,
      status,
      screen_image,
      screen_image_title,
      content_type,
    });

    const articleId = skinArticle.id;

    const imageArray = await Promise.all(
      image.map(async (result) => {
        return ArticleImage.create({
          image_url: result,
          article_id: articleId,
        });
      })
    );

    const data = {
      id: skinArticle.id,
      title,
      description,
      image: image,
      article_content,
      article_type,
      status,
      screen_image,
      screen_image_title,
      content_type,
    };

    return res.status(201).json({
      message: "Skin health index uploaded successfully",
      data,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// UPDATE SKIN HEALTH INDEX BY ID
exports.updateSkinHealthIndex = async (req, res) => {
  try {
    //  const { error } = skinIndexArticlesPutValidation(req.body);
    // if (error) {
    //     return res.status(400).send({ error: error.details[0].message });
    // }
    const id = req.params.id;
    const exceptionResult = await ValidateId(id);
    if (exceptionResult) return res.status(400).json(exceptionResult);

    const updateData = req.body;
    let updatedData = null;

    if (
      updateData.article_type === "Common skin conditions" ||
      updateData.article_type === "Skin signs of health"
    ) {
      const articleTypeCheck = await Article.findOne({
        where: { article_type: updateData.article_type, id: id },
      });

      if (!articleTypeCheck) {
        return res
          .status(200)
          .json({
            message: `This id doesn't belong to ${updateData.article_type} article`,
            data: [],
          });
      }

      const [rowsUpdated, updatedRecords] = await Article.update(updateData, {
        where: { id: id },
      });

      if (rowsUpdated === 0) {
        return res
          .status(400)
          .json({ message: `No ${updateData.article_type} data updated` });
      }

      updatedData = await Article.findByPk(id);
    } else
      return res
        .status(400)
        .json({ message: "No such article found with this name", data: [] });

    if (updateData.image) {
      const articleImages = await ArticleImage.findAll({
        where: { article_id: id },
      });

      await ArticleImage.destroy({ where: { article_id: id } });
      const imagePromises = await Promise.all(
        updateData.image.map(async (result) => {
          const createArticleImage = await ArticleImage.create({
            image_url: result,
            article_id: id,
          });

          return createArticleImage;
        })
      );
    }

    const updatedImage = await ArticleImage.findAll({
      where: { article_id: id },
    });
    const response = {
      id: updatedData.id,
      title: updatedData.title,
      description: updatedData.description,
      image: updatedImage.map((img) => img.image_url),
      article_content: updatedData.article_content,
      article_type: updatedData.article_type,
      screen_image: updateData.screen_image,
      content_type: updateData.content_type,
      status: updatedData.status,
    };

    return res.status(200).json({ message : "Skin health index updated successfully",
        response
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// DELETE THE ARTICLE BY ID
exports.deleteSkinHealthIndex = async (req, res) => {
  try {
    const { id } = req.params;
    const articleType = req.query.article_type;

    const exceptionResult = await ValidateId(id);
    if (exceptionResult) {
      return res.status(400).json(exceptionResult);
    }

    let articleModel;

    if (
      articleType === "Common skin conditions" ||
      articleType === "Skin signs of health"
    ) {
      articleModel = Article;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid article_type", data: [] });
    }

    const article = await articleModel.findOne({
      where: { id, article_type: articleType },
    });

    if (!article) {
      return res.status(200).json({
        message: `Article with type '${articleType}' and ID ${id} not found`,
        data: [],
      });
    }

    await ArticleImage.destroy({ where: { article_id: id } });
    await article.destroy();

    return res.status(200).json({
      message: `Article with type '${articleType}' and ID ${id} deleted successfully`,
      data: [],
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET ALL THE SKIN HEALTH INDEX DETAILS
const getDataRoutine101 = async (data) => {
  const result = await Promise.all(
    data.map(async (article) => {
      const articleId = article.id;
      const routines = await ArticleRoutine.findAll({
        where: { article_id: articleId },
      });

      const videos = await ArticleVideo.findOne({
        where: { article_id: articleId },
      });
      const routineDataMap = new Map();

      for (const routine of routines) {
        if (!routineDataMap.has(routine.routine_type)) {
          routineDataMap.set(routine.routine_type, {
            routine_type: routine.routine_type,
            product: [],
            treatment: [],
          });
        }

        const suggestionIds = routine.skincare_suggestion_id;
        const suggestions = await SkincareSuggestion.findAll({
          where: {
            id: suggestionIds,
          },
        });

        const routineData = routineDataMap.get(routine.routine_type);

        for (const suggestion of suggestions) {
          const suggestionData = {
            id: suggestion.id,
            name: suggestion.name,
            image_url: suggestion.image_url,
            price: suggestion.price,
            description: suggestion.description,
            quantity: suggestion.quantity,
          };

          if (suggestion.suggestion_type === "Product") {
            routineData.product.push(suggestionData);
          } else if (suggestion.suggestion_type === "Treatment") {
            routineData.treatment.push(suggestionData);
          }
        }
      }

      return {
        id: article.id,
        title: article.title,
        description: article.description,
        article_content: article.article_content,
        article_type: article.article_type,
        content_type: article.content_type,
        screen_image: article.screen_image,
        screen_image_title: article.screen_image_title,
        status: article.status,
        routine: Array.from(routineDataMap.values()),
        video_title: videos ? videos.video_title : null,
        thumbnail_url: videos ? videos.thumbnail_url : null,
        video_url: videos ? videos.video_url : null,
      };
    })
  );
  return result;
};

const getDataWithImages = async (data) => {
  const result = await Promise.all(
    data.map(async (item) => {
      const articleId = item.id;
      const articleImages = await ArticleImage.findAll({
        where: { article_id: articleId },
        attributes: { exclude: ["id", "article_id", "createdAt", "updatedAt"] },
      });
      const imageUrls = articleImages.map((image) => image.image_url);

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        image: imageUrls,
        article_content: item.article_content,
        article_type: item.article_type,
        screen_image: item.screen_image,
        screen_image_title: item.screen_image_title,
        content_type: item.content_type,
        status: item.status,
      };
    })
  );

  return result;
};

exports.getSkinHealthIndex = async (req, res) => {
  try {
    const skinCondition = await getDataWithImages(
      await Article.findAll({
        where: { article_type: "Common skin conditions" },
      })
    );

    const skinSigns = await getDataWithImages(
      await Article.findAll({ where: { article_type: "Skin signs of health" } })
    );

    const skinRoutine101CommonArticle = await getDataWithImages(
      await Article.findAll({
        where: {
          article_type: "Skincare Routine 101",
          content_type: "commonArticle",
        },
      })
    );

    const skinRoutine101CommonSkinCareRoutineArticle = await getDataRoutine101(
      await Article.findAll({
        where: {
          article_type: "Skincare Routine 101",
          content_type: "commonSkinCareRoutineArticle",
        },
      })
    );

    res.status(200).json({
      data: {
        skinCondition,
        skinSigns,
        skinRoutine101: skinRoutine101CommonArticle.concat(
          skinRoutine101CommonSkinCareRoutineArticle
        ),
      },
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//GET BY ID
exports.getSkinHealthIndexById = async (req, res) => {
  try {
    const id = req.params.id;
    const exceptionResult = await ValidateId(id);
    if (exceptionResult) return res.status(400).json(exceptionResult);

    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(200).json({ message: "Article not found", data: [] });
    }
    const articleImages = await ArticleImage.findAll({
      where: { article_id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const image = articleImages.map((image) => image.image_url);
    const data = {
      id: article.id,
      title: article.title,
      description: article.description,
      article_content: article.article_content,
      article_type: article.article_type,
      screen_image: article.screen_image,
      screen_image_title: article.screen_image_title,
      content_type: article.content_type,
      image: image,
    };

    return res.status(200).json({
      message: "Article fetched successfully",
      data,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
