
/**
 * Configuration file where you can store error codes for responses
 */
module.exports = {
    MESSAGE: {
        BAD_REQUEST: {
            code: 'E_BAD_REQUEST',
            message: 'The request cannot be fulfilled due to bad syntax',
            status: 400
        },
        CREATED: {
            code: 'CREATED',
            message: 'The request has been fulfilled and resulted in a new resource being created.',
            status: 201
        },
        CREATE_FAILED: {
            code: 'CREATE_FAILED',
            message: 'The request has not been fulfilled, Please try again',
            status: 500
        },
        IS_REQUIRED: {
            message: 'is required.',
            code: 'UNPROCESSABLE_ENTITY',
            status: 422
        },
        IS_DUPLICATE: {
            message: 'already exists.',
            code: 'UNPROCESSABLE_ENTITY',
            status: 422
        },
        FORBIDDEN: {
            code: 'E_FORBIDDEN',
            message: 'User not authorized to perform the operation',
            status: 403
        },
        NOT_FOUND: {
            code: 'E_NOT_FOUND',
            message: 'The requested resource could not be found but may be available again in the future',
            status: 404
        },
        RECORD_NOT_FOUND: {
            code: 'E_NOT_FOUND',
            message: 'Record not found',
            status: 404
        },
        OK: {
            code: 'OK',
            message: 'Operation is successfully executed.',
            status: 200
        },
        SERVER_ERROR: {
            code: 'E_INTERNAL_SERVER_ERROR',
            message: 'Something bad happened on the server.',
            status: 500
        },
        UNAUTHORIZED: {
            code: 'E_UNAUTHORIZED',
            message: 'Missing or invalid authentication token.',
            status: 401
        },
        USER_NOT_FOUND: {
            code: 'E_USER_NOT_FOUND',
            message: 'User with specified credentials is not found.',
            status: 401
        },
        EMAIL_PASS_NOT_MATCHED: {
            code: 'E_USER_NOT_FOUND',
            message: "Email address and password doesn't match.",
            status: 401
        },
        USER_REGISTERED: {
            code: 'OK',
            message: 'User registered successfully.',
            status: 200
        },
        EMAIL_REGISTERED: {
            code: 'E_DUPLICATE',
            message: 'Email address must not be a duplicate.',
            status: 200
        },
        NO_RECORD_FOUND: {
            code: 'E_NOT_FOUND',
            message: 'No record found.',
            status: 402
        },
        EMAIL_NOT_EXISTS: {
            code: 'E_NOT_FOUND',
            message: "Entered email does not exists.",
            status: 200
        }
    }
};
