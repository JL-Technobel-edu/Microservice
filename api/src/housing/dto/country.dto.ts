import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsNotEmpty } from 'class-validator';

export class CountryDto {



    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsString()
    @IsNotEmpty()
    code: string;
}