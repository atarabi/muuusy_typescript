import AppStatusType = require('../interfaces/AppStatusType');

import BaseModel = require('../models/BaseModel');

class AppStatusModel extends BaseModel<AppStatusType> {
  constructor(args?: AppStatusType) {
    super(args);
    if (!args) {
      this._attributes = {
        appStatus: '',
        searchWord: ''
      };
    }
  };
  set set(args: AppStatusType) {
    this._attributes.appStatus = args.appStatus || this._attributes.appStatus;
    this._attributes.searchWord = args.searchWord || this._attributes.searchWord;
  }
};

export = AppStatusModel;
