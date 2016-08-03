import IAppStatus from '../models/IAppStatus';
import IAlbum from '../models/IAlbum';

import IBaseView from '../views/IBaseView';


interface IPageView extends IBaseView<IAppStatus, IAlbum> {
  url: string;
};

export default IPageView;
