const fs = require("fs");
const path = require("path");
const { and } = require("sequelize");

// POST API FOR ABOUT
exports.about = async (req, res) => {
  const { mission, approach, android_mission, android_approach
   } = req.body;

  if (!mission || typeof mission !== "string" || !approach || typeof approach !== "string") {
    return res.status(400).json({ message: "Missing or invalid Mission or Approach" });
  }
  if (!android_mission || typeof android_mission !== "string" || !android_approach || typeof android_approach !== "string") {
    return res.status(400).json({ message: "Missing or invalid Mission or Approach" });
  }

  const trimmedMission = mission.trim();
  const trimmedApproach = approach.trim();
  const trimmedAndroidMission = android_mission.trim();
  const trimmedAndroidApproach = android_approach.trim();


  if (trimmedMission === "" || trimmedApproach === "") {
    return res.status(400).json({ message: "Mission or Approach cannot be empty" });
  }
  if (trimmedAndroidMission === "" || trimmedAndroidApproach === "") {
    return res.status(400).json({ message: "Mission or Approach cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedMission) || /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedApproach)) {
    return res.status(400).json({ error: "About cannot consist of only numbers or special characters" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidMission) || /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidApproach)) {
    return res.status(400).json({ error: "About cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "about.json");

  let aboutData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
  }

  const nextId = aboutData.length > 0 ? Math.max(...aboutData.map(item => item.id)) + 1 : 1;

  const data = {
    id: nextId,
    mission: trimmedMission,
    approach: trimmedApproach,
    android_mission: trimmedAndroidMission,
    android_approach: trimmedAndroidApproach,
  };

  aboutData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));

  res.status(200).json({ message: "ABOUT data saved successfully", id: nextId });
};

// UPDATE API FOR ABOUT
exports.updateAbout = async (req, res) => {
  const updateId = req.params.id;
  const { mission, approach, android_mission, android_approach
   } = req.body;

  if (!mission || typeof mission !== "string" || !approach || typeof approach !== "string") {
    return res.status(400).json({ error: "Missing or invalid mission or approach" });
  }

  if (!android_mission || typeof android_mission !== "string" || !android_approach || typeof android_approach !== "string") {
    return res.status(400).json({ error: "Missing or invalid mission or approach" });
  }

  const trimmedMission = mission.trim();
  const trimmedApproach = approach.trim();
  const trimmedAndroidMission = android_mission.trim();
  const trimmedAndroidApproach = android_approach.trim();

  if (trimmedMission === "" || trimmedApproach === "") {
    return res.status(400).json({ error: "About cannot be empty" });
  }

  if (trimmedAndroidMission === "" || trimmedAndroidApproach === "") {
    return res.status(400).json({ error: "About cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedMission) || /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedApproach) ) {
    return res.status(400).json({ error: "Mission or approach cannot consist of only numbers or special characters" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidMission) || /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidApproach) ) {
    return res.status(400).json({ error: "Mission or approach cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "about.json");

  let aboutData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const aboutToUpdate = aboutData.find(
    (data) => data.id.toString() === updateId
  );

  if (!aboutToUpdate) {
    return res.status(404).json({ message: "ABOUT not found", data: [] });
  }

  aboutToUpdate.mission = trimmedMission;
  aboutToUpdate.approach = trimmedApproach;
  aboutToUpdate.android_mission = trimmedAndroidMission;
  aboutToUpdate.android_approach = trimmedAndroidApproach;

  try {
    fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));
    res.status(200).json({ message: "ABOUT data updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// GET ALL API FOR ABOUT
exports.getAllAbout = async (req, res) => {
  const filePath = path.join(__dirname, "about.json");

  let aboutData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading about data" });
  }

  res.status(200).json({ aboutData });
};

// DELETE API FOR ABOUT
exports.deleteAbout = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "about.json");

  let aboutData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const aboutToDeleteIndex = aboutData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (aboutToDeleteIndex === -1) {
    return res.status(404).json({ message: "ABOUT not found", data: [] });
  }

  aboutData.splice(aboutToDeleteIndex, 1);

  try {
    fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));
    res.status(200).json({ message: "ABOUT data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};