import { AnswerRepo, CatalogRepo, QuestionRepo, UserRepo } from "@/lib/repos";
import {
  StudentObject,
  StudentReq,
  TeacherObject,
  TeacherReq,
} from "@/util/token-object";
import { Router, Response } from "express";
const route = Router();

route.get(
  "/student-dashboard",
  StudentObject,
  async (req: StudentReq, res: Response) => {
    try {
      const solve = await AnswerRepo.find({
        where: {
          AnsBy: {
            id: req.StudentObject.id,
          },
        },
        relations: ["Question"],
      });
      return res.json({
        data: {
          count: solve.length,
          solve,
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: e.toString(),
      });
    }
  }
);
route.get(
  "/teacher-dashboard",
  TeacherObject,
  async (req: TeacherReq, res: Response) => {
    try {
      const solve = await QuestionRepo.find({
        where: {
          createBy: {
            id: req.teacherObject.id,
          },
        },
        relations: ["createBy", "solve", "catalog"],
      });
      const cat = await CatalogRepo.find();
      console.log({
        count: solve.length,
        q: solve,
        cat,
      });

      return res.json({
        data: {
          count: solve.length,
          q: solve,
          cat,
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: e.toString(),
      });
    }
  }
);
route.get("/leader-broad", async (req, res) => {
  try {
    const data = await UserRepo.createQueryBuilder("user")

      .where("user.role = :role", { role: "Student" })
      .leftJoinAndSelect("user.so", "answer")
      .andWhere("user.score > :score", { score: 0 })
      .orderBy("user.score", "DESC")
      .getMany();
    const m_data = data.map((v) => {
      return {
        rank: v.score,
        name: v.name,
        question_solve: v.so.length,
      };
    });
    return res.json({
      data: m_data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
export default route;
