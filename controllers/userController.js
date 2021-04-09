const db = require('../models/index')

exports.getMe = async (req, res) => {
    try {
        const userdata = await db.User.findOne({ where: { id: req.user.id } })
        console.log(userdata)
        return res.status(200).json({
            userdata: userdata
        })

    } catch (err) {
        return res.status(500).json({
            status: "Internal Server Error",
            err: err
        })
    }
}