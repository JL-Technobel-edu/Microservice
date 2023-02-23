import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {  ValidateNested, IsNotEmpty,  IsNumber, IsNotEmptyObject } from 'class-validator';
import { RangeDateDto } from './range-date.dto';

export class OccupationDto {

    @ApiProperty({
        description: 'Housing price for the occupied period',
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        description: 'Housing capacity for the occupied period',
    })
    @IsNumber()
    @IsNotEmpty()
    capacity: number;



    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(()=>RangeDateDto)
    range: RangeDateDto;

  }