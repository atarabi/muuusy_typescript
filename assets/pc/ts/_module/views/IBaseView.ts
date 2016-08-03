import BaseModel from '../models/BaseModel';

interface IBaseView<T> {
  el: string;
  model?: BaseModel<T>;
  collection?: BaseModel<T>[];
  template?(args?: { data: T }): string;
};

export default IBaseView;
