import IAppStatus from '../models/IAppStatus';
import IAlbum from '../models/IAlbum';

import IBaseView from '../views/IBaseView';
import BasePageView from '../views/BasePageView';


interface IHeaderView extends IBaseView<IAppStatus, IAlbum> {
  views: {
    homeView: BasePageView;
    mypageView: BasePageView;
    searchView: BasePageView;
  };
};

export default IHeaderView;
