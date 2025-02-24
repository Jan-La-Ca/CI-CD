import {  Inject, Injectable } from '@nestjs/common';
// import { ALGORITHM, SECRET_KEY } from 'src/config/app.config';
import crypto from "crypto"
import * as bcrypt from "bcrypt"
import { Environment } from '@utils/types/environment';

@Injectable()
export class CryptoService {
      private algorithm: string;
      private secretKey: string;
      private iv: Buffer
      constructor( @Inject("ENV") env: Environment) {
        this.algorithm = env.ALGORITHM
        this.secretKey = env.SECRET_KEY
      }
      public async encodeBcrypt(password: string){
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password,salt)
        return hash
      }
  
      public async comparePassword(requestedPassword,currentPassword){
         return await bcrypt.compare(requestedPassword, currentPassword)
      }
  
      public encodeField(field: string){
          const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
          let encrypted = cipher.update(field, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          return this.iv.toString('hex') + ':' + encrypted;
      }
  
      public decodeField = (encryptedField: string): string => {
          const [ivHex, encryptedValue] = encryptedField.split(':');
          const iv = Buffer.from(ivHex, 'hex');
          const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), iv);
          let decrypted = decipher.update(encryptedValue, 'hex', 'utf8');
          decrypted += decipher.final('utf8');
          return decrypted;
      };
}
