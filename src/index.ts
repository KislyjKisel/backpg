import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
{
    const dotenvResult = dotenv.config({ path: './.env' });
    if(dotenvResult.error) {
        console.error(dotenvResult.error);
        process.exit(1);
    }
}

import { apiRouter } from './routes/api';

const app = express();

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
