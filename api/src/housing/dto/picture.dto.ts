import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsArray, ValidateNested, IsString, IsNotEmptyObject, IsPhoneNumber, IsNumber } from 'class-validator';
import {  PhotoDto } from './photo.dto';


export class PictureDto {



    @ApiProperty({
        description: 'housing picture',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(()=>PhotoDto)
    picture: PhotoDto[];
}