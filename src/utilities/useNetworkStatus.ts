import { useEffect, useState } from 'react';

function getNetworkConnection() {
    return navigator['connection'] || null;
}
function getNetworkConnectionInfo() {
    const connection = getNetworkConnection();
    console.log(connection);
    if (!connection) {
        return {};
    }
    return {
        status: connection,
    };
}
function useNetworkStatus() {
    const [state, setState] = useState(() => {
        return {
            since: undefined,
            online: navigator.onLine,
            ...getNetworkConnectionInfo(),
        };
    });
    useEffect(() => {
        const handleOnline = () => {
            setState((prevState: any) => ({
                ...prevState,
                online: true,
                since: new Date().toString(),
            }));
        };
        const handleOffline = () => {
            setState((prevState: any) => ({
                ...prevState,
                online: false,
                since: new Date().toString(),
            }));
        };
        const handleConnectionChange = () => {
            setState((prevState) => ({
                ...prevState,
                ...getNetworkConnectionInfo(),
            }));
        };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        const connection = getNetworkConnection();
        connection?.addEventListener('change', handleConnectionChange);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            connection?.removeEventListener('change', handleConnectionChange);
        };
    }, []);
    return state;
}
export default useNetworkStatus;
