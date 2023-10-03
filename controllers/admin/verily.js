const Verily = require('../../models/admin/verilyStudy');
const ValidateId = require('../../services/exceptionHandling');
// CREATE VERILY USER
exports.registerVerilyUser = async (req, res) => {
    try {
        //   const { error } = registrationValidation(req.body);
        //   if (error) {
        //     return res.status(400).send({ error: error.details[0].message });
        //   }

        const existingVerily = await Verily.findOne({ where: { email: req.body.email } });
        if (existingVerily) {
            return res.status(409).json({ message: "Verily user already exists", data: [] });
        }

        let { collaborator_id, firstname, lastname, zipcode, email, image_url } = req.body;

        const newVerily = await Verily.create({
            collaborator_id,
            firstname,
            lastname,
            zipcode,
            email,
            image_url
        });

        return res.status(201).json({
            message: "Verily account created successfully",
            data: newVerily,
        });
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

//UPDATE VERILY BY ID
exports.updateVerilyUser = async (req, res) => {
    try {
        // const { error } = collaboratorPutValidation(req.body);
        // if (error) {
        //     return res.status(400).send({ error: error.details[0].message });
        // }
        const id = req.params.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const updatedData = req.body;

        const existingVerily = await Verily.findByPk(id);
        if (!existingVerily) {
            return res.status(200).json({ message: "Verily user not found", data: [] },);
        }

        const [updatedRowsCount] = await Verily.update(updatedData, {
            where: { id: id },
        });

        if (updatedRowsCount === 0) {
            return res.status(200).json({
                message: "Verily user not found",
                data: []
            });
        }
        const updatedVerily = await Verily.findByPk(id);

        return res.status(200).json({
            message: "Verily user updated successfully",
            data: updatedVerily
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET ALL THE VERILY USERS DETAILS
exports.getAllVerilyUser = async (req, res) => {
    try {

        const verilyList = await Verily.findAll();
        if (verilyList.length == 0) {
            return res.status(200).json({
                message: "No data found",
                data: []
            });
        }
        return res.status(200).json({
            message: "Verily list fetched",
            data: verilyList
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET A SPECIFIC VERILY USER BY ID
exports.getVerilyUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const verily = await Verily.findByPk(id);

        if (!verily) {
            return res.status(200).json({ message: 'Verily not found', data: [] });
        }

        return res.status(200).json({
            message: 'Verily fetched successfully',
            data: verily,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

