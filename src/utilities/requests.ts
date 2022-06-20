import { APP_API_PATH, APP_API_VERSION_PATH } from '../config';

export const get = async (path: string, setData: any, setRequestInfo: any, setIsLoaded: any) => {
    const res = await fetch(`${APP_API_PATH}${APP_API_VERSION_PATH}${path}`);
    const data = (await res.json()) || {
        code: null,
        message: 'The server could not be reached.',
        ok: false,
        result: null,
        time_taken: 0,
        title: 'Dester',
        description: 'Dester',
    };
    const info = {
        code: data.code,
        message: data.message,
        ok: data.ok,
        time_taken: data.time_taken,
        title: data.title,
        description: data.description,
    };
    setData(data.result);
    setRequestInfo(info);
    setIsLoaded(true);
};
