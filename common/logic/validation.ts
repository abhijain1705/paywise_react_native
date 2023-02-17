export const validateEmail = (email: string) => {
    // Email validation using regex
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
    // password validation using regex
    const lowercaseRegex = /^(?=.*[a-z])/;
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const numberRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[@$!%*?&])/;
    const lengthRegex = /^[A-Za-z\d@$!%*?&]{8,}/;

    let error = '';

    if (!lowercaseRegex.test(password)) {
        error = 'Password must contain at least one lowercase letter';
    } else if (!uppercaseRegex.test(password)) {
        error = 'Password must contain at least one uppercase letter';
    } else if (!numberRegex.test(password)) {
        error = 'Password must contain at least one number';
    } else if (!specialCharRegex.test(password)) {
        error = 'Password must contain at least one special character';
    } else if (!lengthRegex.test(password)) {
        error = 'Password must be at least 8 characters long';
    }

    return error;
};