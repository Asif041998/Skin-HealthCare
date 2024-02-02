const fs = require("fs");
const path = require("path");

// POST API FOR RESEARCH
exports.research = async (req, res) => {
  const {
    researchNotice,android_researchNotice
  } = req.body;

  if (!researchNotice || typeof researchNotice !== "string") {
    return res
      .status(400)
      .json({ message: "Missing or invalid Research Notice" });
  }

  if (!android_researchNotice || typeof android_researchNotice !== "string") {
    return res
      .status(400)
      .json({ message: "Missing or invalid Research Notice" });
  }

  const trimmedResearchNotice = researchNotice.trim();
  const trimmedAndroidResearchNotice = android_researchNotice.trim();

  if (trimmedResearchNotice === "") {
    return res.status(400).json({ message: "Research Notice cannot be empty" });
  }

  if (trimmedAndroidResearchNotice === "") {
    return res.status(400).json({ message: "Research Notice cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedResearchNotice)) {
    return res
      .status(400)
      .json({
        error:
          "Research Notice cannot consist of only numbers or special characters",
      });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidResearchNotice)) {
    return res
      .status(400)
      .json({
        error:
          "Research Notice cannot consist of only numbers or special characters",
      });
  }

  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {}

  const nextId =
    researchData.length > 0
      ? Math.max(...researchData.map((item) => item.id)) + 1
      : 1;

  const data = {
    id: nextId,
    researchNotice: trimmedResearchNotice,
    android_researchNotice: trimmedAndroidResearchNotice,
  };

  researchData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

  res
    .status(200)
    .json({ message: "Research Notice data saved successfully", id: nextId });
};

// UPDATE API FOR RESEARCH
exports.updateResearch = async (req, res) => {
  const { id } = req.params;
  const { researchNotice, android_researchNotice } = req.body;

  if (!researchNotice || typeof researchNotice !== "string") {
    return res.status(400).json({ message: "Missing or invalid Research Notice" });
  }

  if (!android_researchNotice || typeof android_researchNotice !== "string") {
    return res.status(400).json({ message: "Missing or invalid Research Notice" });
  }

  const trimmedResearchNotice = researchNotice.trim();
  const trimmedAndroidResearchNotice = android_researchNotice.trim();

  if (trimmedResearchNotice === "") {
    return res.status(400).json({ message: "Research Notice cannot be empty" });
  }

  if (trimmedAndroidResearchNotice === "") {
    return res.status(400).json({ message: "Research Notice cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedResearchNotice)) {
    return res.status(400).json({
      error: "Research Notice cannot consist of only numbers or special characters",
    });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidResearchNotice)) {
    return res.status(400).json({
      error: "Research Notice cannot consist of only numbers or special characters",
    });
  }

  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading research data" });
  }

  const dataIndex = researchData.findIndex((item) => item.id === parseInt(id));

  if (dataIndex === -1) {
    return res.status(404).json({ message: "Research data not found" });
  }

  researchData[dataIndex] = {
    id: parseInt(id),
    researchNotice: trimmedResearchNotice,
    android_researchNotice: trimmedAndroidResearchNotice,
  };

  fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

  res.status(200).json({ message: "Research Notice data updated successfully", id: parseInt(id) });
};

// GET ALL API FOR RESEARCH
exports.getAllResearch = async (req, res) => {
  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading research data" });
  }

  res.status(200).json({ researchData });
};

// DELETE API FOR RESEARCH
exports.deleteResearch = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const researchToDeleteIndex = researchData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (researchToDeleteIndex === -1) {
    return res
      .status(404)
      .json({ message: "Research Notice not found", data: [] });
  }

  researchData.splice(researchToDeleteIndex, 1);

  try {
    fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));
    res
      .status(200)
      .json({ message: "Research Notice data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};