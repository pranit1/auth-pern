import express from "express";
import cors from "cors";
import jwtAuth from "./routes/jwtAuth.js";
import dashboard from "./routes/dashboard.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", jwtAuth);
app.use("/dashboard", dashboard);
app.listen(5000, () => {
  console.log("server is running");
});
