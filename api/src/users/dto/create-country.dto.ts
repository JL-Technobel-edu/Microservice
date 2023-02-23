import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'bson';
import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, IsArray, ValidateNested, IsString, IsNotEmpty, IsObject, IS_LENGTH } from 'class-validator';

export class CreateCountryDto {



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