import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pdfRoutes from './routes/pdf';

const app: Application = express();
const port: number = 2000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/pdf', pdfRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
