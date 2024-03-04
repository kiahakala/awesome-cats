const fs = require('node:fs/promises')

async function readData() {
	const data = await fs.readFile('cats.json', 'utf-8')
	return JSON.parse(data)
}

async function writeData(data) {
	await fs.writeFile('cats.json', JSON.stringify(data))
}

exports.readData = readData
exports.writeData = writeData