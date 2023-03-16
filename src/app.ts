import express, { Application, Request, Response, NextFunction  } from 'express';
import * as Sentry from '@sentry/node';
import compression from 'compression';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';

import { SENTRY_DNS, MONGO_DB_URI, MONGO_DB_PARAMS } from './utils';

import { 
   userRouter, 
   authRouter, 
   wordsRouter, 
   searchRouter,
   wordsPublicRouter, 
   sentryRouter,
   publicSearchRouter,
   feedbackRouter,
   
} from './lib/controllers/router.index';
import missingRouter from './lib/controllers/missing/missing.routing';

class Server {
   private app: Application;
   private env: number|string = process.env.PORT || 'dev';
   private port: number|string = process.env.PORT || 5200;

   constructor() {
      this.app = express();
      this.setLogging();
      this.setConfig();
      this.setRouter();
      this.databaseConnection();
      this.run();
      //this.init();
   }

   private setConfig(): void {
      this.app.use(cors());
      this.app.use(helmet());
      this.app.use(compression());
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({extended: false}));
      this.app.use((request: Request, response: Response, next: NextFunction) => {
         response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
         response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
         response.header('Content-Security-Policy', "default-src 'self'");
         next();
      });

      this.app.enable('trust proxy');
      this.app.set('port', this.port);
   }

   private setLogging(): void {
      Sentry.init({ dsn: SENTRY_DNS });
   }

   private init(): void {
      //loadAll()
   }

   private setRouter(): void {
      this.app.use('/v1', feedbackRouter);
      this.app.use('/v1', publicSearchRouter);
      this.app.use('/v1/sentry', sentryRouter);
      this.app.use('/v2', userRouter);
      this.app.use('/v2', wordsRouter);
      this.app.use('/v2', searchRouter);
      this.app.use('/v2', authRouter);
      this.app.use('/v2', missingRouter);
      this.app.use('/v3/word', wordsPublicRouter);
   }

   private databaseConnection(): void {
      mongoose.Promise = global.Promise;
      mongoose
      .connect(MONGO_DB_URI, MONGO_DB_PARAMS)
      .then(() => console.log('Database Status: Connected'))
      .catch((e) => console.log('Database Status:', e.errmsg));
   }

   private run(): void { 
      this.app.listen(this.port, () => {
         console.log('Express Server Running in mode', this.env);
         console.log('Express Server Running in port', this.port);
      });
   }
}

new Server();