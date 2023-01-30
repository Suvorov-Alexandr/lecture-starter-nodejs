import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { email, phoneNumber } = req.body;

  try {
    const userEmail = userService.search({ email });
    const userPhoneNumber = userService.search({ phoneNumber });
    if (userEmail || userPhoneNumber) {
      throw new Error(`This user with an email or phone number already exist.`);
    }

    if (Object.keys(req.body).length !== Object.keys(USER).length - 1) {
      throw new Error("Invalid number of fields.");
    }
    const requestedKeys = Object.keys(req.body);
    const initialKeys = Object.keys(USER);

    for (let i = 0; i < requestedKeys.length; i++) {
      if (!initialKeys.includes(requestedKeys[i])) {
        throw new Error(`Invalid field ${requestedKeys[i]}.`);
      }
      if (!req.body[requestedKeys[i]]) {
        throw new Error(`Empty field ${requestedKeys[i]}.`);
      }
    }

    checkBodyRequest(req.body, USER);
    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { id } = req.params;

  try {
    const user = userService.search({ id });
    if (id !== user?.id) {
      throw new Error(`User with id ${id} does not exist.`);
    }

    if (!Object.keys(req.body).length) {
      throw new Error("No fields to update.");
    }

    const requestedKeys = Object.keys(req.body);
    const initialKeys = Object.keys(USER);

    for (let i = 0; i < requestedKeys.length; i++) {
      if (!initialKeys.includes(requestedKeys[i])) {
        throw new Error(`Invalid field ${requestedKeys[i]}.`);
      }
      if (!req.body[requestedKeys[i]]) {
        throw new Error(`Empty field ${requestedKeys[i]}.`);
      }
    }

    checkBodyRequest(req.body, USER);
    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};

const checkBodyRequest = (body, model) => {
  console.log("model", model);
  if (body.email) {
    checkEmail(body.email);
  }
  if (body.phoneNumber) {
    checkPhoneNumber(body.phoneNumber);
  }
  if (body.firstName) {
    checkName(body.firstName);
  }
  if (body.lastName) {
    checkName(body.lastName);
  }
  if (body.password) {
    checkPassword(body.password);
  }
};

const checkEmail = (email) => {
  if (
    !email ||
    !email.match(/^[a-z0-9](\.?[a-z0-9]){1,}@g(oogle)?mail\.com$/i)
  ) {
    throw new Error(
      "Invalid email, only @gmail.com domain and at least 2 characters before it are allowed."
    );
  }
};

const checkPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || !phoneNumber.match(/\+380\d{9}/g)) {
    throw new Error(
      "Invalid phone number, enter the number in this format +380xxxxxxxxx."
    );
  }
};

const checkName = (name) => {
  if (!name || !name.match(/^[a-zA-Z]+$/)) {
    throw new Error("Invalid first or last name.");
  }
};

const checkPassword = (password) => {
  if (password.length < 3) {
    throw new Error("There must be at least 3 characters in the password.");
  }
};

export { createUserValid, updateUserValid };
