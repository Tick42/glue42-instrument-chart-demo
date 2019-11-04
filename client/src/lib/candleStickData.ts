import {DateTime} from 'luxon';
import {cloneDeep} from 'lodash';

export interface ICandleStickData {
  t: number, // time
  o: number, // open
  c: number, // close
  h: number, // high
  l: number // low
}

export class RandomDataGenerator {
  getRandomData(count: number, intervalLength: number = 24 * 60 * 60 * 1000): ICandleStickData[] {
    // TODO: Get this as a parameter:
    const lastClose = 30;
    const startDateMillis = this.getFlatStartDateMillis(count, intervalLength, Date.now());
    const data: ICandleStickData[] = [];
    let currentClose = 0;
    for (let i=0; i<count; i++) {
      const dateMillis = startDateMillis + i * intervalLength;
      const nextBar = this.createRandomBar(dateMillis, currentClose || lastClose);
      currentClose = nextBar.c;
      data.push(nextBar);
    }
    return data;
  }

  getFlatStartDateMillis(intervalsBack: number, intervalDuration: number, relativeDateMillis: number): number {
    const flattenedRelativeMillis = Math.floor(relativeDateMillis / intervalDuration) * intervalDuration;
    const millisToRemove = intervalsBack * intervalDuration;
    const flatStartDateMillis = flattenedRelativeMillis - millisToRemove;
    return flatStartDateMillis;
  }

  private randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  createRandomBar(dateMillis: number, lastClose: number): ICandleStickData {
    var open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
    var close = this.randomNumber(open * 0.95, open * 1.05);
    var high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
    var low = this.randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));
    return {
      t: dateMillis,
      o: open,
      h: high,
      l: low,
      c: close
    } as ICandleStickData;

  }
}

export class RandomDataTicker {
  private count: number;
  private interval: number;
  private data: ICandleStickData[];
  private generator = new RandomDataGenerator();

  constructor(count: number, interval: number) {
    this.count = count;
    this.interval = interval;
    this.data = this.generator.getRandomData(this.count, this.interval);
  }

  next(): ICandleStickData[] {
    this.data.shift();
    const lastEntry = this.data.pop() as ICandleStickData;
    this.data.push(lastEntry, this.generator.createRandomBar(lastEntry.t + this.interval, lastEntry.c));
    return cloneDeep(this.data);
  }
}