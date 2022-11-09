export const validate = (input) => {
	const inputType = input.dataset.type;

	if (VALIDATORS[inputType]) {
		VALIDATORS[inputType](input);
	}

	if (input.validity.valid) {
		input.parentElement.classList.remove("input-container--invalid");
		input.parentElement.querySelector(".input-message-error").innerHTML = "";
	} else {
		input.parentElement.classList.add("input-container--invalid");
		input.parentElement.querySelector(".input-message-error").innerHTML =
			displayErrorMessage(inputType, input);
	}
};

const VALIDATORS = {
	birth: (input) => validateBirth(input),
};

const ERROR_TYPES = [
	"valueMissing",
	"typeMismatch",
	"patternMismatch",
	"customError",
];

const ERROR_MESSAGES = {
	name: {
		valueMissing: "Name cannot be empty",
	},
	email: {
		valueMissing: "Email cannot be empty",
		typeMismatch: "Make sure you are typing down the email address properly",
	},
	password: {
		valueMissing: "Password cannot be empty",
		patternMismatch:
			"6-12 characters. Must contain a lowercase letter, an uppercase letter, a number and cannot contain special characters",
	},
	birth: {
		valueMissing: "Date of birth cannot be empty",
		customError: "Must be at least 18 years old",
	},
	phoneNumber: {
		valueMissing: "Phone number cannot be empty",
		patternMismatch: "10 numbers expected",
	},
	address: {
		valueMissing: "Address cannot be empty",
		patternMismatch: "Address must contain 10-40 characters",
	},
	city: {
		valueMissing: "City cannot be empty",
		patternMismatch: "City must contain 10-40 characters",
	},
	province: {
		valueMissing: "Province cannot be empty",
		patternMismatch: "Province must contain 10-40 characters",
	},
};

// a

const displayErrorMessage = (inputType, input) => {
	let message = "";
	ERROR_TYPES.forEach((error) => {
		if (input.validity[error]) {
			message = ERROR_MESSAGES[inputType][error];
		}
	});
	return message;
};

// birth

const validateBirth = (input) => {
	const userDate = new Date(input.value);
	let message = "";
	if (!validAge(userDate)) {
		message = "Must be at least 18 years old";
	}
	input.setCustomValidity(message);
};

const validAge = (date) => {
	const currentDate = new Date();
	const diff = new Date(
		date.getUTCFullYear() + 18,
		date.getUTCMonth(),
		date.getUTCDate()
	);
	return diff <= currentDate;
};

// other
