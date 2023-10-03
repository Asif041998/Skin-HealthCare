const con = require("../../database/connection");
const Programs = require("../../models/admin/program");

// CREATE THE PROGRAMS SET
exports.programs = async (req, res) => {
    try {
        const programData = req.body.programs;

        let data = await Promise.all(programData.map(async (program) => {
            const { name, image_url, is_active, title, description } = program;

            const existingProgram = await Programs.findOne({ where: { name: name } });

            if (existingProgram) {
                return res.status(409).json({ message: "Program event already exists", });
            }
            // let responseUrl = await uploads(image_url);

            const createdProgram = await Programs.create({
                name,
                image_url,
                is_active,
                title,
                description
            });

            return createdProgram;
        }));
        return res.status(200).json({
            message: 'Programs uploaded successfully',
            data,
        });

    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET ALL THE PROGRAMS DETAILS
exports.getAllPrograms = async (req, res) => {
    try {
        const programsList = await Programs.findAll();
        return res.status(200).json({
            message: 'Programs list fetched',
            data: {
                programs: programsList,
            },
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// UPDATE PROGRAMS BY ID
exports.updateByIdPrograms = async (req, res) => {
    try {
        const programData = req.body.programs;
        let updatedPrograms = [];

        for (let i = 0; i < programData.length; i++) {
            const id = programData[i].event_id;
            const existingProgram = await Programs.findByPk(id);

            if (!existingProgram) {
                return res.status(404).json({
                    message: `Program id ${id} not found`,
                });
            }
            if (id) {
                const updateData = {
                    name: programData[i].name,
                    title: programData[i].title,
                    description: programData[i].description,
                    image_url: programData[i].image_url,
                    is_active: programData[i].is_active
                };

                const [rowsUpdated, updatedRecords] = await Programs.update(updateData, {
                    where: { event_id: id },
                    returning: true
                });

                if (rowsUpdated > 0) {

                    for (let j = 0; j < updatedRecords.length; j++) {
                        updatedPrograms.push(updatedRecords[j]);
                    }
                } else {
                    programData[i].image_url = updateData.image_url;
                    updatedPrograms.push(programData[i]);
                }
            }
            else {
                updatedPrograms.push(programData[i]);
            }
        }
        return res.status(200).json({
            message: 'Programs updated successfully',
            data: updatedPrograms
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};