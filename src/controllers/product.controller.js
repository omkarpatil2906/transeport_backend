const connection = require('../config/db');
const { productSchema } = require('../validations/product.validation');


exports.createProduct = (req, res) => {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: { message: error.details[0].message } });
    }

    const { productName, productType, amount, description } = value

    const productQuery = `insert into product (product_name, product_type, amount, description) values(?,?,?,?)`

    connection.query(productQuery, [productName, productType, amount, description], (err) => {
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
}

