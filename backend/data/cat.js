const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.cats) {
    throw new NotFoundError('Could not find any cats.');
  }
  return storedData.cats;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.cats || storedData.cats.length === 0) {
    throw new NotFoundError('Could not find any cats.');
  }

  const cat = storedData.cats.find((c) => c.id === id);
  if (!cat) {
    throw new NotFoundError('Could not find a cat for id ' + id);
  }

  return cat;
}

async function add(data) {
  const storedData = await readData();
  storedData.cats.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.cats || storedData.cats.length === 0) {
    throw new NotFoundError('Could not find any cats.');
  }

  const index = storedData.cats.findIndex((c) => c.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find a cat for id ' + id);
  }

  storedData.cats[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.cats.filter((c) => c.id !== id);
  await writeData({ ...storedData, cats: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;