import BaseModel = require('../models/BaseModel');

interface BaseViewArgsType<T> {
  el: string;
  model?: BaseModel<T>;
  collection?: BaseModel<T>[];
  template?(args?: { data: T }): string;
};

export = BaseViewArgsType;
