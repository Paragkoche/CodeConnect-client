import { DataSource } from "typeorm";
import { User, Question, Catalog, Answer } from "./entity";
export default new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  logger: "debug",
  logging: "all",
  synchronize: true,
  entities: [User, Question, Catalog, Answer],
});
