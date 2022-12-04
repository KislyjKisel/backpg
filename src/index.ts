import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
{
    const dotenvResult = dotenv.config({ path: './.env' });
    if(dotenvResult.error) {
        console.error(dotenvResult.error);
        process.exit(1);
    }
}

import { IMAGES_DIR } from '~/constants/paths';
import coreRouteNames from '~/constants/routes/core';
import apiRouter from '~/routes/api';


const app = express();

app.use(coreRouteNames.IMAGES, express.static(path.join(process.cwd(), IMAGES_DIR)));
app.use(coreRouteNames.API, apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
