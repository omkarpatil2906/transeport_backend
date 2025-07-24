
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


exports.getAllCustomersWithAddresses = (req, res) => {
    const query = `
        SELECT 
            c.id, c.full_name, c.user_name, c.email, c.contact_number,
            a.id as address_id, a.street, a.city, a.state, a.pincode, a.type
        FROM customers c
        LEFT JOIN customer_address a ON c.id = a.customer_id
    `;

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: { message: 'Database error' } });
        }

        // Organize data
        const customers = {};
        results.forEach(row => {
            if (!customers[row.id]) {
                customers[row.id] = {
                    id: row.id,
                    full_name: row.full_name,
                    user_name: row.user_name,
                    email: row.email,
                    contact_number: row.contact_number,
                    addresses: []
                };
            }

            if (row.address_id) {
                customers[row.id].addresses.push({
                    id: row.address_id,
                    street: row.street,
                    city: row.city,
                    state: row.state,
                    pincode: row.pincode,
                    type: row.type
                });
            }
        });

        res.status(200).json(Object.values(customers));
    });
};

exports.deleteCustomerById = (req, res) => {
    const customerId = req.params.id;
    const deleteAddressesQuery = 'DELETE FROM customer_address WHERE customer_id = ?';
    connection.query(deleteAddressesQuery, [customerId], (err1) => {
        if (err1) {
            return res.status(500).json({ error: { message: 'Failed to delete addresses' } });
        }
        const deleteCustomerQuery = 'DELETE FROM customers WHERE id = ?';
        connection.query(deleteCustomerQuery, [customerId], (err2, result) => {
            if (err2) {
                return res.status(500).json({ error: { message: 'Failed to delete customer' } });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: { message: 'Customer not found' } });
            }
            res.status(200).json({
                result: {
                    message: 'Customer and associated addresses deleted successfully'
                }
            });
        });
    });
};


