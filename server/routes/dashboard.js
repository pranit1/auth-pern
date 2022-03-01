import express from "express";
import pool from "../db.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();
router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name, user_email FROM users WHERE user_id = $1",
      [req.user]
    );
    res.status(200).json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.delete("/user", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [req.user]
    );
    res.status(200).json(user.rows[0].id);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
export default router;
