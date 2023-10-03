const fs = require("fs");
const path = require("path");

exports.policy = async (req, res) => {
  const { privacyPolicy } = req.body;

  // Validate privacy policy
  if (!privacyPolicy || typeof privacyPolicy !== "string") {
    return res.status(400).json({ error: "Missing or invalid privacy policy" });
  }

  // Trim leading and trailing spaces from the privacy policy
  const trimmedPrivacyPolicy = privacyPolicy.trim();

  // Check if privacy policy is empty after trimming
  if (trimmedPrivacyPolicy === "") {
    return res.status(400).json({ error: "Privacy policy cannot be empty" });
  }

  // Check if privacy policy contains only numbers or special characters
  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedPrivacyPolicy)) {
    return res.status(400).json({ error: "Privacy policy cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "policy.json");

  // Read existing data from the file
  let policyData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist or cannot be read, initialize with an empty array
  }

  // Calculate the next available ID
  const nextId = policyData.length > 0 ? Math.max(...policyData.map(item => item.id)) + 1 : 1;

  const data = {
    id: nextId,
    privacyPolicy: trimmedPrivacyPolicy,
  };

  // Add the new data to the array
  policyData.push(data);

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(policyData, null, 2));

  res.status(200).json({ message: "Privacy policy data saved successfully", id: nextId });
};

exports.updatePolicy = async (req, res) => {
  const updateId = req.params.id;
  const { privacyPolicy } = req.body;

  // Validate policy policy
  if (!privacyPolicy || typeof privacyPolicy !== "string") {
    return res.status(400).json({ error: "Missing or invalid privacy policy" });
  }

  // Trim leading and trailing spaces from the privacy policy
  const trimmedPrivacyPolicy = privacyPolicy.trim();

  // Check if Privacy policy is empty after trimming
  if (trimmedPrivacyPolicy === "") {
    return res.status(400).json({ error: "Privacy policy cannot be empty" });
  }

  // Check if Privacy policy contains only numbers or special characters
  if (/^[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]+$/.test(trimmedPrivacyPolicy)) {
    return res.status(400).json({ error: "Privacy policy cannot consist of only numbers or special characters" });
  }

  const filePath = path.join(__dirname, "policy.json");

  let policyData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

  const policyToUpdate = policyData.find(
    (data) => data.id.toString() === updateId
  );

  if (!policyToUpdate) {
    return res.status(404).json({ error: "Privacy policy not found" });
  }

  policyToUpdate.privacyPolicy = trimmedPrivacyPolicy;

  try {
    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(policyData, null, 2));
    res.status(200).json({ message: "Privacy policy data updated successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
  }
};

exports.getAllPolicy = async (req, res) => {
  const filePath = path.join(__dirname, "policy.json");

  let policyData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
    let data ={
      id: policyData[0].id,
      privacyPolicy: policyData[0].privacyPolicy
    }
    res.status(200).json({data});
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

};

exports.deletePolicy = async (req, res) => {
  const deleteId = req.params.id;

  const filePath = path.join(__dirname, "policy.json");

  let policyData = [];
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    policyData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(500).json({ error: "Error reading file" });
  }

  const policyToDeleteIndex = policyData.findIndex(
    (data) => data.id.toString() === deleteId
  );

  if (policyToDeleteIndex === -1) {
    return res.status(404).json({ error: "Privacy policy not found" });
  }

  // Remove the policy data from the array
  policyData.splice(policyToDeleteIndex, 1);

  try {
    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(policyData, null, 2));
    res.status(200).json({ message: "Privacy policy data deleted successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return res.status(500).json({ error: "Error writing to file" });
  }
};
