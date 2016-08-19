import BaseModel from '../../models/abstruct/BaseModel';


interface IBaseView<T, T2> {
  el: string;
  model?: BaseModel<T>;
  collection?: BaseModel<T2>[];
  template?(args?: { data: T }): string;
};

export default IBaseView;
