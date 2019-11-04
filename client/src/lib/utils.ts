export default class Utils {
  static checkAllKeysExist(obj: any, largeObj: any) {
    return Object.keys(obj).find((k) => {
      return !(k in largeObj);
      }) ? false: true;
  }
}