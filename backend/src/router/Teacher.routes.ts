import { TeacherObject } from "@/util/token-object";
import { Router } from "express";

const route = Router();
/**
 * todo (create,delete) catalog
 * todo (update,crate,delete) question
 */

route.get("/get/questions", TeacherObject);
route.get("/get/catalog", TeacherObject);

route.delete("/delete-question/:id", TeacherObject);
route.post("/post-question", TeacherObject);
route.put("/update-question/:id", TeacherObject);

route.delete("/delete-catalog/:id", TeacherObject);
route.post("/post-catalog", TeacherObject);

export default route;
