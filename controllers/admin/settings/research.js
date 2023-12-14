const fs = require("fs");
const path = require("path");

exports.research = async (req, res) => {
  const { researchNotice } = req.body;

  if (!researchNotice || typeof researchNotice !== "string") {
    return res.status(400).json({ error: "Missing or invalid Research notice" });
  }

  const trimmedResearchNotice = researchNotice.trim();

  if (trimmedResearchNotice === "") {
    return res.status(400).json({ error: "Research notice cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedResearchNotice)) {
    return res.status(400).json({ error: "Research notice cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
  }

  const nextId = researchData.length > 0 ? Math.max(...researchData.map(item => item.id)) + 1 : 1;

  const data = {
    id: nextId,
    researchNotice: trimmedResearchNotice,
  };

  researchData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

  res.status(200).json({ message: "Research notice data saved successfully", id: nextId });
};

exports.updateResearch = async (req, res) => {
  const updateId = req.params.id;
  const { researchNotice } = req.body;

  if (!researchNotice || typeof researchNotice !== "string") {
    return res.status(400).json({ error: "Missing or invalid Research notice" });
  }

  const trimmedResearchNotice = researchNotice.trim();

  if (trimmedResearchNotice === "") {
    return res.status(400).json({ error: "Research notice cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedResearchNotice)) {
    return res.status(400).json({ error: "Research notice cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({  message : error.message});
  }

  const researchToUpdate = researchData.find(
    (data) => data.id.toString() === updateId
  );

  if (!researchToUpdate) {
    return res.status(404).json({ message : "Research notice not found", data:[] });
  }

  researchToUpdate.researchNotice = trimmedResearchNotice;

  try {
    fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));
    res.status(200).json({ message: "Research notice data updated successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ message : error.message });
  }
};

exports.getAllResearch = async (req, res) => {
  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
    let data ={
      id: researchData[0].id,
      researchNotice: researchData[0].researchNotice
    }
    res.status(200).json({data});
  } catch (error) {
    return res.status(500).json({  message : error.message });
  }

};

exports.deleteResearch = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "research.json");

  let researchData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message : error.message });
  }

  const researchToDeleteIndex = researchData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (researchToDeleteIndex === -1) {
    return res.status(404).json({ message : "Research notice not found", data:[] });
  }

  // Remove the research data from the array
  researchData.splice(researchToDeleteIndex, 1);

  try {
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));
    res.status(200).json({ message: "Research notice data deleted successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({  message : error.message });
  }
};
