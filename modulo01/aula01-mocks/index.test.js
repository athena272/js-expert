const File = require('./src/index')
const { error } = require('./src/constants')
const { rejects, deepStrictEqual } = require('assert')
    ;
(async () => {
    {
        const filePath = './mocks/invalid-header.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = File.csvToJson(filePath)
        const expected = [
            {
                "id": 123,
                "name": "Erick Wendel",
                "profession": "Javascript Instructor",
                "age": 25
            },
            {
                "id": 321,
                "name": "Xuxa da Silva",
                "profession": "Javascript Developer",
                "age": 80
            },
            {
                "id": 231,
                "name": "Joazinho",
                "profession": "Java Developer",
                "age": 30
            }
        ]

        deepStrictEqual(result, expected)

    }
})()
