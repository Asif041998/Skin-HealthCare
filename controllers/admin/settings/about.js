const fs = require("fs");
const path = require("path");

exports.about = async (req, res) => {
  const { mission, approach } = req.body;

  if (!mission || typeof mission !== "string" || !approach || typeof approach !== "string") {
    return res.status(400).json({ message : "Missing or invalid Mission or Approach" });
  }

  const trimmedMission = mission.trim();
  const trimmedApproach = approach.trim();

  if (trimmedMission === "" || trimmedApproach === "") {
    return res.status(400).json({ message : "Mission or Approach cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedMission) ||/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedApproach)) {
    return res.status(400).json({ error : "About cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "about.json");

  let aboutData = {};
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
  };

  aboutData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));

  res.status(200).json({ message: "ABOUT data saved successfully", id: nextId });
};

exports.updateAbout = async (req, res) => {
  const updateId = req.params.id;
  const { mission, approach } = req.body;

  if (!mission || typeof mission !== "string" || !approach || typeof approach !== "string") {
    return res.status(400).json({ error: "Missing or invalid mission or approach" });
  }

  const trimmedMission = mission.trim();
  const trimmedApproach = approach.trim();

  if (trimmedMission === "" || trimmedApproach === "") {
    return res.status(400).json({ error: "About cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedMission) || /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedApproach) ) {
    return res.status(400).json({ error: "Mission or approach cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "about.json");

  let aboutData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message : error.message });
  }

  const aboutToUpdate = aboutData.find(
    (data) => data.id.toString() === updateId
  );

  if (!aboutToUpdate) {
    return res.status(404).json({ message : "ABOUT not found", data:[] });
  }

  aboutToUpdate.mission = trimmedMission;
  aboutToUpdate.approach = trimmedApproach;

  try {
    fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));
    res.status(200).json({ message: "ABOUT data updated successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ message : error.message });
  }
};

exports.getAllAbout = async (req, res) => {
  const filePath = path.join(__dirname, "about.json");

  let aboutData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
    let data ={
      id: aboutData[0].id,
      mission: aboutData[0].mission,
      approach: aboutData[0].approach
    }
    res.status(200).json({data});

  } catch (error) {
    return res.status(500).json({ message: error.message  });
  }

};
  
exports.deleteAbout = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "about.json");

  let aboutData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message : error.message });
  }

  const aboutToDeleteIndex = aboutData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (aboutToDeleteIndex === -1) {
    return res.status(404).json({ message : "ABOUT not found", data: [] });
  }

  aboutData.splice(aboutToDeleteIndex, 1);

  try {
    fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));
    res.status(200).json({ message: "ABOUT data deleted successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ message : error.message });
  }
};
