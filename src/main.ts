import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './configs/swagger/swagger.config';
import { passportConfig } from './configs/passport/passport.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  passportConfig(app);
  swaggerConfig(app);

  await app.listen(3000);
}
bootstrap();
