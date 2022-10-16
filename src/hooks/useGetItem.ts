import axios from 'axios';
import { useState, useEffect } from 'react';

const api_key = import.meta.env.VITE_API_KEY;

const useGetItem = ({ path, id }: any) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios
            .get(`https://api.themoviedb.org/3/${path}/${id}?api_key=${api_key}`)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [path, id]);

    return { response, error, loading };
};

export default useGetItem;
