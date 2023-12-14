import { UserRepo } from "@/lib/repos";
import { Router } from "express";

import { verifyPassword } from "@/util/password";
import { create_Token } from "@/util/token";
const route = Router();

route.post("/login", async (req, res) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email || !password)
      return res.status(401).json({
        state: 401,
        message: "Require input username or password",
      });
    if (!email.endsWith("raisoni.net"))
      return res.status(401).json({
        status: 401,
        message: "Email id not register in raisoni portal",
      });
    const data = await UserRepo.findOne({
      where: {
        email,
      },
    });
    if (!data)
      return res.status(401).json({
        status: 401,
        message: "User not found",
      });
    if (!(await verifyPassword(password, data.password)))
      return res.status(401).json({
        status: 401,
        message: "Password invalid",
      });
    return res.json({
      status: 200,
      message: "successful login",
      data: {
        token: create_Token({ id: data.id, role: data.role }),
        ...{ ...data, password: undefined },
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: e.toString(),
    });
  }
});
route.post("/sign-in", async (req, res) => {
  const {
    name,
    username,
    phone_number,
    password,
    email,
    role,
  }: {
    [key in string]: string;
  } = req.body;
  if (!email || !password || !name || !username || !phone_number || !role)
    return res.status(401).json({
      state: 401,
      message:
        "Require input email,name,phone number,role, username , password",
    });
  if (!email.endsWith("raisoni.net"))
    return res.status(401).json({
      status: 401,
      message: "Email id not register in raisoni portal",
    });
  if (role == "Teacher" || role == "Student") {
    try {
      const data = await UserRepo.save(
        UserRepo.create({
          name,
          email,
          password,
          phone_number,
          username,
          role,
        })
      );
      return res.json({
        status: 200,
        message: "successful Register",
        data: {
          token: create_Token({ id: data.id, role: data.role }),
          ...{ ...data, password: undefined },
        },
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: e.toString(),
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: "Email id not register in raisoni portal",
    });
  }
});

export default route;
