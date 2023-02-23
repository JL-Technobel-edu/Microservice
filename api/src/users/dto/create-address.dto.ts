import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'bson';
import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, IsArray, ValidateNested, IsString, IsNotEmpty, IsObject, IsNumber } from 'class-validator';
import { CreateCountryDto } from './create-country.dto';
export class CreateAddressDto {



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
    @Type(()=>CreateCountryDto)
    country: CreateCountryDto;
}
