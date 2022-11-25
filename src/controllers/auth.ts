import { StatusCodes } from 'http-status-codes';

import { Controller } from './common';

import services, { Credentials, RefreshData, RegistrationData } from '@services/auth';

const registration: Controller<RegistrationData> = async (req, res, next) => {
    try {
        const tokens = await services.registration({
            login: req.body.login,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        res.status(StatusCodes.CREATED).send(tokens);
    }
    catch(e) {
        next(e);
    }
};

const login: Controller<Credentials> = async (req, res, next) => {
    try {
        const tokens = await services.login({
            login: req.body.login,
            password: req.body.password,
        });
        res.status(StatusCodes.OK).send(tokens);
    }
    catch(e) {
        next(e);
    }
};

const refresh: Controller<RefreshData> = async (req, res, next) => {
    try {
        const tokens = await services.refresh({
            refreshToken: req.body.refreshToken
        });
        res.status(StatusCodes.OK).send(tokens);
    }
    catch(e) {
        next(e);
    }
};

export default {
    login, registration, refresh
};
