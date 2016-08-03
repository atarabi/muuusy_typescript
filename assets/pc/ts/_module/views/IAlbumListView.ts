import IAppStatus from '../models/IAppStatus';

import IBaseView from '../views/IBaseView';
import BasePageView from '../views/BasePageView';

interface IAlbumListView extends IBaseView<IAppStatus> {
  parentView: BasePageView;
};

export default IAlbumListView;
