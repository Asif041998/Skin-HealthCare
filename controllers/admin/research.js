const fs = require("fs");
const path = require("path");
const researchPostValidation = require("../../validations/admin/research/researchPost");
const researchPutValidation = require("../../validations/admin/research/researchPut");

// POST Data in Research
exports.research = async (req, res) => {
  const { healthAndSafety, impact, joinIn, } = req.body;

  const { error } = researchPostValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const filePath = path.join(__dirname, "research.json");

  let researchData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {}

  const nextId =
    Object.keys(researchData).length > 0
      ? Math.max(...Object.keys(researchData).map((id) => parseInt(id))) + 1
      : 1;

  const data = {
    id: nextId,
    healthAndSafety,
    impact,
    joinIn,
  };

  researchData[nextId] = data;

  fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

  res.status(200).json({ message: "Research data saved successfully", data });
};

// PUT Research by ID API
exports.updateByIdResearch = async (req, res) => {
  const updateId = parseInt(req.params.id);
  const { healthAndSafety, impact, joinIn } = req.body;

  const { error } = researchPutValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const filePath = path.join(__dirname, "research.json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const researchData = JSON.parse(fileContent);

    if (!researchData[updateId]) {
      return res.status(404).json({ message : "Research not found", data: [] });
    }

    if (healthAndSafety) researchData[updateId].healthAndSafety = healthAndSafety;
    if (impact) researchData[updateId].impact = impact;
    if (joinIn) researchData[updateId].joinIn = joinIn;

    fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

    res.status(200).json({
      message: "Research data updated successfully",
      updatedResearch: researchData[updateId], 
    });
  } catch (error) {
    return res.status(500).json({ message : error.message });
  }
};

// GET All Research Data
exports.getAllResearch = async (req, res) => {
  const filePath = path.join(__dirname, "research.json");

  let researchData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(404).json({ message: "Not Found" });
  }

  const researchArray = Object.keys(researchData).map((key) => {
    const researchItem = researchData[key];
    if (researchItem && researchItem.id) {
      return {
        id: researchItem.id,
        healthAndSafety: researchItem.healthAndSafety,
        impact: researchItem.impact,
        joinIn: researchItem.joinIn || "", 
      };
    }
    return null;
  });

  const filteredResearchArray = researchArray.filter((item) => item !== null);

  const response = {
    message: "Research data fetched successfully",
    data: filteredResearchArray,
  };

  res.status(200).json(response);
};

// GET Research by ID API
exports.getByIdResearch = async (req, res) => {
  const researchId = parseInt(req.params.id);
  const filePath = path.join(__dirname, "research.json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const researchData = JSON.parse(fileContent);

    const research = researchData[researchId];

    if (!research) {
      return res.status(404).json({ message: "Research not found for the provided ID", data:[] });
    }

    res.status(200).json({
      message: "Research data fetched successfully",
      data: {
        id: research.id,
        healthAndSafety: research.healthAndSafety,
        impact: research.impact,
        joinIn: research.joinIn || "", 
      },
    });
  } catch (error) {
    return res.status(404).json({ message: "Research not found for the provided ID", data:[] });
  }
};

// DELETE API for Research
exports.deleteByIdResearch = async (req, res) => {
  const researchId = parseInt(req.params.id);
  const filePath = path.join(__dirname, "research.json");

  try {
    let researchData = {};
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      researchData = JSON.parse(fileContent);
    } catch (error) {
      return res.status(404).json({ message: "Not Found" });
    }

    if (!researchData[researchId]) {
      return res.status(404).json({ message: "Research not found for the provided ID", data:[] });
    }

    delete researchData[researchId];

    fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

    res.status(200).json({ message: "Research data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message : error.message });
  }
};
