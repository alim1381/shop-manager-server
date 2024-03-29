import * as passport from 'passport';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
dotenv.config();

export const passportConfig = (app: any) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
