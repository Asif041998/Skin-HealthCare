const con = require("../../database/connection");
const Article = require("../../models/admin/articles");
const ArticleImage = require("../../models/admin/articleImages");

//POST API
exports.activities = async (req, res) => {
    try {
        const { title, article_content, description, article_type, screen_image, status, screen_image_title, image_url } = req.body;

        const existingArticle = await Article.findOne({
            where: { title, article_type }
        });

        if (existingArticle) {
            return res.status(409).json({ message: `Article of type '${article_type}' with this title already exists` });
        }

        const createArticle = await Article.create({
            title,
            description,
            article_content,
            article_type,
            screen_image,
            screen_image_title,
            status,
        });

        const articleId = createArticle.id;

        const createImage = await ArticleImage.create({
            image_url,
            article_id: articleId,
        });

        const data = {
            id: articleId,
            title,
            description,
            image: image_url,
            article_content,
            article_type,
            status,
            screen_image,
            screen_image_title
        };

        return res.status(200).json({
            message: 'Advocacy Activities added successfully',
            data,
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};


//GET BY ID API
exports.getByIdActivities = async (req, res) => {
    try {
        const { id } = req.params;

        const activity = await Article.findOne({
            where: { id, article_type: 'Advocacy Activities' },
            attributes: ['id', 'title', 'description', 'article_content', 'article_type', 'screen_image', 'screen_image_title', 'status'],
        });

        if (!activity) {
            return res.status(404).json({ message: 'Advocacy activity not found.' });
        }

        const images = await ArticleImage.findAll({
            where: { article_id: activity.id },
            attributes: ['image_url'],
        });

        const formattedActivity = {
            id: activity.id,
            title: activity.title,
            description: activity.description,
            article_content: activity.article_content,
            article_type: activity.article_type,
            screen_image: activity.screen_image,
            screen_image_title: activity.screen_image_title,
            status: activity.status,
            images: images.map(image => image.image_url),
        };

        return res.status(200).json({
            message: "Advocacy activity fetched successfully",
            data: formattedActivity,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};


//GET ALL ADVOCACY ACTIVITIES
exports.getAllActivities = async (req, res) => {
    try {
        const advocacyActivities = await Article.findAll({
            where: { article_type: 'Advocacy Activities' },
            attributes: ['id', 'title', 'description', 'article_content', 'article_type', 'screen_image', 'screen_image_title', 'status'],
        });

        if (!advocacyActivities || advocacyActivities.length === 0) {
            return res.status(404).json({ message: 'No advocacy activities found.' });
        }

        const formattedActivities = await Promise.all(advocacyActivities.map(async activity => {
            const images = await ArticleImage.findAll({
                where: { article_id: activity.id },
                attributes: ['image_url'],
            });

            return {
                id: activity.id,
                title: activity.title,
                description: activity.description,
                article_content: activity.article_content,
                article_type: activity.article_type,
                screen_image: activity.screen_image,
                screen_image_title: activity.screen_image_title,
                status: activity.status,
                images: images.map(image => image.image_url),
            };
        }));

        return res.status(200).json({
            message: "Advocacy activities fetched successfully",
            data: formattedActivities,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};


//UPDATE API
exports.updateByIdActivities = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, article_content, description, article_type, screen_image, status, screen_image_title, image_url } = req.body;

        // Find the existing article
        const existingArticle = await Article.findByPk(id);

        if (!existingArticle) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        // Update the article
        existingArticle.title = title;
        existingArticle.description = description;
        existingArticle.article_content = article_content;
        existingArticle.article_type = article_type;
        existingArticle.screen_image = screen_image || null;
        existingArticle.screen_image_title = screen_image_title || null;
        existingArticle.status = status;

        // Save the changes
        await existingArticle.save();

        // Update the associated image
        const existingImage = await ArticleImage.findOne({ where: { article_id: id } });

        if (existingImage) {
            existingImage.image_url = image_url || null;
            await existingImage.save();
        } else {
            // If no existing image found, create a new one
            await ArticleImage.create({
                image_url: image_url || null,
                article_id: id,
            });
        }

        const updatedData = {
            id,
            title,
            description,
            image: image_url || null,
            article_content,
            article_type,
            status,
            screen_image: screen_image || null,
            screen_image_title: screen_image_title || null
        };

        return res.status(200).json({
            message: 'Advocacy Activity updated successfully',
            data: updatedData,
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

//DELETE API
exports.deleteByIdActivities = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the article
        const existingArticle = await Article.findByPk(id);

        if (!existingArticle) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        // Delete the associated image
        await ArticleImage.destroy({
            where: { article_id: id },
        });

        // Delete the article
        await existingArticle.destroy();

        return res.status(200).json({
            message: 'Advocacy Activity deleted successfully',
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
