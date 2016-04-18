import BaseViewArgsType = require('../interfaces/BaseViewArgsType');
import AppStatusType = require('../interfaces/AppStatusType');

interface PageViewArgsType extends BaseViewArgsType<AppStatusType> {
  url: string;
};

export = PageViewArgsType;
