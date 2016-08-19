import IAppStatus from '../../models/interface/IAppStatus';
import IAlbum from '../../models/interface/IAlbum';

import IBaseView from '../../views/interface/IBaseView';
import PageView from '../../views/PageView';


interface IAlbumListView extends IBaseView<IAppStatus, IAlbum> {
  parentView: PageView;
};

export default IAlbumListView;
