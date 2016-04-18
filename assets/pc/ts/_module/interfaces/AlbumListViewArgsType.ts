import BaseViewArgsType = require('../interfaces/BaseViewArgsType');
import AppStatusType = require('../interfaces/AppStatusType');

import BasePageView = require('../views/BasePageView');

interface AlbumListViewArgsType extends BaseViewArgsType<AppStatusType> {
  parentView: BasePageView;
};

export = AlbumListViewArgsType;
