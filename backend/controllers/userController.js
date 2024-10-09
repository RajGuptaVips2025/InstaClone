const userModel = require('../models/user');
const groupModel = require('../models/groupChat');
const path = require('path');

// Get user profile
const getProfile = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from the request parameters
        const user = await userModel.findById(id).select('-password'); // Find the user by ID and exclude the password field
        const userP = await userModel.findById(id).populate({
            path: 'following',
            select: 'username' // Specify the fields you want to include here
        })
            .select('username'); // Find the user by ID and exclude the password field
        // console.log("hkuhfuehfh   lehfehwf       ",userP)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the user profile', error: error.message });
    }
};

const getFollowing = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from the request parameters
        const user = await userModel.findById(id).populate({
            path: 'following',
            select: 'username name profileImage' // Specify the fields you want to include here
        })
            .select('username'); // Find the user by ID and exclude the password field

        const group = await groupModel.find({ participants: id })
        console.log(group)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user, group });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the user profile', error: error.message });
    }
};

const getProfiles = async (req, res) => {
    try {
        const users = await userModel.find();
        // Optionally, handle the case where no users are found
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error); // Improved error logging
        res.status(500).json({ message: 'An error occurred while fetching the users', error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const { id } = req.params; // Get the current user's ID from the request parameters
        const users = await userModel.find({ _id: { $ne: id } }); // Exclude the current user from the list

        if (!users.length) {
            return res.status(404).json({ message: 'No other users found' });
        }

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'An error occurred while fetching users', error: error.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, name, bio } = req.body;
        let updateData = { username, name, bio };

        // If using upload.fields with 'image', access file through req.files.image
        if (req.files && req.files.image) {
            updateData.profileImage = `public/images/uploads/${req.files.image[0].filename}`;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the profile', error: error.message });
    }
};

const followOrUnfollow = async (req, res) => {
    try {
        const loggedInUserId = req.user.userid; // The ID of the user making the request
        const userToFollowOrUnfollowId = req.params.id; // The ID of the user to follow/unfollow

        const currentUser = await userModel.findById(loggedInUserId); // Current user
        const targetUser = await userModel.findById(userToFollowOrUnfollowId); // User to follow/unfollow   


        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (targetUser.followers.includes(loggedInUserId)) {
            // Unfollow logic
            await targetUser.updateOne({ $pull: { followers: loggedInUserId } });
            await currentUser.updateOne({ $pull: { following: userToFollowOrUnfollowId } });
            res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            // Follow logic
            await targetUser.updateOne({ $push: { followers: loggedInUserId } });
            await currentUser.updateOne({ $push: { following: userToFollowOrUnfollowId } });
            res.status(200).json({ message: 'User followed successfully' });
        }
    } catch (error) {
        console.error('An error occurred while following/unfollowing the user!', error.message);
        res.status(500).json({ message: 'An error occurred while following/unfollowing', error: error.message });
    }
};

module.exports = { getProfile, updateProfile, getProfiles, getAllUsers, followOrUnfollow, getFollowing };