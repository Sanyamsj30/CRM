import express from 'express';
import customerRoutes from './routes/customer.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import interactionRoutes from './routes/interaction.routes.js';

const app = express();

app.use(cors(
    {
        origin: '*',
        methods: ['GET','POST','PUT','DELETE'], 
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//customer routes
app.use('/api/customers', customerRoutes);

//auth routes
app.use('/api/auth', authRoutes);

//interaction routes
app.use('/api/interactions', interactionRoutes);


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the CRM backend!');
});

app.use(errorHandler);

export default app;
