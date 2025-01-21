import usersRepository from "../repositories/usersRepository.js";

async function createUserService(newUser){
    const user = await usersRepository.createUserRepository(newUser);
    return user;
}

export default {
    createUserService
}