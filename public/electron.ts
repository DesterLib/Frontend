const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const url = require('url');
const process = require('process');

/**
 * The MIME type associated with mpv.js plugin.
 */
const PLUGIN_MIME_TYPE = 'application/x-mpvjs';

function containsNonASCII(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            return true;
        }
    }
    return false;
}

/**
 * Return value to be passed to `register-pepper-plugins` switch.
 *
 * @param {string} pluginDir - Plugin directory
 * @param {string} [pluginName=mpvjs.node] - Plugin name
 * @throws {Error} Resulting path contains non-ASCII characters.
 */
function getPluginEntry(pluginDir, pluginName = 'mpvjs.node') {
    const fullPluginPath = path.join(pluginDir, pluginName);
    // Try relative path to workaround ASCII-only path restriction.
    let pluginPath = path.relative(process.cwd(), fullPluginPath);
    if (path.dirname(pluginPath) === '.') {
        // "./plugin" is required only on Linux.
        if (process.platform === 'linux') {
            pluginPath = `.${path.sep}${pluginPath}`;
        }
    } else {
        // Relative plugin paths doesn't work reliably on Windows, see
        // <https://github.com/Kagami/mpv.js/issues/9>.
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

let os;
switch (process.platform) {
    case 'darwin':
        os = 'mac';
        break;
    case 'win32':
        os = 'win';
        break;
}

const pdir = path.join(__dirname, '..', 'node_modules', '@desterlib', 'dplayer', 'dist');

if (process.platform !== 'linux') {
    process.chdir(pdir);
}

app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('register-pepper-plugins', getPluginEntry(pdir));

// Create the native browser window.
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, '..', 'electron', 'preload.ts'),
            enableRemoteModule: true,
            plugins: true,
        },
    });

    const appURL = app.isPackaged
        ? url.format({
              pathname: path.join(__dirname, 'index.html'),
              protocol: 'file:',
              slashes: true,
          })
        : 'http://localhost:35510';
    mainWindow.loadURL(appURL);

    if (!app.isPackaged) {
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

const allowedNavigationDestinations = 'https://auth0.com';
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl);

        if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
            event.preventDefault();
        }
    });
});
