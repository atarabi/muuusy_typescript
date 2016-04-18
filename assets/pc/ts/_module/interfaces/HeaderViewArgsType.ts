import BaseViewArgsType = require('../interfaces/BaseViewArgsType');
import AppStatusType = require('../interfaces/AppStatusType');

import BasePageView = require('../views/BasePageView');

interface HeaderViewArgsType extends BaseViewArgsType<AppStatusType> {
  views: {
    homeView: BasePageView;
    mypageView: BasePageView;
    searchView: BasePageView;
  };
};

export = HeaderViewArgsType;
