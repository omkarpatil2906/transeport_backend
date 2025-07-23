const connection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authSchema } = require('../validations/auth.validation');

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

exports.loginCustomer = (req, res) => {
    const { error, value } = authSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: { message: error.details[0].message } });
    }

    const { userName, password } = value;
    if (!userName || !password) {
        return res.status(400).json({ error: { message: 'Username and password are required' } });
    }
    const query = 'SELECT * FROM customers WHERE full_name = ?';
    connection.query(query, [userName], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: { message: 'Internal server error' } });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: { message: 'Invalid username or password' } });
        }
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ result: { message: 'Invalid username or password' } });
        }
        const payload = {
            id: user.id,
            firstName: user.first_name,
            email: user.email,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({
            result: {
                message: 'Login successful',
                token,
            }
        });
    });
};

