const con = require("../../database/connection");
const skincareRoutine101PostValidations = require("../../validations/admin/articleRoutine/post");
const skincareRoutine101PutValidations = require("../../validations/admin/articleRoutine/put");
const Article = require("../../models/admin/articles");
const ArticleVideo = require("../../models/admin/articleVideos");
const ArticleImage = require("../../models/admin/articleImages");
const ArticleRoutine = require("../../models/admin/articleRoutine");
const SkincareSuggestion = require('../../models/admin/skincareSuggestion');
const ValidateId = require('../../services/exceptionHandling');

//CREATE ROUTINE 101
exports.skincareRoutine101 = async (req, res) => {
  try {
    const { title, description, article_content, article_type, content_type, screen_image, status, routine, video_title,
      thumbnail_url, video_url, image, screen_image_title } = req.body;

    const existingArticle = await Article.findOne({
      where: { title, article_type, content_type }
    });

    if (existingArticle) {
      return res.status(409).json({ message: `Article of type '${article_type}' with this title already exists` });
    }

    const createArticle = await Article.create({
      title,
      description,
      article_content,
      article_type,
      content_type,
      screen_image,
      screen_image_title,
      status,
    });
    const articleId = createArticle.id;
    const routines = [];

    if (content_type == "commonArticle") {
      const imageArray = await Promise.all(image.map(async (result) => {
        return ArticleImage.create({
          image_url: result,
          article_id: articleId
        });
      }));
      const data = {
        id: articleId,
        title,
        description,
        image: image,
        article_content,
        article_type,
        status,
        screen_image,
        screen_image_title,
        content_type
      };
      return res.status(201).json({
        message: 'Skincare Routine 101 added successfully',
        data,
      });
    }
    else if (content_type === 'commonSkinCareRoutineArticle') {
      for (const routineItem of routine) {
        const { routine_type, skincare_suggestion_id } = routineItem;

        const suggestionIds = await Promise.all(
          skincare_suggestion_id.map(async (item) => {
            const createSuggestion = await ArticleRoutine.create({
              routine_type,
              article_id: articleId,
              skincare_suggestion_id: item,
            });
          })
        );
        routines.push({
          routine_type,
          skincare_suggestion_id: skincare_suggestion_id,
        });
      }

      const createVideo = await ArticleVideo.create({
        article_id: articleId,
        video_title,
        thumbnail_url,
        video_url,
      });

      const data = {
        article: createArticle,
        routines,
        articleVideos: createVideo,
      };

      return res.status(201).json({
        message: 'Skincare Routine 101 added successfully',
        data
      });
    }
    else {
      return res.status(400).json({ message: "Invalid content type" });
    }

  } catch (err) {
    console.error(err.message);
    return res.status(400).send(err.message);
  }
};


//UPDATE API
exports.updateSkincareRoutine101 = async (req, res) => {
  try {
    // const { error } = skincareRoutine101PutValidations(req.body);
    // if (error)
    //     return res.status(400).send({ error: error.details[0].message });

    const updateData = req.body;
    const id = req.params.id;
    let updatedData;
    const exceptionResult = await ValidateId(id);
    if (exceptionResult)
      return res.status(400).json(exceptionResult);

    const routine101Check = await Article.findOne({
      where: { article_type: updateData.article_type, id: id },
    });
    if (!routine101Check)
      return res.status(200).json({
        message: "No Skincare Routine 101 found with this id",
        data: [],
      });

    if (updateData.content_type === "commonArticle") {
      const articleTypeCheck = await Article.findOne({ where: { content_type: updateData.content_type, id: id } });

      if (!articleTypeCheck) {
        return res.status(200).json({ message: `This id doesn't belong to ${updateData.content_type} article`, data: [] });
      }

      const [rowsUpdated, updatedRecords] = await Article.update(updateData, { where: { id: id } });

      if (rowsUpdated === 0) {
        return res.status(400).json({ message: `No ${updateData.article_type} data updated` });
      }

      updatedData = await Article.findByPk(id);
      if (updateData.image) {
        const articleImages = await ArticleImage.findAll({ where: { article_id: id } });

        await ArticleImage.destroy({ where: { article_id: id } });
        const imagePromises = await Promise.all(updateData.image.map(async (result) => {
          const createArticleImage = await ArticleImage.create({
            image_url: result,
            article_id: id
          });

          return createArticleImage;
        }))
      }
      const updatedImage = await ArticleImage.findAll({ where: { article_id: id } });
      const response = {
        id: updatedData.id,
        title: updatedData.title,
        description: updatedData.description,
        image: updatedImage.map(img => img.image_url),
        article_content: updatedData.article_content,
        article_type: updatedData.article_type,
        screen_image: updatedData.screen_image,
        screen_image_title: updatedData.screen_image_title,
        content_type: updatedData.content_type,
        status: updatedData.status
      };

      return res.status(200).json(response);
    }
    else if (updateData.content_type === "commonSkinCareRoutineArticle") {
      const articleTypeCheck = await Article.findOne({ where: { content_type: updateData.content_type, id: id } });

      if (!articleTypeCheck) {
        return res.status(200).json({ message: `This id doesn't belong to ${updateData.content_type} article`, data: [] });
      }

      const [rowsUpdated, updatedRecords] = await Article.update(updateData, { where: { id: id } });

      if (rowsUpdated === 0) {
        return res.status(400).json({ message: `No ${updateData.article_type} data updated` });
      }

      updatedData = await Article.findByPk(id);

      const [updateVideos] = await ArticleVideo.update(updateData, {
        where: { article_id: id },
      });

      const skincareSuggestions = [];

      if (updateData.routine) {
        await ArticleRoutine.destroy({ where: { article_id: id } });

        for (const routineItem of updateData.routine) {
          const { routine_type, skincare_suggestion_id } = routineItem;

          const suggestionIds = await Promise.all(
            skincare_suggestion_id.map(async (item) => {
              const createSuggestion = await ArticleRoutine.create({
                routine_type,
                article_id: id,
                skincare_suggestion_id: item,
              });
            })
          );
          skincareSuggestions.push({
            routine_type,
            skincare_suggestion_id: skincare_suggestion_id,
          });
        }
      }
      const updatedVideos = await ArticleVideo.findOne({
        where: { article_id: id },
      });
      const updatedSuggestion = await ArticleRoutine.findAll({
        where: { article_id: id },
      });
      return res.status(200).json({
        message: "Skincare Routine 101 updated successfully",
        data: updatedData,
        updatedVideos,
        skincareSuggestions: updatedSuggestion,
      });

    }
    else
      return res.status(400).json({ message: "No such article found with this content type", data: [] });

  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
};
``
//Delete API
exports.deleteSkincareRoutine101 = async (req, res) => {
  try {
    const id = req.params.id;
    const exceptionResult = await ValidateId(id);
    if (exceptionResult) {
      return res.status(400).json(exceptionResult);
    }

    const routine101Check = await Article.findOne({
      where: { id: id },
    });

    if (!routine101Check) {
      return res.status(404).json({
        message: "No Skincare Routine 101 found with this id",
        data: [],
      });
    }

    if (routine101Check.content_type === "commonSkinCareRoutineArticle") {
      await ArticleRoutine.destroy({ where: { article_id: id } });
      await ArticleVideo.destroy({ where: { article_id: id } });
    }

    if (routine101Check.content_type === "commonArticle") {
      await ArticleImage.destroy({ where: { article_id: id } });
    }

    await Article.destroy({
      where: { id: id },
    });

    return res.status(200).json({
      message: "Skincare Routine 101 deleted successfully",
      data: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error.message);
  }
};
//GET BY ID SKINCARE ROUTINE 
const getDataRoutine101 = async (article) => {
  const articleId = article.id;
  const routines = await ArticleRoutine.findAll({
    where: { article_id: articleId },
  });
  const imagesUrl = await ArticleImage.findAll({ where: { article_id: articleId } });
  const images = imagesUrl.map(img => img.image_url);

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

      if (suggestion.suggestion_type === 'Product') {
        routineData.product.push(suggestionData);
      } else if (suggestion.suggestion_type === 'Treatment') {
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
    image: images,
    screen_image: article.screen_image,
    screen_image_title: article.screen_image_title,
    status: article.status,
    routine: Array.from(routineDataMap.values()),
    video_title: videos ? videos.video_title : null,
    thumbnail_url: videos ? videos.thumbnail_url : null,
    video_url: videos ? videos.video_url : null,
  };
};

exports.getByIdSkincareRoutine101 = async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findOne({
      where: { article_type: "Skincare Routine 101", id: id },
    });

    if (!article) {
      return res.status(200).json({ message: 'Skincare Routine 101 article not found', data: [] });
    }

    const skinRoutine101 = await getDataRoutine101(article);

    res.status(200).json({
      data: skinRoutine101,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//GET ALL
const getAllRoutine101 = async (data) => {
  const result = await Promise.all(data.map(async (article) => {
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

      const suggestion = await SkincareSuggestion.findOne({
        where: { id: routine.skincare_suggestion_id },
      });

      if (suggestion) {
        const suggestionData = {
          name: suggestion.name,
          image_url: suggestion.image_url,
          price: suggestion.price,
          description: suggestion.description,
          quantity: suggestion.quantity,
        };

        const routineData = routineDataMap.get(routine.routine_type);

        if (suggestion.suggestion_type === 'product') {
          routineData.product.push(suggestionData);
        } else if (suggestion.suggestion_type === 'treatment') {
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
      status: article.status,
      routine: Array.from(routineDataMap.values()),
      video_title: videos ? videos.video_title : null,
      thumbnail_url: videos ? videos.thumbnail_url : null,
      video_url: videos ? videos.video_url : null,
    };
  }));

  return result;
};

exports.getAllSkincareRoutine101 = async (req, res) => {
  try {
    const article = await Article.findAll({ where: { article_type: "Skincare Routine 101" } });

    if (!article) {
      return res.status(200).json({ message: 'Skincare Routine 101 article not found', data: [] });
    }

    const skinRoutine101 = await getAllRoutine101([article]);

    res.status(200).json({
      data: skinRoutine101[0],
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
