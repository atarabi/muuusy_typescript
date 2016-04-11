import PageStatusType = require('../interfaces/PageStatusType');

import BaseModel = require('../models/BaseModel');

class PageStatusModel extends BaseModel<PageStatusType> {
  constructor(args?: PageStatusType) {
    super(args);
    if (!args) {
      this._attributes = {
        pageStatus: '',
        searchWord: ''
      };
    }
  };
  set set(args: PageStatusType) {
    this._attributes.pageStatus = args.pageStatus || this._attributes.pageStatus;
    this._attributes.searchWord = args.searchWord || this._attributes.searchWord;
  }
};

export = PageStatusModel;
