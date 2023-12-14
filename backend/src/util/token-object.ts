import { User } from "@/db/entity";
import { NextFunction, Request, Response } from "express";
import { verify_token } from "./token";
import { UserRepo } from "@/lib/repos";

export interface TeacherReq extends Request {
  teacherObject: User;
}

export interface StudentReq extends Request {
  StudentObject: User;
}

export const TeacherObject = async (
  req: TeacherReq,
  rep: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers.authorization;
    if (!key)
      return rep.status(401).json({
        message: "UnAuthorization",
      });

    const token: any = key.split("Bearer ").at(-1);

    const verify: { id: string; role: string } = verify_token(token);
    if (!verify)
      return rep.status(401).json({
        message: "token not valid",
      });
    console.log(verify);

    if (verify.role != "Teacher")
      return rep.status(401).json({
        message: "token not Teacher token",
      });
    const data = await UserRepo.findOneBy({
      id: verify.id,
    });
    console.log(data);

    if (!data || data.role !== verify.role)
      return rep.status(401).json({
        message: "token not Teacher token",
      });
    req.teacherObject = data;
    return next();
  } catch (e) {
    return rep.status(500).json({
      message: e.toString(),
    });
  }
};
export const StudentObject = async (
  req: StudentReq,
  rep: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers.authorization;
    if (!key)
      return rep.status(401).json({
        message: "UnAuthorization",
      });
    const token: any = key.split("Bearer ").at(-1);
    const verify: { id: string; role: string } = verify_token(token);
    if (!verify)
      return rep.status(401).json({
        message: "token not valid",
      });
    if (verify.role != "Student")
      return rep.status(401).json({
        message: "token not Student token",
      });
    const data = await UserRepo.findOneBy({
      id: verify.id,
    });
    if (!data || data.role != verify.role)
      return rep.status(401).json({
        message: "token not Student token",
      });
    req.StudentObject = data;
    return next();
  } catch (e) {
    console.log(e);

    return rep.status(500).json({
      message: e.toString(),
    });
  }
};
