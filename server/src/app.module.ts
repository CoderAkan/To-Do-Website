// Связующее звено в nest приложениях
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';

@Module({ 
  imports: [
    UserModule, 
    CategoryModule, 
    AuthModule, 
    TasksModule,
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}), 
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
