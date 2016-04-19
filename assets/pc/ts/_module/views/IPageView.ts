import IAppStatus = require('../models/IAppStatus');

import IBaseView = require('../views/IBaseView');

interface IPageView extends IBaseView<IAppStatus> {
  url: string;
};

export = IPageView;
