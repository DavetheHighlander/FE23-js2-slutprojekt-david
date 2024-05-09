import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes';
import postRoutes from './src/routes/postRoutes';
import userRoutes from './src/routes/userRoutes';
import cors from 'cors';

const app = express();

app.use(
  express.json(),
  cors());
app.use(bodyParser.json({ limit: '1000mb' })); // Increase limit to 10mb for JSON requests
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
const PORT = 3000;

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
