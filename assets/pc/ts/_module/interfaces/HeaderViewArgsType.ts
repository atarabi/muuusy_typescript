import BaseViewArgsType = require('../interfaces/BaseViewArgsType');
import PageStatusType = require('../interfaces/PageStatusType');

import BasePageView = require('../views/BasePageView');

interface HeaderViewArgsType extends BaseViewArgsType<PageStatusType> {
  views: {
    homeView: BasePageView;
    mypageView: BasePageView;
    searchView: BasePageView;
  };
};

export = HeaderViewArgsType;
