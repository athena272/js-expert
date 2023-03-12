const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isInvalid(content)

        return content
    }

    static async getFileContent(filePath) {
        const filename = join(__dirname, filePath)
        return (await readFile(filename)).toString("utf-8")
    }

    static isInvalid(csvString, options = DEFAULT_OPTIONS) {
        // const lines = csvString.split("\n")
        const [header, ...withoutHeaders] = csvString.split("\n")
        const isHeaderValid = header === options.fields.join(',')
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
    }
}

(async () => {
    const result = await File.csvToJson('../mocks/fourItems-invalid.csv')
    console.log("result: ", result)
})()