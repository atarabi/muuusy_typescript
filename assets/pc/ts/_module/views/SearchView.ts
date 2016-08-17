import IPageView from '../views/IPageView';
import BasePageView from '../views/BasePageView';


export default class SearchView extends BasePageView {
  protected _ajaxConf: {
    type: string;
    url: string;
    data: {
      term: string;
      country: string;
      lang: string;
      media: string;
      entity: string;
      limit: number;
    };
    jsonpCallback: string;
    dataType: string;
  };
  protected _setOptions(args?: IPageView): void {
    super._setOptions(args);
    const reqData = {
      term: this.model.get.term,
      country: 'US',
      lang: 'en_us',
      media: 'music',
      entity: 'album',
      limit: 100
    };
    this._ajaxConf.data = reqData;
    this._ajaxConf.jsonpCallback = 'callback';
    this._ajaxConf.dataType = 'jsonp';
  }
  protected _parseData(collection): void {
    collection.forEach((album) => {
      album.artworkUrl400 = album.artworkUrl100.replace('100x100bb', '400x400bb');
    });
    super._parseData(collection);
  }
}
