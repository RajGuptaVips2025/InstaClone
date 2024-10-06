import { setUsersProfiles } from '../features/userSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetUsersProfiles = (userId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`/api/user/profiles/${userId}`);
                if (res.data.success) {
                    dispatch(setUsersProfiles(res.data.users)); // Make sure you dispatch the `users` array
                }
            } catch (error) {
                console.error('Error fetching user profiles:', error);
            }
        };

        fetchUserProfile();
    }, [userId, dispatch]);
};


export default useGetUsersProfiles
