export const humanSize = (bytes: number) => {
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    const r = 10;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(1) + ' ' + units[u];
};

export const humanTime = (minutes: number) => {
    const subHours = Math.floor(minutes / 60);
    const subMins = minutes % 60;
    let result = '';
    if (subHours > 0) {
        result += subHours.toString() + 'h';
    }
    if (subMins > 0) {
        if (result) {
            result += ' ' + subMins.toString() + 'm';
        } else {
            result += subMins.toString() + 'm';
        }
    }
    if (result) {
        return result;
    } else {
        return '0m';
    }
};
