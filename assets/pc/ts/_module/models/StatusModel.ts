import StatusType = require('../interfaces/StatusType');

import BaseModel = require('../models/BaseModel');

class StatusModel extends BaseModel<StatusType> {
  constructor(args?: StatusType) {
    super(args);
    if (!args) {
      this._attributes = {
        isLoading: false
      };
    }
  };
  set set(args: StatusType) {
    this._attributes.isLoading = args.isLoading || this._attributes.isLoading;
    this._attributes.isFav = args.isFav || this._attributes.isFav;
  }
};

export = StatusModel;
