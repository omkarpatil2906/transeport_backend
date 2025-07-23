const express = require('express');
const db = require('./config/db');
const app = express();
const cors = require("cors");
const customerRoutes = require('./routes/customer.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const productRoutes= require('./routes/product.routes')


app.use(express.json());
app.use(express.json());
app.use(cors());

app.use('/api/transport', customerRoutes);
app.use('/api/transport', authRoutes);
app.use('/api/transport', userRoutes);
app.use('/api/transport', productRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port', PORT));
