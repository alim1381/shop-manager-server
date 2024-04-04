import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import passport from 'passport';
import session from 'express-session';
import { swaggerConfig } from './configs/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
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
