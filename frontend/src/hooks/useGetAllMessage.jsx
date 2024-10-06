import { setMessages } from '@/features/chatSlice';
import { setUserDetail, setSuggestedUser } from '../features/userSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state?.user?.userDetail);
    const selectedUser = useSelector((state) => state?.user?.selectedUser);

    
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                if (userDetails?._id) {
                    // Fetch user data excluding the current logged-in user
                    const response = await axios.get(`/api/message/getMessage/${selectedUser?._id}`, { withCredentials: true });
                    console.log(response.data)
                    console.log('Fetched suggestions:', response.data);
                    if (response.data.success) {
                        dispatch(setMessages(response?.data?.messages))
                    }
                    dispatch(setMessages(response?.data?.messages));
                }
            } catch (error) {
                console.error('Error fetching user suggestions:', error);
            }
        };

        fetchSuggestions();
    }, [userDetails, selectedUser, dispatch]);

    // Return suggested users from the Redux store
    const suggestedUser = useSelector((state) => state?.user?.suggestedUser);
    return suggestedUser;

}

export default useGetAllMessage