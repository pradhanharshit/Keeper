/* eslint-disable no-undef */
import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate } from "../utils/authUtils";
// const sign = require("jwt-encode");
import sign from "jwt-encode";

/**
 * All the routes related to Auth are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles user signups.
 * send POST Request at /api/auth/signup
 * body contains {firstName, lastName, email, password}
 * */

export const signupHandler = function (schema, request) {
  const { email, password, ...rest } = JSON.parse(request.requestBody);
  try {
    // check if email already exists
    const foundUser = schema.users.findBy({ email });
    if (foundUser) {
      return new Response(
        422,
        {},
        {
          errors: ["Unprocessable Entity. Email Already Exists."],
        }
      );
    }
    const _id = uuid();
    const newUser = {
      _id,
      email,
      password,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      ...rest,
      notes: [],
      archives: [],
      trash: [],
    };
    const createdUser = schema.users.create(newUser);
    // console.log("yha1");
    const encodedToken = sign({ _id, email }, process.env.REACT_APP_JWT_SECRET);
    // console.log("yha2");
    return new Response(201, {}, { createdUser, encodedToken });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {email, password}
 * */

export const loginHandler = function (schema, request) {
  const { email, password } = JSON.parse(request.requestBody);
  // console.log("email", email);
  // console.log("ran");
  try {
    const foundUser = schema.users.findBy({ email });
    console.log("fu", foundUser);
    if (!foundUser) {
      // console.log("not found");
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    if (password === foundUser.password) {
      // console.log("password matched");
      const secret = "secret";
      const encodedToken = sign({ _id: foundUser._id, email }, secret);
      // console.log("yha2");
      foundUser.password = undefined;
      // console.log("yha");
      return new Response(200, {}, { foundUser, encodedToken });
    }
    // else console.log("pw not matched");
    return new Response(
      401,
      {},
      {
        errors: [
          "The credentials you entered are invalid. Unauthorized access error.",
        ],
      }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
