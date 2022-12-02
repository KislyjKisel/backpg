import { UserErrorMessages, UserErrorNames, UserErrorStatuses } from '~/constants/errors/user';

import { makeErrorClass } from './common';


const UserError = makeErrorClass(
    UserErrorNames,
    UserErrorMessages,
    UserErrorStatuses,
);

export default UserError;
