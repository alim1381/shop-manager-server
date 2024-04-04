import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import session from 'express-session';
import { swaggerConfig } from './configs/swagger/swagger.config';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: '*',
      credentials: true, //access-control-allow-credentials:true
      optionsSuccessStatus: 200,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(
    session({
      secret: 'secret',
      saveUninitialized: true,
      resave: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  swaggerConfig(app);

  await app.listen(4000);
}
bootstrap();
