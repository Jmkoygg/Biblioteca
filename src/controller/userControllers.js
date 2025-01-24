import userServices from '../services/userServices.js';
import usersRepository from '../repositories/usersRepository.js';

async function createUserController(req, res){
    const newUser = req.body;
    try {
        const user = await userServices.createUserService(newUser);
        res.status(201).send(user);
    } catch (err) {
        return res.status(400).send({error: err.message});
    }
}
async function findAllUsersController(req, res){
    try {
        const users = await userServices.findAllUsersService();
        res.send(users);
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
}
async function findUserByIdController(req, res){
    const { id } = req.params;

    try{
        const user = await userServices.findUserByIdService(id);
        res.send(user);
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
}
async function updateUserControler(req, res){
    const { id } = req.params;
    const newUser = req.body;
    try {
        const updatedUser = await userServices.updateUserService(newUser, id);
        res.send(updatedUser);
    } catch (err) {
        console.error('Error in updateUserControler:', err);
        return res.status(404).send({error: err.message});
    }
}
async function deleteUserService(req, res) {
    const { id } = req.params;
    try{
        const message = await usersRepository.deleteUserRepository(id);
        res.send(message);
    } catch (err) {
        return res.status(404).send({error: err.message});
    }
}

export default {
    createUserController,
    findAllUsersController,
    findUserByIdController,
    updateUserControler,
    deleteUserService
}