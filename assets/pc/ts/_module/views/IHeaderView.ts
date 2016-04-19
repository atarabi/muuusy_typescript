import IAppStatus = require('../models/IAppStatus');

import IBaseView = require('../views/IBaseView');
import BasePageView = require('../views/BasePageView');

interface IHeaderView extends IBaseView<IAppStatus> {
  views: {
    homeView: BasePageView;
    mypageView: BasePageView;
    searchView: BasePageView;
  };
};

export = IHeaderView;
