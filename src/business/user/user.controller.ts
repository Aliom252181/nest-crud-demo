import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }


  @Get('findUser')
  // @Roles('admin')
  // @UseGuards(RolesGuard)
  findUser(@Query() query): Promise<User[]> {
    return this.userService.findUser(query.name);
  }

  @Post('register')
  async register(@Body() data): Promise<{ msg: string; code: number; data: any }> {
    const { accountName, age, realName, password, mobile } = data;
    const user = new User(realName, accountName, password, mobile, age);
    let isAnyOneEmpty: boolean;
    Object.keys(user).map((key) => {
      (!user[key] || user[key] == null) && (isAnyOneEmpty = true);
    });
    if (isAnyOneEmpty) return { code: -1, msg: '所有属性不能为空', data: null };
    return await this.userService.register(user);
  }
}
