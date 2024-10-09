import { setChatMembers } from '@/features/chatSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const useGetChatMembers = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state?.user?.userDetail);

    useEffect(() => {
        const fetchChatMembers = async () => {
            try {
                if (userDetails?._id) {
                    // Fetching both groups and following users
                    const response = await axios.get(`/api/user/getFollowing/${userDetails._id}`, { withCredentials: true });
                    const group = response.data.group; // Group data
                    const following = response.data.user.following; // Following user data

                    // Combine both groups and following users into one array
                    const combined = [...following, ...group];
                    console.log("line 21", combined);

                    // Print all group names in the console
                    combined.forEach((item) => {
                        if (item.groupName) {
                            console.log(`Group Name: ${item.groupName}`);
                        }
                    });

                    // Continue with formatting and dispatching to Redux
                    const formattedCombined = combined.map((item) => {
                        if (item.groupName) {
                            return {
                                id: item._id,
                                name: item.groupName,  // Use groupName for group
                                type: 'group', // Tag as group
                                ...item // Spread other properties
                            };
                        } else if (item.username) {
                            return {
                                id: item._id,
                                name: item.username, // Use username for user
                                type: 'user', // Tag as user
                                ...item // Spread other properties
                            };
                        }
                        return item;
                    });

                    console.log("line 50", formattedCombined); // For debugging
                    // Dispatch the formatted array to Redux
                    dispatch(setChatMembers(formattedCombined));
                }
            } catch (error) {
                console.error('Error fetching chat members:', error);
            }
        };

        fetchChatMembers();
    }, [userDetails, dispatch]);
}

export default useGetChatMembers;
