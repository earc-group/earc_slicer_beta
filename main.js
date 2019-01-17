// Modules to control application life and create native browser window
const electron = require("electron");
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const Menu = electron.Menu
const MenuItem = electron.MenuItem

const join = require('path').join
const ipcMain = require('electron')

const ipc = require('electron').ipcMain
const { webContents } = require('electron')


const iconUrl = url.format({
  pathname: path.join(__dirname, 'assets/icons/earc_slicer_icon/icon.icns'),
  protocol: 'file:',
  slashes: true
})

// Replace '..' with 'about-window'
const openAboutWindow = require('about-window').default

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      width: 1300,
      height: 667,
      minWidth: 1060,
      minHeight: 629,
      //vibrancy: 'light-medium',
      icon: path.join(__dirname, 'assets/icons/earc_slicer_icon/icon.icns'),
      //icon: path.join('img/icons/png/64x64.png'),
      //icon: path.join(__dirname, 'assets/icons/png/64x64.png')
      //icon: path.join(__dirname, 'assets/icons/earc_slicer_icon/icon.icns')
     // icon: __dirname +  'assets/icons/earc_slicer_icon/icon.icns'
      //icon: path.join('assets/icons/png/64x64.png')
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let window

app.on('ready', function() {

    /*
window = new BrowserWindow()
    window.loadURL(`file://${__dirname}/bg_blur.html`)
*/

    createWindow();

    /*
setTimeout(function(){
        create_anlWindow()
    }, 4000)*/

    const { app, Menu } = require('electron')

    const template = [
      /*
 {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'delete' },
          { role: 'selectall' }
        ]
      }, */

    {
        label: 'File',
        submenu: [
          {
            label: "import model",
            accelerator: "CmdOrCtrl+o",
            click: function (menuItem, currentWindow) {
                currentWindow.webContents.send('import_model_fc')
            }
          },
          {
            label: "slice model",
            accelerator: "CmdOrCtrl+e",
            click: function (menuItem, currentWindow) {
                currentWindow.webContents.send('slice_fc_menu')
            }
          },
          {
            label: "save preset",
            accelerator: "CmdOrCtrl+s",
            click: function (menuItem, currentWindow) {
                currentWindow.webContents.send('save_pres_fc_menu')
            }
          },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: "undo"},
            { role: "redo"},
            { type: "separator" },
            { role: "cut",},
            { role: "copy"},
            { role: "paste"},
            { role: "selectall"},
            { role: "reload" }
        ]
    },
    {
        label: 'View',  // someting is weird here
        submenu: [
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        role: 'window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' },
          { role: "reload"},
          { type: "separator" },
          { role: "toggledevtools"},
          { role: "togglefullscreen"}
        ]
      },
      {
        role: 'help',

        submenu: [
          {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('https://earc.cz') }
          }

        ]
      }
    ]

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          {
              label: 'About earc slicer',
              click: () =>
                  openAboutWindow({
                      icon_path: join(__dirname, 'assets/icons/png/512x512.png'),
                      copyright: 'Copyright (c) 2018 (beta)',
                      package_json_dir: __dirname,
                      //open_devtools: process.env.NODE_ENV !== 'production',
                  }),
          },
          { type: 'separator' },
          {
              label: "preferences",
              accelerator: "Cmd+,",
              click: function (menuItem, currentWindow) {
                  currentWindow.webContents.send('preferences_fc_menu')
              }
          },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      })

      // Edit menu
      template[1].submenu.push(
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      )

      // Window menu
      template[3].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


ipc.on('pres_name_send', function (event, arg) {
    mainWindow.webContents.send('pres_name_send_render', arg)
})

ipc.on('print_time_send', function (event, arg) {
    mainWindow.webContents.send('print_time_send_render', arg)
})

ipc.on('open_window_analyzer', function (event, arg) {
    if(arg == "open"){
        create_anlWindow()
    }
})

/*
ipc.on('load_manual_settings', function (event, arg) {
    mainWindow.webContents.send('load_manual_settings', arg)
})*/



function create_anlWindow() {
  // Create the browser window.
  anlWindow = new BrowserWindow({
      width: 300,
      height: 300,
      show: false,
  })

  // and load the index.html of the app.
  anlWindow.loadFile('gcode_analyzer/index.html')

  // Open the DevTools.
  //anlWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  anlWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    anlWindow = null
  })
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
