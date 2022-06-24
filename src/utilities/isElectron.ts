const isElectron = () => {
    if (
        typeof navigator === 'object' &&
        typeof navigator.userAgent === 'string' &&
        navigator.userAgent.indexOf('Electron') >= 0
    ) {
        return true;
    }
    if (
        typeof process !== 'undefined' &&
        typeof process.versions === 'object' &&
        !!process.versions.electron
    ) {
        return true;
    }
    return false;
};

export default isElectron;
