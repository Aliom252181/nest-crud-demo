import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  /**
   * 查询是否有该角色
   * @param accountName 用户名
   */
  async findUser(accountName: string): Promise<User[]> {
    return this.userRepository.find({ accountName });
  }

  /**
   * 注册
   * @param data 前端传回的数据
   */
  async register(data: User): Promise<{ msg: string; code: number; data: any }> {
    const { accountName, age, realName, password, mobile } = data;
    const user = await this.findUser(accountName);
    if (user.length > 0) return { code: 400, msg: '用户名已存在', data: null };

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt);  // 加密密码
    const userData = new User(realName, accountName, hashPwd, mobile, age);

    return { code: 0, msg: '操作成功', data: await this.userRepository.save(userData) };
  }
}