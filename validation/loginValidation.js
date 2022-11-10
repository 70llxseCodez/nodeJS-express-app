import { body } from "express-validator";

export const loginValidation = [
    body("email", "email is wrong 🫤").isEmail(),
    body("password", "password should't be length min 5 simbos").isLength({
        min: 6
    }),
]