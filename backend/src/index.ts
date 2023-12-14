import Express from "express";
import db from "@/db";
import { config } from "dotenv";
import cors from "cors";
import v1Routes from "@/router";
config();
const app = Express();
app.use(cors());
app.use(Express.json());

app.get("/", (req, res) => {
  return res.json({
    states: "ok",
    "states-code": 200,
    ping: "pong",
    message: "Api is running....",
  });
});
app.use("/api/v1", v1Routes);
app.listen(8080, async () => {
  await db.initialize();
  console.log("server is Running on 8080");
});
