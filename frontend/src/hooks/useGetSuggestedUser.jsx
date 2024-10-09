import { setUserDetail, setSuggestedUser } from '../features/userSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

const  useGetSuggestedUser = () => {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state?.user?.userDetail);
    // console.log(userDetails._id);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                if (userDetails?._id) {
                    // Fetch user data excluding the current logged-in user
                    const response = await axios.get(`/api/user/profiles/${userDetails._id}`, { withCredentials: true });
                    // console.log('Fetched suggestions:', response.data);
                    dispatch(setSuggestedUser(response.data.users));
                }
            } catch (error) {
                console.error('Error fetching user suggestions:', error);
            }
        };

        fetchSuggestions();
    }, [userDetails, dispatch]);

    // Return suggested users from the Redux store
    const suggestedUser = useSelector((state) => state?.user?.suggestedUser);
    return suggestedUser;

}

export default useGetSuggestedUser