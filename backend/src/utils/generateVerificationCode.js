export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random()*900000).toString();
}

//  generating a psuedo random 6 digit verification code