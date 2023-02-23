import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class PhotoDto {



    @ApiProperty({
        description: 'Photo url',
    })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({
        description: 'Photo description',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Photo cover',
    })
    @IsOptional()
    @IsBoolean()
    isCover: boolean;
}

