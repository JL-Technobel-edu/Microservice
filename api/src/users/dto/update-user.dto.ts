import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'bson';
import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, IsArray, ValidateNested, IsString, IsNotEmpty, IsObject } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';
export class UpdateUserDto {



    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsString()
    @IsNotEmpty()
    firstname: string;


    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsString()
    @IsNotEmpty()
    lastname: string;


    @ApiProperty({
        description: 'ID of the next question or null',
    })
    @IsObject()
    @ValidateNested()
    @Type(()=>CreateAddressDto)
    address: CreateAddressDto;
}
