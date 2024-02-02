const fs = require("fs");
const path = require("path");

// POST API FOR HIPPA
exports.hippa = async (req, res) => {
  const {
    hippaNotice, android_hippaNotice
  } = req.body;

  if (!hippaNotice || typeof hippaNotice !== "string") {
    return res.status(400).json({ message: "Missing or invalid Hippa Notice" });
  }

  if (!android_hippaNotice || typeof android_hippaNotice !== "string") {
    return res.status(400).json({ message: "Missing or invalid Hippa Notice" });
  }

  const trimmedHippaNotice = hippaNotice.trim();
  const trimmedAndroidHippaNotice = android_hippaNotice.trim();

  if (trimmedHippaNotice === "") {
    return res.status(400).json({ message: "Hippa Notice cannot be empty" });
  }

  if (trimmedAndroidHippaNotice === "") {
    return res.status(400).json({ message: "Hippa Notice cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedHippaNotice)) {
    return res
      .status(400)
      .json({
        error:
          "Hippa Notice cannot consist of only numbers or special characters",
      });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidHippaNotice)) {
    return res
      .status(400)
      .json({
        error:
          "Hippa Notice cannot consist of only numbers or special characters",
      });
  }

  const filePath = path.join(__dirname, "hippa.json");

  let hippaData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
  } catch (error) {}

  const nextId =
    hippaData.length > 0
      ? Math.max(...hippaData.map((item) => item.id)) + 1
      : 1;

  const data = {
    id: nextId,
    hippaNotice: trimmedHippaNotice,
    android_hippaNotice: trimmedAndroidHippaNotice,
  };

  hippaData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(hippaData, null, 2));

  res
    .status(200)
    .json({ message: "Hippa Notice data saved successfully", id: nextId });
};

// UPDATE API FOR HIPPA
exports.updateHippa = async (req, res) => {
  const updateId = req.params.id;
  const { hippaNotice, android_hippaNotice 
  } = req.body;

  if (!hippaNotice || typeof hippaNotice !== "string") {
    return res.status(400).json({ error: "Missing or invalid Hippa Notice" });
  }

  if (!android_hippaNotice || typeof android_hippaNotice !== "string") {
    return res.status(400).json({ error: "Missing or invalid Hippa Notice" });
  }

  const trimmedHippaNotice = hippaNotice.trim();
  const trimmedAndroidHippaNotice = android_hippaNotice.trim();

  if (trimmedHippaNotice === "") {
    return res.status(400).json({ error: "Hippa Notice cannot be empty" });
  }

  if (trimmedAndroidHippaNotice === "") {
    return res.status(400).json({ error: "Hippa Notice cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedHippaNotice)) {
    return res
      .status(400)
      .json({
        error:
          "Hippa Notice cannot consist of only numbers or special characters",
      });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidHippaNotice)) {
    return res
      .status(400)
      .json({
        error:
          "Hippa Notice cannot consist of only numbers or special characters",
      });
  }

  const filePath = path.join(__dirname, "hippa.json");

  let hippaData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const hippaToUpdate = hippaData.find(
    (data) => data.id.toString() === updateId
  );

  if (!hippaToUpdate) {
    return res
      .status(404)
      .json({ message: "Hippa Notice not found", data: [] });
  }

  hippaToUpdate.hippaNotice = trimmedHippaNotice;
  hippaToUpdate.android_hippaNotice = trimmedAndroidHippaNotice;

  try {
    fs.writeFileSync(filePath, JSON.stringify(hippaData, null, 2));
    res.status(200).json({ message: "Hippa Notice data updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// GET ALL API FOR HIPPA
exports.getAllHippa = async (req, res) => {
  const filePath = path.join(__dirname, "hippa.json");

  let hippaData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading hippa data" });
  }

  res.status(200).json({ hippaData });
};

// DELETE API FOR HIPPA
exports.deleteHippa = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "hippa.json");

  let hippaData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const hippaToDeleteIndex = hippaData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (hippaToDeleteIndex === -1) {
    return res
      .status(404)
      .json({ message: "Hippa Notice not found", data: [] });
  }

  hippaData.splice(hippaToDeleteIndex, 1);

  try {
    fs.writeFileSync(filePath, JSON.stringify(hippaData, null, 2));
    res.status(200).json({ message: "Hippa Notice data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};