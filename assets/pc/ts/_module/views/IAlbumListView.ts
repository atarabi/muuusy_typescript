import IAppStatus = require('../models/IAppStatus');

import IBaseView = require('../views/IBaseView');
import BasePageView = require('../views/BasePageView');

interface IAlbumListView extends IBaseView<IAppStatus> {
  parentView: BasePageView;
};

export = IAlbumListView;
