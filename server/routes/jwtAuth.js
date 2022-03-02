import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import createJwt from "../utils/createJwt.js";
import validate from "../middleware/validate.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post("/register", validate, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const token = createJwt(newUser.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/login", validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    const token = createJwt(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
export default router;
