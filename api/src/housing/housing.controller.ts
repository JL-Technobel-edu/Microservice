import { Controller, Get, Post, Body, Patch, Param, Delete,Headers, UseGuards, HttpCode, UploadedFiles, UseInterceptors, HttpStatus, Query } from '@nestjs/common';
import { HousingService } from './housing.service';
import { AvailabilityDto, CreateHousingDto,PictureDto,UpdateHousingDto } from './dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { AvailabilityService } from './availability.service';
import * as BSON from 'bson';

@Controller('housing')
export class HousingController {
  constructor(private readonly housingService: HousingService,private readonly avService: AvailabilityService,private readonly usersService:UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createHousingDto: CreateHousingDto,@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.housingService.create(userId,createHousingDto);
  }

  @Post('check')
  async isAvailable(@Body() dto: any) {
    return this.housingService.isAvailable(dto);
  }


  @Get('info')
  async info(@Query() dto: any){
    const g = await this.housingService.info(dto);
    console.log(g)
    return g

  }



  @Get()
  findAll(@Query() dr:any) {
    console.log(dr)
    return this.housingService.findAll(dr);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housingService.findOne(id);
  }



  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateHousingDto,@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.housingService.update({id,userId, ...dto});
  }


  @UseGuards(AuthGuard)
  @Patch(':id/picture')
  async updatePicture(@Param('id') id: string, @Body() dto: PictureDto,@Headers('authorization') token: string) {
    console.log(id)
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.housingService.update({ id,userId, ...dto});
  }


  @UseGuards(AuthGuard)
  @Post(':id/availability')
  async createAvailability(@Param('id') id: string, @Body() dto: AvailabilityDto,@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.avService.create({id, ...dto});
  }


  @Get(':id/availability')
  async findAllAvsByHousingId(@Param('id') id: string, ) {
    return this.avService.findAllAvsByHousingId({housingId:id});
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housingService.remove(+id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post(':id/files')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const o = req.params.id
          const dir = `./src/uploads/housing/files/${o}`
          if (fs.existsSync(dir))
          {
             return cb(null, dir)
          }         
          else {
            return fs.mkdir(dir, error => cb(error, dir))
          }

          
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async handleUploads(@Param('id') id: string,@UploadedFiles() files: Array<Express.Multer.File>,@Headers('authorization') token: string) {
    const userId = await this.usersService.decode(token.split(' ')[1]);
    return this.housingService.fileUpload({id,userId,files});
  }
}
