import IAppStatus from '../models/interface/IAppStatus';
import BaseModel from '../models/abstruct/BaseModel';


export default class AppStatusModel extends BaseModel<IAppStatus> {
  constructor(args?: IAppStatus) {
    super(args);
    this._attributes = args || { term: '' };
  }
};
