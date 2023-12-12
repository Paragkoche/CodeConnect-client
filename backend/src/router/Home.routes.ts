import {
  AnswerRepo,
  CatalogRepo,
  QuestionRepo,
  ReduxRepo,
  UserRepo,
} from "@/lib/repos";
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
route.post(
  "/redux-teacher",
  TeacherObject,
  async (req: TeacherReq, res: Response) => {
    try {
      const upsertData = {
        json: req.body,
        users: [req.teacherObject],
      };
      const existingRecord = await ReduxRepo.findOne({
        where: { id: req.body.id },
      });
      let data = {};
      if (existingRecord) {
        // If the record exists, update it
        data = await ReduxRepo.update(existingRecord.id, upsertData);
      } else {
        // If the record doesn't exist, insert a new one
        const newRecord = ReduxRepo.create(upsertData);
        await ReduxRepo.save(newRecord);
        data =
          (await ReduxRepo.findOne({
            where: { id: req.body.id },
          })) || {};
      }
      res.json(data);
    } catch (e) {
      res.status(501).send(e);
    }
  }
);
route.post(
  "/redux-student",
  StudentObject,
  async (req: StudentReq, res: Response) => {
    try {
      const upsertData = {
        json: req.body.data,
        // user: [req.StudentObject],
      };

      const existingRecord = await ReduxRepo.findOne({
        where: {
          user: { id: req.StudentObject.id },
        },
        relations: ["user"],
      });
      // console.log("log ->>>", existingRecord);

      let data = {};
      if (existingRecord) {
        // If the record exists, update it
        data = await ReduxRepo.update(existingRecord.id, upsertData);
      } else {
        // If the record doesn't exist, insert a new one
        const newRecord = ReduxRepo.create(upsertData);
        await ReduxRepo.save(newRecord);
        data =
          (await ReduxRepo.findOne({
            where: { id: req.body.id },
          })) || {};
      }
      res.json(data);
    } catch (e) {
      res.status(501).send(e);
    }
  }
);
route.get(
  "/redux-teacher",
  TeacherObject,
  async (req: TeacherReq, res: Response) => {
    try {
      const existingRecord = await ReduxRepo.findOne({
        where: { id: req.body.id },
      });

      res.json(existingRecord);
    } catch (e) {
      res.status(501).send(e);
    }
  }
);
route.get(
  "/redux-student",
  StudentObject,
  async (req: StudentReq, res: Response) => {
    try {
      const existingRecord = await ReduxRepo.findOne({
        where: { id: req.body.id },
      });

      res.json(existingRecord);
    } catch (e) {
      res.status(501).send(e);
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
