import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty,  IsDate } from 'class-validator';

export class RangeDateDto{

    @ApiProperty({
        description: 'Start date',
    })
    @IsDate()
    @IsNotEmpty()
    from: Date;

    @ApiProperty({
        description: 'End date',
    })
    @IsDate()
    @IsNotEmpty()
    to: Date;





  }