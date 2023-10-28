import { Router } from "express";
import HomeRoute from "./Home.routes";
import FormRoute from "./Login.routes";
const route = Router();

route.use("/", FormRoute);
route.use("/Home", HomeRoute);

export default route;
