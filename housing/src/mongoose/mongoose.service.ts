import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { join } from 'path';

@Injectable()
export class MongooseService implements MongooseOptionsFactory  {

  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createMongooseOptions(): MongooseModuleOptions  {
    return {
      uri: this.config.get<string>('DATABASE_URL'),
      
    };
  }
}

