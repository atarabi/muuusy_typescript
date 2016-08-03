import IAppStatus from '../models/IAppStatus';

import IBaseView from '../views/IBaseView';

interface IPageView extends IBaseView<IAppStatus> {
  url: string;
};

export default IPageView;
