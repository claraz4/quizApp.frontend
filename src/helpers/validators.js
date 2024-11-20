// Validate the form
function validateForm(form, setError, setAreEmptyFieldsValue) {
    // to ensure all functions are called
    let isValid = !areEmptyFields(form, setError, setAreEmptyFieldsValue);

    if (isValid) {
        let error = {};
        // isValid = isValidEmail(form.email, error);
        isValid = isValidPassword(form.password, form.confirm_password, error, true) && isValid;
        isValid = isValidUsername(form.username, error) && isValid;
        isValid = isValidNumber(form.phone_number, error) && isValid;
        
        setError(error);
    }

    return isValid;
}

// Find the empty fields
const emptyFieldsMessage = "All fields must be filled.";

function areEmptyFields(form, setError, setAreEmptyFieldsValue) {
    const emptyFields = {};

    for (const key of Object.keys(form)) {
        if (form[key] === "") {
            emptyFields[key] = emptyFieldsMessage;
        }
    }

    setError(Object.keys(emptyFields).length > 0 ? emptyFields : null);
    setAreEmptyFieldsValue(Object.keys(emptyFields).length > 0);

    return Object.keys(emptyFields).length > 0;
}

// Validate the LAU email
function isValidEmail(email, error) {
    const serverIdx = email.indexOf("@");
    
    if (serverIdx < 1) error["email"] = "Please enter a valid email."

    return serverIdx >= 1
}

// Validate the password
function isValidPassword(password, confirmedPass, error, confirm) {
    let upperCase = false, specialChar = false, lowerCase = false;
    const specialCharacters = [
        '~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=',
        '{', '}', '[', ']', ':', '|', '\\', ';', '"', "'", '<', ',', '>', '.', '?', '/'
    ];

    const length = password.length >= 8;
    const samePass = !confirm || password === confirmedPass;
    let isValid = length && samePass;

    if (isValid) {
        for (const letter of password) {
            if (upperCase && specialChar && lowerCase) break;

            if (!upperCase && 'A' <= letter && letter <= 'Z') upperCase = true;

            if (!lowerCase && 'a' <= letter && letter <= 'z') lowerCase = true;

            if (!specialChar && specialCharacters.includes(letter)) specialChar = true;
        }

        isValid = upperCase && specialChar && lowerCase; 
    }
   
    if (!length) {
        error["password"] = "The password should be at least 8 characters long.";
    } else if (confirm && !samePass) {
        const message = "The passwords entered don't match.";
        error["password"] = message;
        error["confirm_password"] = message;
    } else if (!upperCase || !specialChar || !lowerCase) {
        error["password"] = "The password should at least have one upper case letter, one lower case letter, and one special character.";
    }

    return isValid;
}

// Validate username
function isValidUsername(username, error) {
    if (username.includes(' ')) error["username"] = "The username cannot include a whitespace character.";

    return !username.includes(' ');
}

// Validate phone number
function isValidNumber(number, error) {
    if (number === "") return true;
    
    const areaCodes = ["01", "03", "04", "05", "06", "07", "08", "09", "81", "70", "71", "76", "78", "79"];
    const areaCode = number.substring(0, 2);
    const convertedNumber = Number(number);
    
    const valid = number.length === 8 && areaCodes.includes(areaCode) && convertedNumber + "" !== "NaN";

    if (!valid) {
        error["phone_number"] = "Invalid phone number.";
    }
    
    return valid;
}

export const validators = {
    isValidEmail,
    isValidNumber,
    isValidPassword,
    isValidUsername,
    validateForm,
    areEmptyFields
};

export default validators;