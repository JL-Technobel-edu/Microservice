import { Controller, Get, Post, Body, Patch, Param, Delete,Headers, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post('/signin')
  signin(@Body() dto: any) {
    return this.usersService.signin(dto);
  }

  @Post('/signup')
  signup(@Body() dto: any,@Headers('origin') url:string) {
    return this.usersService.signup(dto,url);
  }

  @Post('/logout')
  logout(@Body() dto: any) {
    return this.usersService.logout(dto);
  }

  @Post('/refresh')
  refresh(@Body() createUserDto: any) {
    return this.usersService.refresh(createUserDto);
  }


  @UseGuards(AuthGuard)
  @Get('/me')
  async getProfile(@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.usersService.profile(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('/me')
  async updateProfile(@Headers('authorization') token: string,@Body() updateUserDto:UpdateUserDto) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.usersService.updateProfile(userId,updateUserDto);
  }
  @Post('/activation')
  async activation(@Body('token') token: string) {
    const userId = await this.usersService.decode(token);
    return this.usersService.activation(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
