import BaseViewArgsType = require('../interfaces/BaseViewArgsType');
import PageStatusType = require('../interfaces/PageStatusType');

import BasePageView = require('../views/BasePageView');

interface AlbumListViewArgsType extends BaseViewArgsType<PageStatusType> {
  parentView: BasePageView;
};

export = AlbumListViewArgsType;
