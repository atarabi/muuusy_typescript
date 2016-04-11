import BasePageView = require('./BasePageView');
import setMock = require('../../_api/mock');

class FeedView extends BasePageView {
  protected _setFn(): void {
    setMock();
    this._getData();
  }
}

export = FeedView;
