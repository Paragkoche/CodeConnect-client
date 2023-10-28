import { AnswerRepo } from "@/lib/repos";
import { StudentObject } from "@/util/token-object";
import { Router } from "express";

const route = Router();
/**
 * todo (update,crate,delete) Answer
 */

route.get("/get/:id", StudentObject, (req, res) => {
  try {
    const data = AnswerRepo.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.post("/submit-answer", StudentObject, (req, res) => {
  try {
    //   const {ans,states,q} = req.body;
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.put("/update-answer/:id", StudentObject);
route.delete("/delete-answer/:id", StudentObject);
export default route;
