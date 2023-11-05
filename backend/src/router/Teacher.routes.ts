import { AnswerRepo, CatalogRepo, QuestionRepo, UserRepo } from "@/lib/repos";
import { TeacherObject, TeacherReq } from "@/util/token-object";
import { Router } from "express";

const route = Router();
/**
 * todo (create,delete) catalog
 * todo (update,crate,delete) question
 */

route.get("/answer/:id", TeacherObject, async (req, res) => {
  try {
    const data = await AnswerRepo.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.post("/answer-review/:id", TeacherObject, async (req, res) => {
  try {
    const {
      comment,
      status,
      score,
    }: {
      comment: string;
      status: string;
      score: string;
    } = req.body;
    const ans = await AnswerRepo.findOne({
      where: { id: req.params.id },
      relations: ["AnsBy"],
    });
    const user = await UserRepo.findOne({
      where: {
        id: ans?.AnsBy[0].id,
      },
    });
    if (!ans || !user)
      return res.status(404).json({
        message: "answer not found or user not fund",
      });
    const update = await AnswerRepo.update(ans.id, {
      comment,
      states: status,
    });
    const update2 = await UserRepo.update(user.id, {
      score: user.score + parseInt(score),
    });
    if (!update || !update2)
      return res.status(401).json({
        message: "answer not update",
      });
    return res.json({
      data: {
        ans: await AnswerRepo.findOneBy({
          id: ans.id,
        }),
        user: await UserRepo.findOneBy({
          id: user.id,
        }),
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.get("/get/questions", TeacherObject, async (req: TeacherReq, res) => {
  try {
    const data = await QuestionRepo.find({
      where: {
        createBy: {
          id: req.teacherObject.id,
        },
      },
      relations: ["solve", "catalog"],
    });
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.get("/get/catalog", TeacherObject, async (req: TeacherReq, res) => {
  try {
    const data = await CatalogRepo.find();
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});

route.delete("/delete-question/:id", TeacherObject, async (req, res) => {
  try {
    const data = await QuestionRepo.delete(req.params.id);
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.post("/post-question", TeacherObject, async (req: TeacherReq, res) => {
  try {
    const { q, testCase, Cid } = req.body;
    const cdata = await CatalogRepo.findOne({ where: { id: Cid } });
    if (!cdata)
      return res.status(401).json({
        message: "category not found",
      });
    const data = await QuestionRepo.save(
      QuestionRepo.create({
        q,
        testCase,
        createBy: [req.teacherObject],
        catalog: [cdata],
      })
    );
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.put("/update-question/:id", TeacherObject, async (req, res) => {
  try {
    const { q, testCase } = req.body;
    const data = await QuestionRepo.update(req.params.id, {
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

route.delete("/delete-catalog/:id", TeacherObject, async (req, res) => {
  try {
    const data = await CatalogRepo.delete(req.params.id);
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.post("/post-catalog", TeacherObject, async (req, res) => {
  try {
    const { name } = req.body;
    const data = await CatalogRepo.save(
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
