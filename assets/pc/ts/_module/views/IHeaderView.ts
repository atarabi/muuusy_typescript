import IAppStatus from '../models/IAppStatus';

import IBaseView from '../views/IBaseView';
import BasePageView from '../views/BasePageView';

interface IHeaderView extends IBaseView<IAppStatus> {
  views: {
    homeView: BasePageView;
    mypageView: BasePageView;
    searchView: BasePageView;
  };
};

export default IHeaderView;
