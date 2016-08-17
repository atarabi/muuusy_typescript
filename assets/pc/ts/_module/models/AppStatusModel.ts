import IAppStatus from '../models/IAppStatus';
import BaseModel from '../models/BaseModel';

export default class AppStatusModel extends BaseModel<IAppStatus> {
  constructor(args?: IAppStatus) {
    super(args);
    this._attributes = args || { term: '' };
  }
};
