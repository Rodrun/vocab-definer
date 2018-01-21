const {app, BrowserWindow} = require("electron")
const path  = require("path")
const url = require("url")

/// Global main window
let mainWindow = null
const WIDTH = 500
const HEIGHT = 500

/*
 * Create the main window with the initial page and default close operation.
 */
function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: WIDTH,
        height: HEIGHT,
        icon: path.join(__dirname, "resource/icon.ico")
    })
    mainWindow.on("close", () => {
        mainWindow = null;
    })
    // Load init page
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }))
}

// Execute electron
app.on("ready", createMainWindow)
app.on("window-all-closed", () => {
    // Quit right away if not mac
    if (process.platform !== 'darwin') {
      app.quit()
    }
})
app.on("activate", () => {
    // Re-create window if already destroyed (typically for mac)
    if (mainWindow === null) {
        createMainWindow();
    }
})
