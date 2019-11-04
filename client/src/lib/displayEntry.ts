import Config from '../config';
export type DisplayEntry = {ric: string, bidsize:number, bid: number, asksize: number, ask: number};
export const DefaultDisplayEntry: DisplayEntry = { ric: Config.DefaultSymbol, bidsize: 0, bid: 0, asksize: 0, ask: 0 } as DisplayEntry;