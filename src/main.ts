import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'src/common/response.interceptor';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Hiring Api')
    .setVersion('1.0')
    .addServer('/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('postman', app, document);

  await app.listen(3000);
}
bootstrap();
