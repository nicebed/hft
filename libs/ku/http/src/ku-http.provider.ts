import { ConfigService } from '@nestjs/config';
import { request } from 'undici';
import { SignGenerator } from './sign-generator';
import { _Keys } from './types';




export class HttpProvider {
  protected signGenerator = new SignGenerator();
  protected keys: _Keys;
  protected http = request;

  constructor(protected configService: ConfigService<_Keys, true>) {
    this.keys = {
      API_KEY: this.configService.get('API_KEY'),
      API_SECRET: this.configService.get('API_SECRET'),
      API_PASSPHRASE: this.configService.get('API_PASSPHRASE'),
    };
  }
}
