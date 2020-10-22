import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 45})
  realName: string;

  @Column({length: 45})
  accountName: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column('int')
  age: number;


  constructor(realName: string, accountName: string, password: string, mobile: string, age: number) {
    this.realName = realName;
    this.accountName = accountName;
    this.password = password;
    this.mobile = mobile;
    this.age = age;
  }

}