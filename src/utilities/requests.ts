import { APP_API_PATH, APP_API_VERSION_PATH, APP_DESCRIPTION, APP_NAME } from '../config';

export const get = async (path: string, setData: any, setRequestInfo: any, setIsLoaded: any) => {
    const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}${path}`);
    const data = (await res.json()) || {
        code: null,
        message: 'The server could not be reached.',
        ok: false,
        result: null,
        time_taken: 0,
        title: APP_NAME,
        description: APP_DESCRIPTION,
    };
    const info = {
        code: data.code,
        message: data.message,
        ok: data.ok,
        time_taken: data.time_taken,
        title: data.title,
        description: data.description,
    };
    if (info.title !== localStorage.getItem('APP_NAME')) {
        localStorage.setItem('APP_NAME', info.title);
    }
    if (info.description !== localStorage.getItem('APP_DESCRIPTION')) {
        localStorage.setItem('APP_DESCRIPTION', info.description);
    }
    setData(data.result);
    setRequestInfo(info);
    setIsLoaded(true);
};
