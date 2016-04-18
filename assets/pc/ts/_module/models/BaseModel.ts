/**
 * BaseModel Class Description v1.1.0
 * @fileoverview 全ての継承元となるModel。
 *    対応ブラウザはモダンブラウザ（IE8以上）
 */

abstract class BaseModel<T> {
  protected _attributes: T;
  constructor(args?: T) {
    if (args) { this._attributes = args; }
  }
  get get(): T {
    return this._attributes;
  }
  set set(args: T) {
    args = this.validate(args);
    this._attributes = args || this._attributes;
  }
  protected validate(args: T): T {
    return args;
  }
}

export = BaseModel;
