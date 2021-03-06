const db = require("../../db/index");

const getAllUsers = async (req, res, next) => {
  try {
    let users = await db.any("SELECT * FROM users");
    res.json({
      status: "success",
      message: "all users",
      payload: users
    });
  } catch (err) {
    res.json({
      status: "error",
      payload: null,
      message: err
    });
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    let user = await db.one(`SELECT * FROM users WHERE id=${req.params.id}`);
    res.json({
      status: "success",
      payload: user,
      message: "Received ONE user!"
    });
  } catch (err) {
    res.json({
      status: "error",
      payload: null,
      message: err
    });
    next(err);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    await db.none("DELETE FROM users WHERE id=$1", [req.params.id]);
    res.json({
      status: "success",
      message: "You destroyed the user",
    });
  } catch (err) {
    res.json({
      status: "error",
      payload: null,
      message: err
    });
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await db.one(
      `INSERT INTO users (username) VALUES('${req.body.username}') RETURNING *`
    );
    res.json({
      status: "succss",
      message: "New user added",
      user
    });
  } catch (err) {
    next(err);
  }
};



module.exports = { getAllUsers, getSingleUser, deleteUser, createUser };
