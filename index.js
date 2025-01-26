import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
const app = express();
app.use(express.json());
app.use(userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));