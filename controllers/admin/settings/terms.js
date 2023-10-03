const fs = require("fs");
const path = require("path");

exports.terms = async (req, res) => {
  const { termsAndConditions } = req.body;

  if (!termsAndConditions || typeof termsAndConditions !== "string") {
    return res.status(400).json({ error: "Missing or invalid terms and conditions" });
  }

  const trimmedTermsAndConditions = termsAndConditions.trim();

  if (trimmedTermsAndConditions === "") {
    return res.status(400).json({ error: "Terms and Conditions cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedTermsAndConditions)) {
    return res.status(400).json({ error: "Terms and Conditions cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "terms.json");

  let termsData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    termsData = JSON.parse(fileContent);
  } catch (error) {
  }

  const nextId = termsData.length > 0 ? Math.max(...termsData.map(item => item.id)) + 1 : 1;

  const data = {
    id: nextId,
    termsAndConditions: trimmedTermsAndConditions,
  };

  termsData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(termsData, null, 2));

  res.status(200).json({ message: "Terms and Conditions data saved successfully", id: nextId });
};

exports.updateTerms = async (req, res) => {
  const updateId = req.params.id;
  const { termsAndConditions } = req.body;

  if (!termsAndConditions || typeof termsAndConditions !== "string") {
    return res.status(400).json({ error: "Missing or invalid terms and conditions" });
  }

  const trimmedTermsAndConditions = termsAndConditions.trim();

  if (trimmedTermsAndConditions === "") {
    return res.status(400).json({ error: "Terms and conditions cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedTermsAndConditions)) {
    return res.status(400).json({ error: "Terms and conditions cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "terms.json");

  let termsData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    termsData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

  const termsToUpdate = termsData.find(
    (data) => data.id.toString() === updateId
  );

  if (!termsToUpdate) {
    return res.status(404).json({ error: "Terms and conditions not found" });
  }

  termsToUpdate.termsAndConditions = trimmedTermsAndConditions;

  try {
    fs.writeFileSync(filePath, JSON.stringify(termsData, null, 2));
    res.status(200).json({ message: "Terms and conditions data updated successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
  }
};

exports.getAllTerms = async (req, res) => {
  const filePath = path.join(__dirname, "terms.json");

  let termsData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    termsData = JSON.parse(fileContent);
    let data ={
      id: termsData[0].id,
      termsAndConditions: termsData[0].termsAndConditions
    }
    res.status(200).json({data});
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

};


exports.deleteTerms = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "terms.json");

  let termsData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    termsData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

  const termsToDeleteIndex = termsData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (termsToDeleteIndex === -1) {
    return res.status(404).json({ error: "Terms and conditions not found" });
  }

  // Remove the terms and conditions data from the array
  termsData.splice(termsToDeleteIndex, 1);

  try {
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(termsData, null, 2));
    res.status(200).json({ message: "Terms and conditions data deleted successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
  }
};
