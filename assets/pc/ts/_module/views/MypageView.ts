import BasePageView = require('../views/BasePageView');

import setMock = require('../../_api/mock');

class MypageView extends BasePageView {
  protected _setFn(): void {
    setMock();
    this._getData();
  }
}

export = MypageView;
