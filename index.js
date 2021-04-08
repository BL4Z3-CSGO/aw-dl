const fetch = require("node-fetch")
const fs = require('fs')
const awName = String(Math.round(Math.random(Date.now()) * 1000000))
const {exec} = require('child_process')
let pastedFetch = ""
let notExist = false
let good = true

process.title = "Aimware Launcher"

function anyKey() {
    console.log('Press any key to exit...')
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.on('data', process.exit.bind(process, 0))
}

function firstTime() {
    console.log(`


|-----------------|
|First time set-up|
|-----------------|

Open up Chrome and go to https://aimware.net/vip/download.
Then open the Developer Tools by clicking F12 and click the "Network" tab
Afterwards, right-click the "client" entry in the list.
Hover over "Copy" and click "Copy all as Node.js fetch"
Go to pastedFetch.txt , paste it in and save it.
You can now restart this executable.

IMPORTANT: DO *NOT* PASTE ANYTHING OTHER THAN WHAT YOU FIND THERE.
THIS IS CODE THAT WILL BE RUN.
ANY OTHER CODE MIGHT GIVE PEOPLE ACCESS TO YOUR COMPUTER.

`)
    exec(`start notepad ./pastedFetch.txt`)
    anyKey()
}

const downloadFile = (async () => {
    try{
        console.log("Downloading...")
        const res = await eval(pastedFetch)
        const fileStream = fs.createWriteStream(`${process.cwd()}\\${awName}.exe`)
        await new Promise((resolve, reject) => {
            res.body.pipe(fileStream)
            res.body.on("error", reject)
            fileStream.on("finish", resolve)
        })
        console.log("Starting...")
        exec(`start ${process.cwd()}\\${awName}.exe`)
    } catch (err) {
        console.log(`An error has occurred.\nError message: ${err.message}`)
        anyKey()
    }
})

try {
    pastedFetch = fs.readFileSync('./pastedFetch.txt', 'utf8')
} catch (err) {
    fs.writeFile('./pastedFetch.txt', '', function (err) {
        if (err) {
            console.log("errName" + err.name)
            good = false
        }
    })
    if (good) {
        firstTime()
        notExist=true
    }
}

if (pastedFetch == "" && !notExist) {
    firstTime()
} else if (notExist) {
} else {
    console.log(`
        ████████╗ ██╗    ██╗       ███████╗  ██╗      
        ██╔═══██║ ██║    ██║       ██╔═══██╗ ██║      
        ████████║ ██║ █╗ ██║ ████╗ ██║   ██║ ██║      
        ██╔═══██║ ██║███╗██║ ╚═══╝ ██║   ██║ ██║      
        ██║   ██║ ████╔████║       ███████╔╝ ███████╗ 
        ╚═╝   ╚═╝ ╚═══╝╚═══╝       ╚══════╝  ╚══════╝ 

                    Aimware Launcher


      Downloads the aimware.net client and Launches it.




`)
    downloadFile()
}