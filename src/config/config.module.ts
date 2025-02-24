import { Module } from '@nestjs/common';
import { AppProvider } from './app.provider';

@Module({
    providers: [AppProvider],
    exports: [AppProvider]
})
export class ConfigModule {}
