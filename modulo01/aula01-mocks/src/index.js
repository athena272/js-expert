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
        if (!validation.valid) {
            throw new Error(validation.error)
        }
        return content
    }

    static async getFileContent(filePath) {
        const filename = join(__dirname, filePath)
        return (await readFile(filename)).toString("utf-8")
    }

    static isInvalid(csvString, options = DEFAULT_OPTIONS) {
        // const lines = csvString.split("\n")
        const [header, ...withoutHeaders] = csvString.split("\n")
        const headerNormalized = header.replace("\r", "")

        const isHeaderValid = headerNormalized === options.fields.join(',')
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthValid = (
            withoutHeaders.length > 0 &&
            withoutHeaders.length <= options.maxLines
        )

        if (!isContentLengthValid) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }
    }
}

(async () => {
    const result = await File.csvToJson('../mocks/fourItems-invalid.csv')
    // const test = await File.isInvalid('../mocks/invalid-header.csv')
    // const [result, test] = await Promise.all([
    //     File.csvToJson('../mocks/threeItems-valid.csv'),
    //     File.isInvalid('../mocks/invalid-header.csv')
    // ])

    console.log("result: ", result)
    // console.log("test: ", test)
})()