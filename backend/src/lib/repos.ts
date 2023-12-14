import db from "@/db";
import { User, Question, Catalog, Answer } from "@/db/entity";
import { Redux } from "@/db/entity/redux";

export const UserRepo = db.getRepository(User);
export const QuestionRepo = db.getRepository(Question);
export const CatalogRepo = db.getRepository(Catalog);
export const AnswerRepo = db.getRepository(Answer);
export const ReduxRepo = db.getRepository(Redux);
