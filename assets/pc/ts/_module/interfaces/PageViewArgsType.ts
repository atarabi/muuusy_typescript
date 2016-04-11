import BaseViewArgsType = require('../interfaces/BaseViewArgsType');
import PageStatusType = require('../interfaces/PageStatusType');

interface PageViewArgsType extends BaseViewArgsType<PageStatusType> {
  url: string;
};

export = PageViewArgsType;
