import BasePageView from '../views/BasePageView';
import setMock from '../../_api/mock';

export default class FeedView extends BasePageView {
  protected _setFn(): void {
    setMock();
    this._getData();
  }
}
