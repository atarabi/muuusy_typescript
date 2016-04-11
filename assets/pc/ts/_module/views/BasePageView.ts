import AlbumType = require('../interfaces/AlbumType');
import PageViewArgsType = require('../interfaces/PageViewArgsType');
import PageStatusType = require('../interfaces/PageStatusType');

import ajax = require('../utils/ajax');
import AlbumModel = require('../models/AlbumModel');
import PageStatusModel = require('../models/PageStatusModel');
import StatusModel = require('../models/StatusModel');
import BaseView = require('./BaseView');
import AlbumListView = require('./AlbumListView');

const $ = require('jquery');
const Masonry = require('../../libs/masonry.pkgd.js');


class BasePageView extends BaseView<PageStatusType> {
  model: PageStatusModel;
  collection: PageStatusModel[];
  status: StatusModel = new StatusModel({ isLoading: false });
  protected _ajaxConf: {
    type: string;
    url: string;
    data: {};
    dataType: string;
  };
  protected _albumListView: AlbumListView;
  protected _$albumList: JQuery;
  protected _$loader: JQuery;
  protected _masonryClass: string = '.jsMasonryBox';
  private _albumlistEl: string = '.albumList';
  private _msnry: IMasonry;
  private _$masonryBox: JQuery;
  constructor(args: PageViewArgsType) {
    super(args);
  }
  protected _setOptions(args?: PageViewArgsType): void {
    this._ajaxConf = {
      type: 'get',
      url: args.url,
      data: {},
      dataType: 'json'
    };
    super._setOptions(args);
  }
  protected _setEl(): void {
    super._setEl();
    this._$loader = this._$el.find('.listLoader');
    this._$albumList = this._$el.find(this._albumlistEl);
    this._$masonryBox = this._$el.find('.jsMasonry');
  }
  protected _setCustomEvents(): void {
    this._$el.on('onOpen', () => {
      this._msnry.layout();
    });
    this._$el.on('loadingFinish', () => {
      this.status.get.isLoading = false;
      this._checkLoading();
    });
    this._$el.on('AlbumViewOnRender', () => {
      this._setMasonry();
    });
  }
  protected _setMasonry(): void {
    this._msnry = new Masonry(this._$masonryBox[0], {
      itemSelector: this._masonryClass,
      columnWidth: this._masonryClass,
      percentPosition: true,
      transitionDuration: '0.2s'
    });
  }
  protected _getData(): void {
    this._resetChildView();
    this.status.get.isLoading = true;
    this._checkLoading();
    this.resetList();
    $.ajax(this._ajaxConf).always((jqXHR, textStatus) => {
      let status = ajax.getStatus(textStatus);
      (status === 'success') ? this._parseData(jqXHR) : this._networkErrorRender();
    });
  }
  protected _parseData(datas): void {
    this._albumListViewRender(datas);
  }
  protected _albumListViewRender(datas): void {
    let collection = [];
    _.each(datas, (album: AlbumType) => {
      collection.push(new AlbumModel(album));
    });
    this._albumListView = new AlbumListView({
      el: this.el + ' ' + this._albumlistEl,
      model: this.model,
      collection: collection,
      parentView: this
    });
    this.status.get.isLoading = false;
    this._checkLoading();
  }
  protected _networkErrorRender(): void {
    this.status.get.isLoading = false;
    this._checkLoading();
  }
  protected _checkLoading(): void {
    if (this.status.get.isLoading) {
      this._$loader.removeClass('hide').show();
    }else {
      this._$loader.addClass('hide').hide();
    }
  };
  protected _resetChildView(): void {
    if (this._albumListView) { this._albumListView.destroy(); }
  }
  protected resetList(): void {
    this._$albumList.addClass('hide').hide();
    this._$albumList.children().remove();
  }
  resetEvents(): void {
    this._$el.off();
  }
}

export = BasePageView;
