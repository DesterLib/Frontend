/* eslint-disable */

const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const url = require('url');

const PLUGIN_MIME_TYPE = 'application/x-mpv';

function containsNonASCII(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            return true;
        }
    }
    return false;
}

function getPluginEntry(pluginDir, pluginName = 'mpv.node') {
    const fullPluginPath = path.join(pluginDir, pluginName);
    let pluginPath = path.relative(process.cwd(), fullPluginPath);
    if (path.dirname(pluginPath) === '.') {
        if (process.platform === 'linux') {
            pluginPath = `.${path.sep}${pluginPath}`;
        }
    } else {
        if (process.platform === 'win32') {
            pluginPath = fullPluginPath;
        }
    }
    if (containsNonASCII(pluginPath)) {
        if (containsNonASCII(fullPluginPath)) {
            throw new Error('Non-ASCII plugin path is not supported');
        } else {
            pluginPath = fullPluginPath;
        }
    }
    return `${pluginPath};${PLUGIN_MIME_TYPE}`;
}

const pluginDir =
    process.env.NODE_ENV === 'development'
        ? path.join(path.dirname(require.resolve('@desterlib/mpv')), 'dist') // @ts-ignore
        : path.join(process.resourcesPath, 'libs');

if (process.platform !== 'linux') {
    process.chdir(pluginDir);
}

app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('register-pepper-plugins', getPluginEntry(pluginDir));

function createWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Dester Desktop',
        show: false,
        frame: true,
        backgroundColor: '#00151C',
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts'),
            enableRemoteModule: true,
            plugins: true,
        },
    });

    const appURL = app.isPackaged
        ? url.format({
              pathname: path.join(__dirname, '..', 'build', 'index.html'),
              protocol: 'file:',
              slashes: true,
          })
        : 'http://localhost:35510';
    mainWindow.loadURL(appURL);
    mainWindow.maximize();
    if (!app.isPackaged) {
        mainWindow.setIcon(path.join(__dirname, 'icons', '512x512.ico'));
        mainWindow.webContents.openDevTools();
    }
}

function setupLocalFilesNormalizerProxy() {
    protocol.registerHttpProtocol(
        'file',
        (request, callback) => {
            const url = request.url.substr(8);
            callback({ path: path.normalize(`${__dirname}/${url}`) });
        },
        (error) => {
            if (error) console.error('Failed to register protocol');
        },
    );
}

app.whenReady().then(() => {
    createWindow();
    setupLocalFilesNormalizerProxy();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

const allowedNavigationDestinations = 'https://dester.gq';
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);

        if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
            event.preventDefault();
        }
    });
});
