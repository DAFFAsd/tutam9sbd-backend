const pg = require("../utils/connect");

exports.register = async function register(req, res) {
  try {
    const { email, username, password } = req.body;

    const checkEmailResponse = await pg.query(
      "SELECT * FROM manager WHERE email = $1",
      [email]
    );

    if (checkEmailResponse.rows.length > 0) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const response = await pg.query(
      "INSERT INTO manager (email, username, password) VALUES ($1, $2, $3) RETURNING *",
      [email, username, password]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async function login(req, res) {
  try {
    const { email, password } = req.body;
    const response = await pg.query(
      "SELECT * FROM manager WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (response.rows.length === 0) throw new Error("Failed to login");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getProfile = async function getProfile(req, res) {
  try {
    const { email } = req.query; 
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const response = await pg.query(
      "SELECT email, username, password FROM manager WHERE email = $1",
      [email]
    );
    
    if (response.rows.length === 0) throw new Error("User not found");

    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePassword = async function updatePassword(req, res) {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const checkPasswordResponse = await pg.query(
      "SELECT * FROM manager WHERE email = $1 AND password = $2",
      [email, currentPassword]
    );

    if (checkPasswordResponse.rows.length === 0) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    await pg.query(
      "UPDATE manager SET password = $1 WHERE email = $2",
      [newPassword, email]
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

