const { Op } = require("sequelize");
const User = require("../../models/user/user");

// GET ALL THE USERS LIST ALONG PAGINATION, SEARCH AND SORTING
exports.listUsers = async (req, res) => {
  try {
    const search = req.query.search || '';
    const sortColumn = req.query.sortColumn || 'id';
    const sortOrder = req.query.sortOrder || 'DESC';

    const searchResults = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${search}%` } },
          { lastName: { [Op.like]: `%${search}%` } }
        ]
      },
      order: [[sortColumn, sortOrder]],
      attributes: { exclude: ["password"] },
      paranoid: false
    });

    if (searchResults.count === 0) {
      return res.status(200).json({
        message: "No users found in the table.",
        data: []
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;


    const offset = (page - 1) * limit;
    const paginatedUsers = searchResults.rows.slice(offset, offset + limit);

    return res.status(200).json({
      message: "Users fetched successfully.",
      users: paginatedUsers,
      totalCount: searchResults.count,
      currentPage: page,
      totalPages: Math.ceil(searchResults.count / limit),
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch users from the table.",
      error: err.message,
    });
  }
};


//GET THE DETAILS OF THE USER BY ID
exports.getUserById = async (req, res) => {
  try {
    console.log(req.user);

    let user;

    if(req.user.role === "admin"){
      user = await User.findByPk((req.params.id), { attributes: { exclude: ["password"] },  paranoid: false });
    }

    if (req.user.role === "user" && req.user.id === req.params.id) {
      user = await User.findByPk((req.params.id), { attributes: { exclude: ["password"] } });
    }

    if (!user) {
      return res.status(200).json({ message: "User not found", data: [] });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






