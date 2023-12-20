import mongoose from 'mongoose';

import { Server } from 'http';
import app from './app';
import config from './config';

process.on('uncaught exception', error => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('database is connected successfully');
    server = app.listen(config.port, () => {
      console.log(`app is listening in the ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled rejection is detected we are closing our server.....',
    );
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();
