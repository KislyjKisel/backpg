import dotenv from 'dotenv';
{
    const dotenvResult = dotenv.config({ path: './.env' });
    if(dotenvResult.error) {
        console.error(dotenvResult.error);
        process.exit(1);
    }
}

import express from 'express';
import { apiRouter } from './routes/api';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
