import "dotenv/config";
import jwt from "jsonwebtoken";
import userServices from "../services/userServices.js";

export function authMiddleware(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader) return res.status(401).send({ message: "Token not provided" });

    const partsToken = tokenHeader.split(" ");
    if (partsToken.length !== 2) return res.status(401).send({ message: "Token error" });
    const [schema, token] = partsToken;
    if(!/^Bearer$/i.test(schema)) return res.status(401).send({ message: "Token malformatted" });


  jwt.verify(token, process.env.SECRET_JWT, async function (err, decoded) {
    if (err) return res.status(401).send({ error: "Token invalid" });
    const user = await userServices.findUserByIdService(decoded.id);
    if (!user || !user.id) return res.status(401).send({ error: "User not found" });

    req.userId = user.id;
    return next();
  });
}