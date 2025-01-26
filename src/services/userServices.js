import usersRepository from "../repositories/usersRepository.js";
import bcrypt from "bcrypt";
import { generateJWT } from "./authService.js";

async function createUserService(newUser){
    const foundUser = await usersRepository.findUserByEmailRepository(newUser.email);
    if(foundUser) throw new Error("User already exists");

    const passHash = bcrypt.hashSync(newUser.password, 10);
    const user = await usersRepository.createUserRepository({...newUser, password: passHash});
    if(!user) throw new Error("Error creating user");
    const userByEmail = await usersRepository.findUserByEmailRepository(newUser.email);
    const token = generateJWT(userByEmail.id);
    return token;
}

async function findAllUsersService() {
    return await usersRepository.findAllUsersRepository();
}

async function findUserByIdService(id) {
    const user = await usersRepository.findUserByIdRepository(id)
    if (!user) throw new Error("User not found")
    return user
}

async function updateUserService(newUser, userId) {
    const user = await usersRepository.findUserByIdRepository(userId);
    if (!user) throw new Error("User not found");
    if (newUser.password) {
        newUser.password = await bcrypt.hashSync(newUser.password, 10);
    }
    const UserUpdated = await usersRepository.updateUserRepository(newUser, userId)
    return UserUpdated;
}
async function deleteUserService(userId) {
    const user = await usersRepository.findUserByIdRepository(userId);
    if (!user) throw new Error("User not found");
    const { message } = await usersRepository.deleteUserRepository(userId)
    return message;
}

export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService
}