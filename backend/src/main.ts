import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
   app.useGlobalPipes(new ValidationPipe());
   // Serve files from the uploads directory
    app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/', // URL prefix for accessing the files
    });

   app.enableCors();
  const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Server is running on http://localhost:${PORT}`);
}
bootstrap();