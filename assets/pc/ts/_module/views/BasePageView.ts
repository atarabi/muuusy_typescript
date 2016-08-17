import * as $ from 'jquery';
const Masonry = require('masonry-layout');

import IAppStatus from '../models/IAppStatus';
import IAlbum from '../models/IAlbum';
import AppStatusModel from '../models/AppStatusModel';
import AlbumModel from '../models/AlbumModel';
import StatusModel from '../models/StatusModel';

import IPageView from '../views/IPageView';
import BaseView from '../views/BaseView';
import AlbumListView from '../views/AlbumListView';
import LoaderView from './LoaderView';

import ajax from '../utils/ajax';


abstract class BasePageView extends BaseView<IAppStatus, IAlbum> {
  model: AppStatusModel;
  collection: AlbumModel[];
  favs: AlbumModel[];
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
  private _msnry: any;
  private _$masonryBox: JQuery;
  private _loaderView: LoaderView;
  constructor(args: IPageView) {
    super(args);
  }
  protected _setOptions(args?: IPageView): void {
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
    super._setCustomEvents();
    this._setLoader();
    this.observer.on('AlbumViewOnRender', () =>  this._setMasonry());
    this.observer.on('loadingStart', () => {
      this.status.get.isLoading = true;
      this._loaderView.show();
    });
    this.observer.on('loadingFinish', () => {
      this.status.get.isLoading = false;
      this._loaderView.hide();
    });
  }
  protected _setLoader() {
    this._loaderView = new LoaderView({ el: '#loaderView' });
    this._loaderView.show();
  }
  protected _setMasonry(): void {
    if (!this._msnry) {
      this._msnry = new Masonry(this._$masonryBox[0], {
        itemSelector: this._masonryClass,
        columnWidth: this._masonryClass,
        percentPosition: true,
        transitionDuration: '0.2s'
      });
    } else {
      this._msnry.reloadItems();
      this._msnry.layout();
    }
  }
  protected _getData(): void {
    this._resetChildView();
    this.observer.emit('loadingStart');
    this.resetList();
    $.ajax(this._ajaxConf).always((jqXHR, textStatus) => {
      const status = ajax.getStatus(textStatus);
      (status === 'success') ? this._getFavs(jqXHR) : this._networkErrorRender();
    });
  }
  protected _getFavs(albums): void {
    $.ajax({
      type: 'get',
      url: '/api/favs',
      dataType: 'json'
    }).always((jqXHR, textStatus) => {
      const status = ajax.getStatus(textStatus);
      if (status === 'success') {
        albums = this._checkFav(albums, jqXHR);
        this._parseData(albums);
      } else {
        this._networkErrorRender();
      }
    });
  }
  protected _checkFav(albums, compareAlbums) {
    albums = (albums.results) ? albums.results : albums;
    albums.forEach((album) => {
      album.isFav = false;
      compareAlbums.forEach((compareAlbum) => {
        if (album && album.collectionId.toString() === compareAlbum.collectionId.toString()) { album.isFav = true; }
      });
    });
    return albums;
  }
  protected _parseData(datas): void {
    this._albumListViewRender(datas);
  }
  protected _albumListViewRender(datas): void {
    let collection = datas.map((album: IAlbum) => { return new AlbumModel(album); });
    this._albumListView = new AlbumListView({
      el: this.el + ' ' + this._albumlistEl,
      model: this.model,
      collection: collection,
      parentView: this
    });
    this.observer.emit('loadingFinish');
  }
  protected _networkErrorRender(): void {
    this.observer.emit('loadingFinish');
  }
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

export default BasePageView;
