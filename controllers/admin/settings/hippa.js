const fs = require("fs");
const path = require("path");

exports.hippa = async (req, res) => {
  const { hippaNotice } = req.body;

  // Validate HIPPA notice
  if (!hippaNotice || typeof hippaNotice !== "string") {
    return res.status(400).json({ error: "Missing or invalid HIPPA notice" });
  }

  // Trim leading and trailing spaces from the HIPPA notice
  const trimmedHippaNotice = hippaNotice.trim();

  // Check if HIPPA notice is empty after trimming
  if (trimmedHippaNotice === "") {
    return res.status(400).json({ error: "HIPPA notice cannot be empty" });
  }

  // Check if HIPPA notice contains only numbers or special characters
  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedHippaNotice)) {
    return res.status(400).json({ error: "HIPPA notice cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "hippa.json");

  // Read existing data from the file
  let hippaData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist or cannot be read, initialize with an empty array
  }

  // Calculate the next available ID
  const nextId = hippaData.length > 0 ? Math.max(...hippaData.map(item => item.id)) + 1 : 1;

  const data = {
    id: nextId,
    hippaNotice: trimmedHippaNotice,
  };

  // Add the new data to the array
  hippaData.push(data);

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(hippaData, null, 2));

  res.status(200).json({ message: "HIPPA Notice data saved successfully", id: nextId });
};

exports.updateHippa = async (req, res) => {
  const updateId = req.params.id;
  const { hippaNotice } = req.body;

  // Validate HIPPA notice
  if (!hippaNotice || typeof hippaNotice !== "string") {
    return res.status(400).json({ error: "Missing or invalid HIPPA notice" });
  }

  // Trim leading and trailing spaces from the HIPPA notice
  const trimmedHippaNotice = hippaNotice.trim();

  // Check if HIPPA notice is empty after trimming
  if (trimmedHippaNotice === "") {
    return res.status(400).json({ error: "HIPPA notice cannot be empty" });
  }

  // Check if HIPPA notice contains only numbers or special characters
  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedHippaNotice)) {
    return res.status(400).json({ error: "HIPPA notice cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "hippa.json");

  let hippaData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

  const hippaToUpdate = hippaData.find(
    (data) => data.id.toString() === updateId
  );

  if (!hippaToUpdate) {
    return res.status(404).json({ error: "HIPPA notice not found" });
  }

  hippaToUpdate.hippaNotice = trimmedHippaNotice;

  try {
    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(hippaData, null, 2));
    res.status(200).json({ message: "HIPPA notice data updated successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
  }
};

exports.getAllHippa = async (req, res) => {
  const filePath = path.join(__dirname, "hippa.json");

  let hippaData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
    let data ={
      id: hippaData[0].id,
      hippaNotice: hippaData[0].hippaNotice
    }
    res.status(200).json({data});
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

};

exports.deleteHippa = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "hippa.json");

  let hippaData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    hippaData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

  const hippaToDeleteIndex = hippaData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (hippaToDeleteIndex === -1) {
    return res.status(404).json({ error: "HIPPA notice not found" });
  }

  // Remove the HIPPA data from the array
  hippaData.splice(hippaToDeleteIndex, 1);

  try {
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(hippaData, null, 2));
    res.status(200).json({ message: "HIPPA notice data deleted successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
  }
};
