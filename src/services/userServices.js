import usersRepository from "../repositories/usersRepository.js";
import bcrypt from "bcrypt";

async function createUserService(newUser){
    const foundUser = await usersRepository.findUserByEmailRepository(newUser.email);
    if(foundUser) throw new Error("User already exists");

    const passHash = bcrypt.hashSync(newUser.password, 10);
    const user = await usersRepository.createUserRepository({...newUser, password: passHash});
    if(!user) throw new Error("Error creating user");
    return user;
}
export default {
    createUserService
}