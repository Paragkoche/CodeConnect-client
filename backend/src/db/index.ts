import { DataSource } from "typeorm";
import { User, Question, Catalog, Answer } from "./entity";
import { Redux } from "./entity/redux";
export default new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  logger: "debug",
  logging: true,
  synchronize: true,
  entities: [User, Question, Catalog, Answer, Redux],
});
