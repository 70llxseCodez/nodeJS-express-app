import { body } from "express-validator";

export const registerValidation = [
    body("email", "email is wrong 🫤").isEmail(),
    body("password", "password should't be length min 5 simbos").isLength({
        min: 6
    }),
    body("fullName", "enter your name").isLength({ min: 3 }),
    // body("avatarUrl", "not found").optional.isURL()
]