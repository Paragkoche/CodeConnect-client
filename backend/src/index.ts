import Express from "express";
import db from "@/db";
const app = Express();
app.use(Express.json());

app.get("/", (req, res) => {
  return res.json({
    states: "ok",
    "states-code": 200,
    ping: "pong",
    message: "Api is running....",
  });
});

app.listen(8080, async () => {
  await db.initialize();
  console.log("server is Running on 8080");
});
