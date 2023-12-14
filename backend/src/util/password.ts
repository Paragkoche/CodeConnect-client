import { User } from "@/db/entity";
import bcrypt from "bcrypt";

export const createPassword = async (_this: User, password: string) => {
  let ps = password || _this.password;
  let hash = await bcrypt.hash(ps, await bcrypt.genSalt(14));
  _this.password = hash;
};
export const verifyPassword = async (password: string, HPassword: string) =>
  await bcrypt.compare(password, HPassword);
