/**
 * BaseModel Class Description v2.0.0
 */

abstract class BaseModel<T> {
  protected _attributes: T;
  constructor(args?: T) {
     this._attributes = args || null;
  }
  get get(): T {
    return this._attributes;
  }
  set set(args: T) {
    args = this.validate(args);
    this._attributes = _.merge(this._attributes, args);
  }
  protected validate(args: T): T {
    return args;
  }
}

export default BaseModel;
