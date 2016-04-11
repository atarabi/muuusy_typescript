/**
 * BaseModel Class Description v1.1.0
 * @fileoverview 全ての継承元となるModel。
 *    対応ブラウザはモダンブラウザ（IE8以上）
 */

class BaseModel<T> {
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
  protected validate(args: T) {
    if (!args) { throw new Error('BaseModel.set arguments is empty.'); }
    return args;
  }
}

export = BaseModel;
