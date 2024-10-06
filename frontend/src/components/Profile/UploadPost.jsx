// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'

// const UploadPost = () => {

//     const [caption, setCaption] = useState();
//     const [file, setFile] = useState();

//     // multer code for uploading image and caption //
//     const preventDefault = (e) => {
//         e.preventDefault();
//     }
//     const upload = () => {
//         const formData = new FormData()
//         formData.append('file', file)
//         formData.append('caption', caption);
//         axios.post('/api/posts/post/upload', formData)
//             .then(res => console.log(res.data))
//             .catch(er => console.log(er.message))
//     }
//     // ------------------------------------------- //

//     return (
//         <section aria-labelledby="create-post-title" className="max-w-md mx-auto p-4 text-black bg-white rounded-lg shadow-lg">
//             <h1 id="create-post-title" className="text-2xl font-bold mb-4">Create a New Post</h1>
//             <form onSubmit={preventDefault}>
//                 <div className='mb-4'>
//                     <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
//                         Caption
//                     </label>
//                     <textarea
//                             id="caption"
//                             name="caption"
//                             value={caption}
//                             onChange={(e)=>setCaption(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 resize-none text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
//                             placeholder="Write something about yourself (up to 500 words)"
//                             aria-label="Caption"
//                             rows="3"
//                             maxLength="500"
//                         />
//                 </div>

//                 <div className='mb-4'>
//                     <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
//                         Image
//                     </label>
//                     <input
//                         id="image"
//                         type="file"
//                         className="mb-4 w-full p-3 border rounded-lg"
//                         accept="image/*"
//                         onChange={(e) => setFile(e.target.files[0])}
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     onClick={upload}
//                 >
//                     Create Post
//                 </button>
//             </form>
//         </section>
//     )
// }

// export default UploadPost


// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadPost = () => {
//     const [caption, setCaption] = useState('');
//     const [file, setFile] = useState(null); // Single state to handle both image and video

//     // Prevent default form submission
//     const preventDefault = (e) => {
//         e.preventDefault();
//     }

//     // Upload function to handle file upload
//     const upload = () => {
//         const formData = new FormData();
//         if (file) formData.append('file', file); // Appending the selected file
//         formData.append('caption', caption); // Appending the caption

//         axios.post('/api/posts/post/upload', formData)
//             .then(res => console.log(res.data))
//             .catch(err => console.log(err.message));
//     }

//     return (
//         <section aria-labelledby="create-post-title" className="max-w-md mx-auto p-4 text-black bg-white rounded-lg shadow-lg">
//             <h1 id="create-post-title" className="text-2xl font-bold mb-4">Create a New Post</h1>
//             <form onSubmit={preventDefault}>
//                 <div className='mb-4'>
//                     <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
//                         Caption
//                     </label>
//                     <textarea
//                         id="caption"
//                         name="caption"
//                         value={caption}
//                         onChange={(e) => setCaption(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 resize-none text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
//                         placeholder="Write something about your post (up to 500 characters)"
//                         aria-label="Caption"
//                         rows="3"
//                         maxLength="500"
//                     />
//                 </div>

//                 <div className='mb-4'>
//                     <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
//                         Image or Video
//                     </label>
//                     <input
//                         id="file"
//                         type="file"
//                         className="mb-4 w-full p-3 border rounded-lg"
//                         accept="image/*, video/*" // Accept both image and video files
//                         onChange={(e) => setFile(e.target.files[0])} // Update the file state with the selected file
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     onClick={upload}
//                 >
//                     Create Post
//                 </button>
//             </form>
//         </section>
//     );
// }

// export default UploadPost;


import React, { useState } from 'react';
import axios from 'axios';

const UploadPost = () => {
    const [caption, setCaption] = useState('');
    const [files, setFiles] = useState({ image: null, video: null });

    const preventDefault = (e) => {
        e.preventDefault();
    };

    const upload = async () => {
        const formData = new FormData();
        if (files.image) formData.append('image', files.image);
        if (files.video) formData.append('video', files.video);
        formData.append('caption', caption);

        try {
            const res = await axios.post('/api/posts/post/upload', formData);
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <section aria-labelledby="create-post-title" className="max-w-md mx-auto p-4 text-black bg-white rounded-lg shadow-lg">
            <h1 id="create-post-title" className="text-2xl font-bold mb-4">Create a New Post</h1>
            <form onSubmit={preventDefault}>
                <div className='mb-4'>
                    <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
                        Caption
                    </label>
                    <textarea
                        id="caption"
                        name="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 resize-none text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Write something about your post (up to 500 characters)"
                        aria-label="Caption"
                        rows="3"
                        maxLength="500"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        className="mb-4 w-full p-3 border rounded-lg"
                        accept="image/*"
                        onChange={(e) => setFiles({ ...files, image: e.target.files[0] })}
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-2">
                        Video
                    </label>
                    <input
                        id="video"
                        type="file"
                        className="mb-4 w-full p-3 border rounded-lg"
                        accept="video/*"
                        onChange={(e) => setFiles({ ...files, video: e.target.files[0] })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={upload}
                >
                    Create Post
                </button>
            </form>
        </section>
    );
}

export default UploadPost;
