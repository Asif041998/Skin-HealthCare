const fs = require("fs");
const path = require("path");

// POST API FOR POLICY
exports.policy = async (req, res) => {
  const { privacyPolicy, android_privacyPolicy
 } = req.body;

  if (!privacyPolicy || typeof privacyPolicy !== "string" ) {
    return res.status(400).json({ message: "Missing or invalid Privacy Policy" });
  }

  if (!android_privacyPolicy || typeof android_privacyPolicy !== "string" ) {
    return res.status(400).json({ message: "Missing or invalid Privacy Policy" });
  }

  const trimmedPrivacyPolicy = privacyPolicy.trim();
  const trimmedAndroidPrivacyPolicy = android_privacyPolicy.trim();

  if (trimmedPrivacyPolicy === "" ) {
    return res.status(400).json({ message: "Privacy Policy cannot be empty" });
  }

  if (trimmedAndroidPrivacyPolicy === "" ) {
    return res.status(400).json({ message: "Privacy Policy cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedPrivacyPolicy)) {
    return res.status(400).json({ error: "Privacy Policy cannot consist of only numbers or special characters" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidPrivacyPolicy)) {
    return res.status(400).json({ error: "Privacy Policy cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "policy.json");

  let policyData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
  } catch (error) {
  }

  const nextId = policyData.length > 0 ? Math.max(...policyData.map(item => item.id)) + 1 : 1;

  const data = {
    id: nextId,
    privacyPolicy: trimmedPrivacyPolicy,
    android_privacyPolicy: trimmedAndroidPrivacyPolicy,
  };

  policyData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(policyData, null, 2));

  res.status(200).json({ message: "Privacy Policy Notice data saved successfully", id: nextId });
};

exports.updatePolicy = async (req, res) => {
  const updateId = req.params.id;
  const { privacyPolicy, android_privacyPolicy
   } = req.body;

  if (!privacyPolicy || typeof privacyPolicy !== "string") {
    return res.status(400).json({ error: "Missing or invalid Privacy Policy" });
  }

  if (!android_privacyPolicy || typeof android_privacyPolicy !== "string") {
    return res.status(400).json({ error: "Missing or invalid Privacy Policy" });
  }

  const trimmedPrivacyPolicy = privacyPolicy.trim();
  const trimmedAndroidPrivacyPolicy = android_privacyPolicy.trim();

  if (trimmedPrivacyPolicy === "") {
    return res.status(400).json({ error: "Privacy Policy cannot be empty" });
  }

  if (trimmedAndroidPrivacyPolicy === "") {
    return res.status(400).json({ error: "Privacy Policy cannot be empty" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedPrivacyPolicy)) {
    return res.status(400).json({ error: "Privacy Policy cannot consist of only numbers or special characters" });
  }

  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedAndroidPrivacyPolicy)) {
    return res.status(400).json({ error: "Privacy Policy cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "policy.json");

  let policyData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const policyToUpdate = policyData.find(
    (data) => data.id.toString() === updateId
  );

  if (!policyToUpdate) {
    return res.status(404).json({ message: "Privacy Policy not found", data: [] });
  }

  policyToUpdate.privacyPolicy = trimmedPrivacyPolicy;
  policyToUpdate.android_privacyPolicy = trimmedAndroidPrivacyPolicy;

  try {
    fs.writeFileSync(filePath, JSON.stringify(policyData, null, 2));
    res.status(200).json({ message: "Privacy Policy data updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// GET ALL API FOR POLICY
exports.getAllPolicy = async (req, res) => {
  const filePath = path.join(__dirname, "policy.json");

  let policyData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading policy data" });
  }

  res.status(200).json({ policyData });
};

// DELETE API FOR POLICY
exports.deletePolicy  = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "policy.json");

  let policyData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  const policyToDeleteIndex = policyData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (policyToDeleteIndex === -1) {
    return res.status(404).json({ message: "Privacy Policy not found", data: [] });
  }

  policyData.splice(policyToDeleteIndex, 1);

  try {
    fs.writeFileSync(filePath, JSON.stringify(policyData, null, 2));
    res.status(200).json({ message: "Privacy Policy data deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};


