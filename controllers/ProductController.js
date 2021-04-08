const multer = require('multer')
const Excel = require('exceljs')
const db = require('../models/index')
const port = 'http://localhost:5000'

// Storing the image in the folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true); // Accept the file;
    } else {
        cb(null, false); // Rejects the file
    }
};

// to store the image in the destination folder
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});



exports.createProduct = [uploads.single('Image'), async (req, res) => {
    try {
        const data = await db.Product.create({
            PName: req.body.PName,
            price: req.body.price,
            Image: port + "/uploads/" + req.file.filename,
            CategoryId: req.body.CategoryId
        })
        console.log("DATA", data)
        console.log(data)
        res.status(200).json({
            status: "Successfully Addded",
            data
        })
    }
    catch (err) {
        return res.status(400).json({
            message: "Something went Wrong"
        })
    }
}]



exports.getProduct = async (req, res) => {
    try {
        let page = parseInt(req.query.page) ? req.query.page : 0;
        let limit = parseInt(req.query.limit) ? req.query.limit : null;
        var condition = req.query.price ? req.query.price : null

        let offset = page ? page * limit : 0;

        console.log("offset = " + offset)

        const data = await db.Product.findAll({
            where: condition,
            limit: limit,
            offset: offset,

        })

        console.log("DATA", data)

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Product Excel')
        worksheet.columns = [
            {
                header: 'ID', key: 'id', width: 20
            },
            {
                header: 'Product Name', key: 'PName', width: 20
            },
            {
                header: 'Price', key: 'price', width: 20
            },
            {
                header: 'Image', key: 'Image', width: 40
            },
            {
                header: 'Category', key: 'CategoryId', width: 20
            }
        ]
        let count = 1;
        data.forEach(product => {
            worksheet.addRow(product)
            count += 1;
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }
        })
        const wexcel = await workbook.xlsx.writeFile(`${__dirname}/Product.xlsx`)
        console.log(data)
        res.status(200).json({
            status: "Can read the data from the excel fille",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went Wrong"
        })
    }
}


exports.getProductById = async (req, res) => {
    try {
        const data = await db.Product.findByPk(req.params.id);
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ data })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: err
        })
    }
}


exports.deleteProductById = async (req, res) => {
    try {
        const data = await db.Product.destroy({ where: { id: req.params.id } });
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: err
        })
    }
}


exports.UpdateProductById = [uploads.single('Image'), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (req.file) {
            var data = {
                Image: port + "/uploads/" + req.file.filename,
                ...req.body
            }
        }
        else {
            var data = req.body
        }
        console.log(data)
        await db.Product.update(data, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Product was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Product with id=" + id
                });
            });


    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            status: err
        })
    }
}
]


