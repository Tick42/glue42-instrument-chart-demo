import { RandomDataGenerator, RandomDataTicker } from '../lib/candleStickData';

test('getFlatStartDate returns proper start date with 2 minutes interval', () => {
  const generator = new RandomDataGenerator();
  const resultMillis = generator.getFlatStartDateMillis(4, 2 * 60 * 1000, new Date(2019, 4, 20, 10, 45, 33));
  const result = new Date(resultMillis);
  expect(result.getDate()).toBe(20);
  expect(result.getMonth()).toBe(4);
  expect(result.getFullYear()).toBe(2019);
  expect(result.getMinutes()).toBe(36);
  expect(result.getSeconds()).toBe(0);
});

test('Returns shifted data', () => {
  const ticker = new RandomDataTicker(4, 5000);
  const firstData = ticker.next();
  const secondData = ticker.next();

  expect(firstData.length).toBe(4);
  expect(secondData.length).toBe(4);

  expect(firstData[1].c).toBe(secondData[0].c);
  expect(firstData[1].h).toBe(secondData[0].h);
  expect(firstData[1].l).toBe(secondData[0].l);
  expect(firstData[1].o).toBe(secondData[0].o);
  expect(firstData[1].t).toBe(secondData[0].t);

  expect(firstData[2].c).toBe(secondData[1].c);
  expect(firstData[2].h).toBe(secondData[1].h);
  expect(firstData[2].l).toBe(secondData[1].l);
  expect(firstData[2].o).toBe(secondData[1].o);
  expect(firstData[2].t).toBe(secondData[1].t);

  expect(firstData[3].c).toBe(secondData[2].c);
  expect(firstData[3].h).toBe(secondData[2].h);
  expect(firstData[3].l).toBe(secondData[2].l);
  expect(firstData[3].o).toBe(secondData[2].o);
  expect(firstData[3].t).toBe(secondData[2].t);
});