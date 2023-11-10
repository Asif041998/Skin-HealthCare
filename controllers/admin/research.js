const fs = require("fs");
const path = require("path");
const researchPostValidation = require("../../validations/admin/research/researchPost");
const researchPutValidation = require("../../validations/admin/research/researchPut");

//POST DATA IN RESEARCH
exports.research = async (req, res) => {
  const { title, description, impact, works } = req.body;

  const { error } = researchPostValidation(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const filePath = path.join(__dirname, "research.json");

  // Read existing data from the file
  let researchData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
  }

  // Calculate the next available ID
  const nextId = Object.keys(researchData).length > 0 ? Math.max(...Object.keys(researchData).map(id => parseInt(id))) + 1 : 1;

  const data = {
    id: nextId,
    title: title,
    description: description,
    impact: impact,
    works: works
  };

  // Add the new data as a property of the researchData object
  researchData[nextId] = data;

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

  res.status(200).json({ message: "Research data saved successfully", data });
};

// PUT Research by ID API
exports.updateByIdResearch = async (req, res) => {
  const updateId = parseInt(req.params.id);
  const { title, description, impact, works } = req.body;

  const { error } = researchPutValidation(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const filePath = path.join(__dirname, "research.json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const researchData = JSON.parse(fileContent);

    // Check if research to update exists
    if (!researchData[updateId]) {
      return res.status(404).json({ error: "Research not found" });
    }

    // Update only the specified fields
    if (title) researchData[updateId].title = title;
    if (description) researchData[updateId].description = description;
    if (impact) researchData[updateId].impact = impact;
    if (works) researchData[updateId].works = works;

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

    res.status(200).json({
      message: "Research data updated successfully",
      updatedResearch: researchData[updateId]  // Include the updated research data in the response
    });
  } catch (error) {
    console.error("Error updating research:", error);
    return res.status(500).json({ error: "Error updating research data" });
  }
};

//GET ALL THE DATA 
// exports.getAllResearch = async (req, res) => {
//   const filePath = path.join(__dirname, "research.json");

//   let researchData = {};
//   try {
//     const fileContent = fs.readFileSync(filePath, "utf8");
//     researchData = JSON.parse(fileContent);
//   } catch (error) {
//     return res.status(404).json({ message: "Not Found" });
//   }

//   const researchArray = Object.keys(researchData).map(key => {
//     const researchItem = researchData[key];
//     if (researchItem && researchItem.id) {
//       return {
//         id: researchItem.id,
//         title: researchItem.title,
//         description: researchItem.description,
//         impact: researchItem.impact,
//         works: researchItem.works
//       };
//     }
//     return null; 
//   });

//   const filteredResearchArray = researchArray.filter(item => item !== null);

//   res.status(200).json(filteredResearchArray);
// };

exports.getAllResearch = async (req, res) => {
  const filePath = path.join(__dirname, "research.json");

  let researchData = {};
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    researchData = JSON.parse(fileContent);
  } catch (error) {
    return res.status(404).json({ message: "Not Found" });
  }

  const researchArray = Object.keys(researchData).map(key => {
    const researchItem = researchData[key];
    if (researchItem && researchItem.id) {
      return {
        id: researchItem.id,
        title: researchItem.title,
        description: researchItem.description,
        impact: researchItem.impact,
        works: researchItem.works
      };
    }
    return null;
  });

  const filteredResearchArray = researchArray.filter(item => item !== null);

  const response = {
    message: "Research data fetched successfully",
    data: filteredResearchArray
  };

  res.status(200).json(response);
};


//GET Research by ID API
exports.getByIdResearch = async (req, res) => {
  const researchId = parseInt(req.params.id);
  const filePath = path.join(__dirname, "research.json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const researchData = JSON.parse(fileContent);

    const research = researchData[researchId];

    if (!research) {
      return res.status(404).json({ message: "Research not found for the provided ID" });
    }

    res.status(200).json(research);
  } catch (error) {
    return res.status(404).json({ error : "Research not found for the provided ID" });
  }
};

//DELETE API FOR RESEARCH
exports.deleteByIdResearch = async (req, res) => {
  const researchId = parseInt(req.params.id);
  const filePath = path.join(__dirname, "research.json");

  try {
    // Read the existing data from the file
    let researchData = {};
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      researchData = JSON.parse(fileContent);
    } catch (error) {
      return res.status(404).json({ message: "Not Found" });
    }

    // Check if research entry exists
    if (!researchData[researchId]) {
      return res.status(404).json({ message: "Research not found for the provided ID" });
    }

    // Delete the specified research entry
    delete researchData[researchId];

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(researchData, null, 2));

    res.status(200).json({ message: "Research data deleted successfully" });
  } catch (error) {
    console.error("Error deleting research:", error);
    return res.status(500).json({ error: "Error deleting research data" });
  }
};
