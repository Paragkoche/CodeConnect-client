import db from "@/db";
import { User, Question, Catalog, Answer } from "@/db/entity";

export const UserRepo = db.getRepository(User);
export const QuestionRepo = db.getRepository(Question);
export const CatalogRepo = db.getRepository(Catalog);
export const AnswerRepo = db.getRepository(Answer);
