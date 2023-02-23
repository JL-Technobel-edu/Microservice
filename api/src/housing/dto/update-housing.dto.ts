import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsArray, ValidateNested, IsString, IsNotEmptyObject, IsPhoneNumber, IsNumber } from 'class-validator';
import { AvailabilityDto } from './availability.dto';
import { OccupationDto  } from './occupation.dto';
import {  PhotoDto } from './photo.dto';
import {  AddressDto } from './address.dto';

export class UpdateHousingDto {

  
    @ApiProperty({
        description: 'Housing title',
    })
    @IsOptional()
    @IsString()
    title: string; 
 

    @ApiProperty({
        description: 'Housing description',
    })
    @IsOptional()
    @IsString()
    description: string; 


  
    @ApiProperty({
        description: 'Housing participant',
    })
    @IsOptional()
    @IsNumber()
    participant: number;
  

  
    @ApiProperty({
        description: 'Housing price',
    })
    @IsOptional()
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'phoneNumber of the owner',
    })
    @IsOptional()
    @IsPhoneNumber()
    phoneNumber: string;

    @ApiProperty({
        description: 'housing address',
    })
    @IsOptional()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=>AddressDto)
    address: AddressDto;

    @ApiProperty({
        description: 'housing occupation',
    })
    @IsOptional()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=>OccupationDto)
    occupied: OccupationDto;


    @ApiProperty({
        description: 'housing availability',
    })
    @IsOptional()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=>AvailabilityDto)
    availability: AvailabilityDto;

    @ApiProperty({
        description: 'housing cover',
    })
    @IsOptional()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=>PhotoDto)
    cover: PhotoDto;

    @ApiProperty({
        description: 'housing cover',
    })
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(()=>PhotoDto)
    picture: PhotoDto[];
}
