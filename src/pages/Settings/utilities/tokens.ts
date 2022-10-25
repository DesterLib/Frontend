const objToFormEncoded = (object: object) => {
    return Object.entries(object)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

const GDriveToken = async (
    handleChangeAccessToken: any,
    handleChangeRefreshToken: any,
    client_id: string,
    client_secret: string,
    authCode: string,
) => {
    const body = {
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/callback`,
        code: authCode,
    };
    const requestTokens = async (body: any) => {
        console.log(`${client_id}:${client_secret}`);
        const response = await fetch('https://accounts.google.com/o/oauth2/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: objToFormEncoded(body),
        });
        if (!response.ok) {
            const responseText = await response.text();
            console.error(responseText);
        }
        try {
            const { access_token, refresh_token } = await response.json();
            handleChangeAccessToken({ target: { value: access_token } }, 'gdrive');
            handleChangeRefreshToken({ target: { value: refresh_token } }, 'gdrive');
        } catch (err) {
            const responseText = await response.text();
            console.error(responseText);
        }
    };
    await requestTokens(body);
};

const OneDriveToken = async (
    handleChangeAccessToken: any,
    handleChangeRefreshToken: any,
    client_id: string,
    authCode: string,
) => {
    const body = {
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/callback`,
        code: authCode,
        client_id: client_id,
        code_verifier:
            'E23_dcz27YmnY3Y9c~RZ.TYMXS_PKR2WtwLX-mE8-3TAD04.ONStig4._jha8FzTulLlau9fT_0qfhYpA2uCaqEo9MMsPd9NZ5Uler1fjNUoT2vwCbPkL--Dt5KJsAQE',
    };
    const requestTokens = async (body: any) => {
        const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: objToFormEncoded(body),
        });
        if (!response.ok) {
            const responseText = await response.text();
            console.error(responseText);
        }
        try {
            const { access_token, refresh_token } = await response.json();
            handleChangeAccessToken({ target: { value: access_token } }, 'onedrive');
            handleChangeRefreshToken({ target: { value: refresh_token } }, 'onedrive');
        } catch (err) {
            const responseText = await response.text();
            console.error(responseText);
        }
    };
    await requestTokens(body);
};

export { GDriveToken, OneDriveToken };
