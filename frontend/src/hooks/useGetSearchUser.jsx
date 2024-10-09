import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useGetSearchUser = (searchQuery) => {
    const userDetails = useSelector((state) => state?.user?.userDetail);
    const [results, setResults] = useState([]); // State to hold the search results
    const [loading, setLoading] = useState(false); // State to indicate loading status
    const [error, setError] = useState(null); // State to hold any error message

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (userDetails?._id) { // Check if user details are available
                setLoading(true); // Set loading state to true
                try {
                    if (searchQuery.trim()) {
                        const response = await axios.get(`/api/search/users?query=${encodeURIComponent(searchQuery)}`);
                        setResults(response.data); // Update results with fetched data
                        console.log(response);
                    } else {
                        setResults([]); // Clear results if searchQuery is empty
                    }
                } catch (error) {
                    setError('Error fetching search results'); // Set error message
                    console.error('Error fetching search results:', error);
                } finally {
                    setLoading(false); // Set loading state to false
                }
            }
        };

        fetchSuggestions();
    }, [userDetails, searchQuery]); // Dependencies include userDetails and searchQuery

    return { results, loading, error }; // Return the results, loading state, and error
};

export default useGetSearchUser;
