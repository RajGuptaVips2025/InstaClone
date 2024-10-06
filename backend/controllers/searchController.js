const userModel = require('../models/user');

const searchUsers = async (req, res) => {
    try {
        const query = req.query.query;
        const results = await userModel.find({ username: { $regex: query, $options: 'i' } })
            .select(['username', 'fullName', 'profilePicture']);

        if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { searchUsers };