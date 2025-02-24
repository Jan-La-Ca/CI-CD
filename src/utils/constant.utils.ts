export const REGEX_VALIDATE = {
    PHONE_NUMBER_REGEX: /^\d{10,11}$/,
    PASSWORD_REGEX: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};


export const MESSAGES = {
    GLOBAL: 'An unexpected error occurred. Please try again later or contact support if the issue persists.',
    TOKEN: {
        EMPTY: 'Token is missing',
    },
    USER:{
        NOT_FOUND: 'User is not found',
        USER_EXISTED: 'User is existed'
    }
}