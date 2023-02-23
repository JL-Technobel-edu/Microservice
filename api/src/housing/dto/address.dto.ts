import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {  ValidateNested, IsString, IsNotEmpty, IsObject, IsNumber } from 'class-validator';
import {  CountryDto } from './country.dto';

export class AddressDto {



    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsNumber()
    @IsNotEmpty()
    zip: number;

    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsString()
    @IsNotEmpty()
    city: string;



    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsObject()
    @ValidateNested()
    @Type(()=>CountryDto)
    country: CountryDto;
}
