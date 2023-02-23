import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Headers } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('tour')
export class ToursController {
  constructor(private readonly toursService: ToursService,private readonly usersService:UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createTourDto: any,@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.toursService.create({userId,...createTourDto});
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.toursService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/housing')
  async addHousing(@Param('id') id:any,@Body() dto:any,@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.toursService.addHousing({id,userId,...dto});
  }


  @UseGuards(AuthGuard)
  @Patch(':id/housing')
  async updateHousing(@Param('id') id: string, @Body() dto: any,@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.toursService.updateHousing({id,userId, ...dto});
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(id);
  }
}
