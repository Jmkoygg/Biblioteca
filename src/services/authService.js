import jwt from "jsonwebtoken";
import "dotenv/config";
import usersRepository from "../repositories/usersRepository.js";
import bcrypt from "bcrypt";

function generateJWT(id) {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 86400 });
}
async function loginService(email, password) {
  const user = await usersRepository.findUserByEmailRepository(email);
  if (!user) throw new Error("Invalid User");
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throw new Error("Invalid User");
  return generateJWT(user.id);
}

export { generateJWT, loginService };