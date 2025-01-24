import { userSchema, userIdSchema } from "../schema/userSchema.js";

const validate = (shcema) => (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    } catch (e) {
        res.status(400).json({ error: e.message });

    }
}
const validateUserId = (req, res, next) => {
    try {
        const userId = +req.params.id;
        userIdSchema.parse({ userId: userId });
        next();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export{validate, validateUserId};