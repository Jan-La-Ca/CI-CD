import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [CryptoService],
  exports: [CryptoService]
})
export class CryptoModule {}
