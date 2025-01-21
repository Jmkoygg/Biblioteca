import userServices from '../services/userServices.js';

async function createUserController(req, res){
    const newUser = req.body;
    try {
        const user = await userServices.createUserService(newUser);
        res.status(201).send(user);
    } catch (err) {
        return res.status(400).send({error: err.message});
    }
}

export default {
    createUserController
}