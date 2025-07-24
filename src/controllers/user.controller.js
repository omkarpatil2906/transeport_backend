const connection = require('../config/db')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { userSchema } = require('../validations/user.validations');

exports.createUser = (req, res) => {
    const { error, value } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: { message: error.details[0].message } });
    }

    const { fullName, userName, mobileNumber, email, address, password, isAgree } = value

    bcrypt.hash(password, saltRounds, (err, hashedPass) => {

        if (err) {
            return res.status(500).json({ error: { message: 'Error Processing Password' } });
        }

        const userQuery = `insert into users (full_name, user_name, mobile_number, email, address, password, isAgree) values(?,?,?,?,?,?,?)`

        connection.query(userQuery, [fullName, userName, mobileNumber, email, address, hashedPass, isAgree], (err) => {
            console.log(err);
            if (err) {
                return res.status(500).json({ error: { message: 'Database error' } });
            }
            res.status(201).json({
                result: {
                    message: 'Data saved successfully'
                }
            });
        })
    })
}



exports.getAllUserList = (req, res) => {
    const query = `SELECT u.full_name as Name , u.user_name as 'User Name' ,u.mobile_number as 'Mobile Number' ,u.email as 'Email', u.address as Address ,u.password ,u.isAgree  FROM users as u order by 1 DESC;`

    connection.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: { message: 'Database error' } });
        }
        res.status(200).json({ result: Object.values(result) })
    })
}

// exports.deleteUserById=(req,res)=>{
//     const
// }