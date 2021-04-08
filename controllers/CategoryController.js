const db = require('../models/index')

exports.createCategory = async (req, res, next) => {
    try {
        const data = await db.Category.create({
            CategoryName: req.body.CategoryName
        })
        console.log(data)
        return res.status(200).json({
            status: "Added Successfully",
            data
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err
        })
    }
}

exports.GetCategory = async (req, res, next) => {
    try {
        const data = await db.Category.findAll()
        console.log(data)
        if (data.length === 0) {
            return res.status(200).json({
                message: "Empty Data"
            })
        }
        return res.status(200).json({ data })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err
        })
    }
}

exports.GetCategoryById = async (req, res, next) => {
    try {
        const data = await db.Category.findByPk(req.params.id);
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ data })
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err
        })
    }
}

exports.RemoveCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id)
        db.Category.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Category was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Category with id=" + id
                });
            });
    }
    catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err
        })
    }
}

exports.UpdateCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = {
            CategoryName: req.body.CategoryName
        }
        db.Category.update(body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Category was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Category with id=" + id
                });
            });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            err: err
        })
    }
}