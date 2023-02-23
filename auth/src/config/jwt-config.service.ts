import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class JwtConfigService {

    private readonly envConfig: { [key: string]: any } = null;
  
    constructor(private config: ConfigService) {
      this.envConfig = {};
      this.envConfig.JWT = {
        options:{        
            secret: this.config.get<string>('JWT_SECRET'),
            expiresIn: '1m'
        },
        name:'access_token'
      };
      this.envConfig.RFT = {
        options:{        
            secret: this.config.get<string>('RT_JWT_SECRET'),
            expiresIn: '7d'
        },
        name:'refresh_token'
      };
      this.envConfig.ACT = {
        options:{        
            secret: this.config.get<string>('ACT_JWT_SECRET'),
            expiresIn: '1d'
        },

        name:'activation_token'
      };
      this.envConfig.CHK = {
        options:{        
            secret: this.config.get<string>('CHK_JWT_SECRET'),
            expiresIn: '15m'
        },

        name:'activation_token'
      };
    }
  
    get(key: string): any {
      return this.envConfig[key];
    }
  }