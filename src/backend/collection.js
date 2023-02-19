const ftp = require("basic-ftp")
const fs = require('fs')

function formatFileSize(size) {
    const postfixes = ['B', 'KB', 'MB', 'GB']
    let i = 0
    while (size >= 1024 && i < postfixes.length - 1) {
        size /= 1024
        i++
    }
    return size.toFixed(1) + ' ' + postfixes[i]
}

async function scanFtpDirectory(directory, outputFile) {
    const client = new ftp.Client()
    await client.access({
        host: "89.179.119.189",
        user: "admin",
        password: "superroot1"
    })
    let files = await (await client.list(directory, false)).sort()
    client.close()

    let result = {}
    const promises = []
    for (const file of files) {
        const filePath = `${directory}/${file.name}`
        if (file.isDirectory) {
            promises.push(scanFtpDirectory(filePath).then(subresult => {
                result[file.name] = subresult
            }))
        } else if (file.name.toLowerCase().endsWith('.svg')) {
            continue
        } else {
            result[file.name] = formatFileSize(file.size)
        }
    }

    await Promise.all(promises)

    const sortedResult = {}
    for (let key of Object.keys(result).sort()) {
        sortedResult[key] = result[key];
    }

    result = sortedResult

    if (outputFile !== undefined) {
        fs.writeFileSync(outputFile, JSON.stringify(result))
    }

    return result
}




const directory = "/3c3f5e3a-30e2-d801-3036-5e3a30e2d801/debian/root/assets/collection"
scanFtpDirectory(directory, '../databases/pages/collection.json')
