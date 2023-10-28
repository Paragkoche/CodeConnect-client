import { CatalogRepo, QuestionRepo } from "@/lib/repos";
import { TeacherObject, TeacherReq } from "@/util/token-object";
import { Router } from "express";

const route = Router();
/**
 * todo (create,delete) catalog
 * todo (update,crate,delete) question
 */

route.get("/get/questions", TeacherObject, (req: TeacherReq, res) => {
  try {
    const data = QuestionRepo.find({
      where: {
        createBy: {
          id: req.teacherObject.id,
        },
      },
    });
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.get("/get/catalog", TeacherObject, (req: TeacherReq, res) => {
  try {
    const data = CatalogRepo.find();
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});

route.delete("/delete-question/:id", TeacherObject, (req, res) => {
  try {
    const data = QuestionRepo.delete(req.params.id);
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.post("/post-question", TeacherObject, (req, res) => {
  try {
    const { q, testCase } = req.body;
    const data = QuestionRepo.save(
      QuestionRepo.create({
        q,
        testCase,
      })
    );
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.put("/update-question/:id", TeacherObject, (req, res) => {
  try {
    const { q, testCase } = req.body;
    const data = QuestionRepo.update(req.params.id, {
      q,
      testCase,
    });
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});

route.delete("/delete-catalog/:id", TeacherObject, (req, res) => {
  try {
    const data = CatalogRepo.delete(req.params.id);
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.post("/post-catalog", TeacherObject, (req, res) => {
  try {
    const { name } = req.body;
    const data = CatalogRepo.save(
      CatalogRepo.create({
        name,
      })
    );
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});

export default route;
