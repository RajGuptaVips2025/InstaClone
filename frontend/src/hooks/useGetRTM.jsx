import { setMessages } from '@/features/chatSlice';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

const useGetRTM = () => {
    const dispatch = useDispatch();
    const socket = useSelector((state) => state?.socketio?.socket);
    const messages = useSelector((state) => state?.chat?.messages);

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        })

        return () => {
            socket?.off('newMessage');
        }

    }, [messages, setMessages]);
}

export default useGetRTM;