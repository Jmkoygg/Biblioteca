import express from "express";
import { routers } from "./src/routes/index.js";
import "./src/services/cronService.js";

const app = express();
app.use(express.json());
app.use(routers);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
