import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import bookRoutes from './src/routes/bookRoutes.js';
const app = express();
app.use(express.json());
app.use(bookRoutes);
app.use(userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));