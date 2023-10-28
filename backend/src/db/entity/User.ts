import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { createPassword } from "@/util/password";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  phone_number: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  role: "Teacher" | "Student";

  @BeforeInsert()
  async g(password: string) {
    return await createPassword(this, password);
  }
}
