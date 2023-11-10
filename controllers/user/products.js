const Products = require("../../models/user/products");
const Products_Types = require("../../models/user/productTypes");
const productPostValidation = require("../../validations/user/product/product");
const productPutValidation = require("../../validations/user/product/product");
const ValidateId = require('../../services/exceptionHandling');
const { Op } = require('sequelize');

// ADD PRODUCTS
exports.products = async (req, res) => {
    try {
        const { error } = productPostValidation(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }

        let userId = req.user.id;
        let { user_id, image, name, brand, description, purchase_location, open_date, product_type_id, price, expiration_date } = req.body;

        const existingProduct = await Products.findOne({ where: { name: name, user_id: userId } });

        if (existingProduct) {
            return res.status(409).json({ message: "Product already exists" });
        }

        if (new Date(open_date) > new Date(expiration_date)) {
            return res.status(400).json({ error: "Open date cannot be after the expiration date" });
        }
        const product = await Products.create({
            user_id,
            image,
            name,
            brand,
            description,
            purchase_location,
            open_date,
            product_type_id,
            price,
            expiration_date
        });
        const result = await Products.findAll();

        return res.status(201).json({
            message: "Products added successfully",
            product
        });

    } catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message);
    }
};

// GET ALL THE  PRODUCTS DETAILS
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: [
                {
                    model: Products_Types,
                    as: "product_type",
                    attributes: ["name", "expiration_duration_days"],
                },
            ],
        });
        return res.status(200).json({
            message: "Products list fetched",
            data: products,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// UPDATE PRODUCT BY ID
exports.updateProducts = async (req, res) => {
    try {
        const { error } = productPutValidation(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }

        const productId = req.params.id;
        const updatedData = req.body;
        const userId = req.user.id;
        const exceptionResult = await ValidateId(productId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        if (updatedData.name) {
            const existingProduct = await Products.findOne({
                where: { id: { [Op.not]: productId },  name: updatedData.name, user_id: userId }
            });

            if (existingProduct) {
                return res.status(409).json({
                    message: "Product with the same name already exists", data: []
                });
            }

        }

        const userExist = await Products.findOne({ where: { user_id: userId, id: productId } });
        if (!userExist) return res.status(200).json({ message: "There is no product with this user id", data: [] });

        const [updatedRowsCount] = await Products.update(updatedData, {
            where: { id: productId },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const updatedProduct = await Products.findByPk(productId);

        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET PRODUCT BY ID
exports.getByIdProducts = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.id;
        const exceptionResult = await ValidateId(productId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const userExist = await Products.findOne({ where: { user_id: userId, id: productId } });
        if (!userExist) return res.status(200).json({ message: "There is no product with this user id", data: [] });

        const product = await Products.findByPk(productId, {
            include: [
                {
                    model: Products_Types,
                    as: "product_type",
                    attributes: ["name", "expiration_duration_days"],
                },
            ],
        });

        return res.status(200).json({
            message: "Product details fetched",
            data: product
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET PRODUCT BY USER_ID 
exports.getByUserIdProducts = async (req, res) => {
    try {
        const id = req.params.user_id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const exist = await Products.findAll({ where: { user_id: id } });
        if (exist.length === 0) return res.status(200).json({ message: "There is no product with this id", data: [] });

        const product = await Products.findAll({
            where: { user_id: id },
            include: [
                {
                    model: Products_Types,
                    as: "product_type",
                    attributes: ["name", "expiration_duration_days"],
                },
            ],
        });

        return res.status(200).json({
            message: "Product details fetched",
            data: product
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};