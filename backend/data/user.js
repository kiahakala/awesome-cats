const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function add(data) {
	const storedData = await readData();
	const userId = generateId();
	const hashedPw = await hash(data.password, 12);
	if (!storedData.users) {
		storedData.users = [];
	}
	storedData.users.push({ ...data, id: userId, password: hashedPw });
	await writeData(storedData);
	return { id: userId, email: data.email };
}

async function get(email) {
	const storedData = await readData();
	if (!storedData.users || storedData.users.length === 0) {
		throw new NotFoundError('Could not find any users.');
	}

	const user = storedData.users.find((u) => u.email === email);
	if (!user) {
		throw new NotFoundError('Could not find a user for email ' + email);
	}

	return user;
}

exports.add = add;
exports.get = get;