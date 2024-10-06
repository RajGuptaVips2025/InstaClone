const postModel = require('../models/post');
const userModel = require('../models/user');

const createPost = async (req, res) => {
    try {
        const { caption } = req.body;

        // Initialize variables to store image and video URLs
        let imageUrl = null;
        let videoUrl = null;
        let mediaType = null;

        // Check if files are present
        if (req.files) {
            if (req.files.image) {
                imageUrl = `/images/uploads/${req.files.image[0].filename}`;
                mediaType = 'image';
            }
            if (req.files.video) {
                videoUrl = `/images/uploads/${req.files.video[0].filename}`;
                mediaType = 'video';
            }
        }

        if (!mediaType) {
            return res.status(400).json({ message: 'No media file provided.' });
        }


        // Create the new post with the relevant details
        const newPost = await postModel.create({
            user: req.user.userid,
            image: imageUrl,
            video: videoUrl,
            mediaType: mediaType,
            caption: caption,
        });

        // Update the user's posts array
        const user = await userModel.findById(req.user.userid);
        user.posts.push(newPost._id);

        await user.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the post', error: error.message });
    }
};


// Fetch posts
const getPosts = async (req, res) => {
    try {
        // Fetch posts of the authenticated user
        const posts = await postModel.find();

        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching posts', error: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        // Fetch posts of the authenticated user
        // console.log(req.params.id)
        const posts = await postModel.find({ user: req.params.id });
        // console.log('line 48',posts)

        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching posts', error: error.message });
    }
};

// Like a post
const likePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user already liked the post
        const likeIndex = post.likes.indexOf(req.user.userid);
        if (likeIndex === -1) {
            // User has not liked the post, so add their ID to the likes array
            post.likes.push(req.user.userid);
        } else {
            // User has already liked the post, so remove their ID from the likes array
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        res.status(200).json({ message: 'Post like status updated', post });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while liking the post', error: error.message });
    }
};

module.exports = { createPost, getPosts, getPost, likePost };
