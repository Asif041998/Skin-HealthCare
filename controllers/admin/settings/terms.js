const fs = require("fs");
const path = require("path");

// POST API FOR TERMS
exports.terms = async (req, res) => {
  const { termsAndConditions, android_termsAndConditions 
   } = req.body;

  if (!termsAndConditions || typeof termsAndConditions !== "string" ) {
    return res.status(400).json({ message: "Missing or invalid Terms and Conditions" });
  }

  if (!android_termsAndConditions || typeof android_termsAndConditions !== "string" ) {
    return res.status(400).json({ message: "Missing or invalid Terms and Conditions" });
  }

  const trimmedTermsAndConditions = termsAndConditions.trim();
  const trimmedAndroidTermsAndConditions = android_termsAndConditions.trim();

  if (trimmedTermsAndConditions=== "" ) {
    return res.status(400).json({ message: "Terms and Conditions cannot be empty" });
  }

  if (trimmedAndroidTermsAndConditions=== "" ) {
    return res.status(400).json({ message: "Terms and Conditions cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedTermsAndConditions)) {
    return res.status(400).json({ error: "Terms and Conditions cannot consist of only numbers or special characters" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidTermsAndConditions)) {
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
    android_termsAndConditions: trimmedAndroidTermsAndConditions,
  };

  termsData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(termsData, null, 2));

  res.status(200).json({ message: "Terms and Conditions data saved successfully", id: nextId });
};

// UPDATE API FOR TERMS
exports.updateTerms = async (req, res) => {
  const { id } = req.params; // Assuming you pass the ID as a parameter in the request URL
  const { termsAndConditions, android_termsAndConditions } = req.body;

  if (!termsAndConditions || typeof termsAndConditions !== "string") {
    return res.status(400).json({ message: "Missing or invalid Terms and Conditions" });
  }

  if (!android_termsAndConditions || typeof android_termsAndConditions !== "string") {
    return res.status(400).json({ message: "Missing or invalid Terms and Conditions" });
  }

  const trimmedTermsAndConditions = termsAndConditions.trim();
  const trimmedAndroidTermsAndConditions = android_termsAndConditions.trim();

  if (trimmedTermsAndConditions === "") {
    return res.status(400).json({ message: "Terms and Conditions cannot be empty" });
  }

  if (trimmedAndroidTermsAndConditions === "") {
    return res.status(400).json({ message: "Terms and Conditions cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedTermsAndConditions)) {
    return res.status(400).json({
      error: "Terms and Conditions cannot consist of only numbers or special characters",
    });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidTermsAndConditions)) {
    return res.status(400).json({
      error: "Terms and Conditions cannot consist of only numbers or special characters",
    });
  }

  const filePath = path.join(__dirname, "terms.json");

  let termsData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    termsData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading terms data" });
  }

  const dataIndex = termsData.findIndex((item) => item.id === parseInt(id));

  if (dataIndex === -1) {
    return res.status(404).json({ message: "Terms data not found" });
  }

  termsData[dataIndex] = {
    id: parseInt(id),
    termsAndConditions: trimmedTermsAndConditions,
    android_termsAndConditions: trimmedAndroidTermsAndConditions,
  };

  fs.writeFileSync(filePath, JSON.stringify(termsData, null, 2));

  res.status(200).json({ message: "Terms and Conditions data updated successfully", id: parseInt(id) });
};

// GET ALL API FOR TERMS
exports.getAllTerms = async (req, res) => {
  const filePath = path.join(__dirname, "terms.json");

  let termsData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    termsData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading terms data" });
  }

  res.status(200).json({ termsData });
};

// DELETE API FOR TERMS
exports.deleteTerms = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "terms.json");

  let termsData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    termsData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const termsToDeleteIndex = termsData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (termsToDeleteIndex === -1) {
    return res.status(404).json({ message: "Terms and Conditions not found", data: [] });
  }

  termsData.splice(termsToDeleteIndex, 1);

  try {
    fs.writeFileSync(filePath, JSON.stringify(termsData, null, 2));
    res.status(200).json({ message: "Terms and Conditions data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};