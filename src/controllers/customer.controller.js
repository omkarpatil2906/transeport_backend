
const connection = require('../config/db')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const { customerSchema } = require('../validations/customer.validation');

exports.createCustomer = (req, res) => {
    const { error, value } = customerSchema.validate(req.body);




    if (error) {
        return res.status(400).json({ error: { message: error.details[0].message } });
    }

    const { fullName, userName, email, contactNumber, password, addresses } = value;

    bcrypt.hash(password, saltRounds, (err, hashedPass) => {
        if (err) {
            return res.status(500).json({ error: { message: 'Error Processing Password' } });
        }
        const customerQuery = `insert into customers(full_name, user_name,email,contact_number,password) values(?,?,?,?,?)`;
        console.log('Customer Query:', customerQuery);

        connection.query(customerQuery, [fullName, userName, email, contactNumber, hashedPass], (err, result) => {
            if (err) {
                return res.status(500).json({ error: { message: 'Database error' } });
            }
            const customerId = result.insertId;
            const addressValues = addresses.map(addr => [
                customerId,
                addr.street,
                addr.city,
                addr.state,
                addr.pinocde,
                addr.type
            ]);
            const addressQuery = `insert into customer_address(customer_id, street,city,state,pincode,type) values ?`
            connection.query(addressQuery, [addressValues], (err2) => {
                if (err2) {
                    return res.status(500).json({ error: { message: 'Error inserting addresses' } });
                }
                res.status(201).json({
                    result: {
                        message: 'Data saved successfully'
                    }
                });
            })
        })
    })
}