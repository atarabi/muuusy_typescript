import IAppStatus from '../../models/interface/IAppStatus';
import IAlbum from '../../models/interface/IAlbum';

import IBaseView from '../../views/interface/IBaseView';


interface IPageView extends IBaseView<IAppStatus, IAlbum> {
  url: string;
};

export default IPageView;
