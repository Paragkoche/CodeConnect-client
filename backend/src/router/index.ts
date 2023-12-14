import { Router } from "express";
import HomeRoute from "./Home.routes";
import FormRoute from "./Login.routes";
import teacherRoute from "./Teacher.routes";
import studentRoute from "./Student.routes";
const route = Router();

route.use("/", FormRoute);
route.use("/Home", HomeRoute);
route.use("/teacher", teacherRoute);
route.use("/student", studentRoute);

export default route;
