const userModel = require('../models/user');

const searchUsers = async (req, res) => {
    try {
        const query = req.query.query;
        const loggedInUserId = req.user.userid; // Assuming you're storing user info in req.user

        // Search for users excluding the logged-in user
        const results = await userModel.find({
            username: { $regex: query, $options: 'i' },
            _id: { $ne: loggedInUserId } // Exclude the logged-in user's ID
        }).select(['username', 'fullName', 'profilePicture']);

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
