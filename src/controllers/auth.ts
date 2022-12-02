import { StatusCodes } from 'http-status-codes';

import authServices, { Credentials, RefreshData, RegistrationData } from '~/services/auth';

import { Controller } from './common';


const registrationController: Controller<RegistrationData> = async (req, res, next) => {
    try {
        const tokens = await authServices.registration({
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

const loginController: Controller<Credentials> = async (req, res, next) => {
    try {
        const tokens = await authServices.login({
            login: req.body.login,
            password: req.body.password,
        });
        res.status(StatusCodes.OK).send(tokens);
    }
    catch(e) {
        next(e);
    }
};

const refreshController: Controller<RefreshData> = async (req, res, next) => {
    try {
        const tokens = await authServices.refresh({
            refreshToken: req.body.refreshToken
        });
        res.status(StatusCodes.OK).send(tokens);
    }
    catch(e) {
        next(e);
    }
};

const authControllers = {
    login: loginController,
    registration: registrationController,
    refresh: refreshController,
};

export default authControllers;
