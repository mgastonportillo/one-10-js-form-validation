export const validate = (input) => {
	const inputType = input.dataset.type;

	if (VALIDATORS[inputType]) {
		VALIDATORS[inputType](input);
	}
};

const VALIDATORS = {
	birth: (input) => validateBirth(input),
};

// birth

const validateBirth = (input) => {
	const userDate = new Date(input.value);
	let message = "";
	if (!validAge(userDate)) {
		message = "You are underage. You cannot sign up.";
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
