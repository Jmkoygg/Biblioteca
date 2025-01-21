import express from 'express';
const app = express();
app.use(express.json());

const users = []
app.post("/users", (req, res) => {
    users.push(req.body)
res.status(201).send("Usuário criado com sucesso");
});
app.get("/users", (req, res) => {
    res.send({message: "Usuários encontrados com sucesso", users});
});

app.listen(3000, () => console.log("Server is running on port 3000"));