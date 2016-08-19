import IAppStatus from '../../models/interface/IAppStatus';
import IAlbum from '../../models/interface/IAlbum';

import IBaseView from '../../views/interface/IBaseView';


interface IAlbumDetailModalView extends IBaseView<IAlbum, IAlbum> {};

export default IAlbumDetailModalView;
