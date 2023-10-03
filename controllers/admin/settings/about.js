const fs = require("fs");
const path = require("path");

exports.about = async (req, res) => {
  const { mission, approach } = req.body;

  // Validate ABOUT 
  if (!mission || typeof mission !== "string" || !approach || typeof approach !== "string") {
    return res.status(400).json({ error: "Missing or invalid Mission or Approach" });
  }

  // Trim leading and trailing spaces from the ABOUT
  const trimmedMission = mission.trim();
  const trimmedApproach = approach.trim();

  // Check if ABOUT is empty after trimming
  if (trimmedMission === "" || trimmedApproach === "") {
    return res.status(400).json({ error: "Mission or Approach cannot be empty" });
  }

  // Check if ABOUT contains only numbers or special characters
  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedMission) ||/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedApproach)) {
    return res.status(400).json({ error: "About cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "about.json");

  // Read existing data from the file
  let aboutData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist or cannot be read, initialize with an empty array
  }

  // Calculate the next available ID
  const nextId = aboutData.length > 0 ? Math.max(...aboutData.map(item => item.id)) + 1 : 1;

  const data = {
    id: nextId,
    mission: trimmedMission,
    approach: trimmedApproach,
  };

  // Add the new data to the array
  aboutData.push(data);

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));

  res.status(200).json({ message: "ABOUT data saved successfully", id: nextId });
};

exports.updateAbout = async (req, res) => {
  const updateId = req.params.id;
  const { mission, approach } = req.body;

  // Validate ABOUT request
  if (!mission || typeof mission !== "string" || !approach || typeof approach !== "string") {
    return res.status(400).json({ error: "Missing or invalid mission or approach" });
  }

  // Trim leading and trailing spaces from the ABOUT
  const trimmedMission = mission.trim();
  const trimmedApproach = approach.trim();

  // Check if About is empty after trimming
  if (trimmedMission === "" || trimmedApproach === "") {
    return res.status(400).json({ error: "About cannot be empty" });
  }

  // Check if ABOUT contains only numbers or special characters
  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedMission) || /^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedApproach) ) {
    return res.status(400).json({ error: "Mission or approach cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "about.json");

  let aboutData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    aboutData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

  const aboutToUpdate = aboutData.find(
    (data) => data.id.toString() === updateId
  );

  if (!aboutToUpdate) {
    return res.status(404).json({ error: "ABOUT not found" });
  }

  aboutToUpdate.mission = trimmedMission;
  aboutToUpdate.approach = trimmedApproach;

  try {
    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));
    res.status(200).json({ message: "ABOUT data updated successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
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
    return res.status(500).json({ error: "Error reading file" });
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
    return res.status(500).json({ error: "Error reading file" });
  }

  const aboutToDeleteIndex = aboutData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (aboutToDeleteIndex === -1) {
    return res.status(404).json({ error: "ABOUT not found" });
  }

  // Remove the ABOUT data from the array
  aboutData.splice(aboutToDeleteIndex, 1);

  try {
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(aboutData, null, 2));
    res.status(200).json({ message: "ABOUT data deleted successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
  }
};
