import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CallbackPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const state = searchParams.get('state');

    useEffect(() => {
        if (state) {
            const stateConfig = JSON.parse(state);
            navigate({
                pathname: stateConfig.setup ? '/setup' : '/settings/providers',
                search: window.location.search,
            });
        } else {
            navigate('/');
        }
    }, [state]);
    return <div></div>;
};

export default CallbackPage;
