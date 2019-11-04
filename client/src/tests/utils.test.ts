import Utils from '../lib/utils';

test('Returns true when all keys contained', () => {
  const smallObj = { a: '1', b: '2' };
  const largeObj = { c:'0', a: '1', b: '2', d:'3' };
  expect(Utils.checkAllKeysExist(smallObj, largeObj)).toBe(true);
});

test('Returns true when all keys contained with zero among them', () => {
  const smallObj = { a: '1', b: '2' };
  const largeObj = { c:'0', a: '0', b: '0', d:'3' };
  expect(Utils.checkAllKeysExist(smallObj, largeObj)).toBe(true);
});

test('Returns true when all keys contained as numbers', () => {
  const smallObj = { 1: '1', 2: '2' };
  const largeObj = { 3:'0', 1: '1', 2: '2', 4:'3' };
  expect(Utils.checkAllKeysExist(smallObj, largeObj)).toBe(true);
});

test('Returns true when all keys contained as number strings', () => {
  const smallObj = { '1': '1', '2': '2' };
  const largeObj = { '3':'0', '1': '1', '2': '2', '4':'3' };
  expect(Utils.checkAllKeysExist(smallObj, largeObj)).toBe(true);
});

test('Returns true when all keys contained as number strings; values as strings', () => {
  const smallObj = { '10001': 'AA', '20002': 'BB' };
  const largeObj = { '30003':'CCC', '10001': 'AAA', '20002': 'BBB', '40004':'DDD' };
  expect(Utils.checkAllKeysExist(smallObj, largeObj)).toBe(true);
});

test('Returns false when no keys contained', () => {
  const smallObj = { a: '1', b: '2' };
  const largeObj = { c:'0', e: '1', f: '2', d:'3' };
  expect(Utils.checkAllKeysExist(smallObj, largeObj)).toBe(false);
});

test('Returns false when one key contained', () => {
  const smallObj = { a: '1', b: '2' };
  const largeObj = { c:'0', a: '1', f: '2', d:'3' };
  expect(Utils.checkAllKeysExist(smallObj, largeObj)).toBe(false);
});