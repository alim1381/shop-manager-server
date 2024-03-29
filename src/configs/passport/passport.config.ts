import * as passport from 'passport';
import * as session from 'express-session';

export const passportConfig = (app: any) => {
  app.use(
    session({
      secret: 'sss',
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
