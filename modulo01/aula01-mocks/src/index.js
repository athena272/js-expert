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
        const validation = File.isValid(content)
        if (!validation.valid) {
            throw new Error(validation.error)
        }

        return content

    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString("utf-8")
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
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

        return { valid: true }
    }
}

// (async () => {
//     // const result = await File.csvToJson('../mocks/threeItems-valid.csv')
//     // const result = await File.csvToJson('../mocks/fourItems-invalid.csv')
//     const result = await File.isValid('../mocks/invalid-header.csv')
//     // const [result, test] = await Promise.all([
//     //     File.csvToJson('../mocks/threeItems-valid.csv'),
//     //     File.isValid('../mocks/invalid-header.csv')
//     // ])

//     console.log("result: ", result)
//     // console.log("test: ", test)
// })()

module.exports = File