import { ApiProperty } from '@nestjs/swagger';
import {  IsOptional,  IsString, IsNotEmpty} from 'class-validator';

export class CreateHousingDto {
    @ApiProperty({
        description: 'Title to create a new Housing',
    })
    @IsString()
    @IsNotEmpty()
    title:string


    @ApiProperty({
        description: 'Description optional',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description:string
}
