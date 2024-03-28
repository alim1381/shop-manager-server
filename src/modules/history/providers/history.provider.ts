import { Mongoose } from 'mongoose';
import { HistorySchema } from '../schemas/history.schema';

export const historyProviders = [
  {
    provide: 'HISTORY_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('History', HistorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
