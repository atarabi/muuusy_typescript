import IAppStatus from '../models/IAppStatus';
import IAlbum from '../models/IAlbum';

import IBaseView from '../views/IBaseView';
import BasePageView from '../views/BasePageView';

interface IAlbumListView extends IBaseView<IAppStatus, IAlbum> {
  parentView: BasePageView;
};

export default IAlbumListView;
