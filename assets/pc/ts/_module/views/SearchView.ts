import PageViewArgsType = require('../interfaces/PageViewArgsType');

import BasePageView = require('./BasePageView');

// 記事情報やページ全体のView
class SearchView extends BasePageView {
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
  protected _setOptions(args?: PageViewArgsType): void {
    super._setOptions(args);
    let reqData = {
      term: '',
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
  protected _setCustomEvents(): void {
    this._$el.on('onOpen', (e: JQueryEventObject, searchWord: string) => {
      if (this.status.get.isLoading === false ) {
        this.model.set = { searchWord: searchWord };
        this._ajaxConf.data.term = searchWord;
        this._getData();
      }
    });
    this._$el.on('loadingFinish', () => {
      this.status.get.isLoading = false;
      this._checkLoading();
    });
    this._$el.on('AlbumViewOnRender', () => {
      this._setMasonry();
    });
  }
  protected _parseData(datas): void {
    let collection = datas.results;
    _.each(collection, (album) => {
      album.artworkUrl400 = album.artworkUrl100.replace('100x100bb', '400x400bb');
    });
    super._parseData(collection);
  }
}

export = SearchView;
