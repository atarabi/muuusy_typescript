import * as $ from 'jquery';
const Masonry = require('masonry-layout');

import IAppStatus from '../models/interface/IAppStatus';
import IAlbum from '../models/interface/IAlbum';
import AppStatusModel from '../models/AppStatusModel';
import AlbumModel from '../models/AlbumModel';
import StatusModel from '../models/StatusModel';

import IPageView from '../views/interface/IPageView';
import BaseView from '../views/abstruct/BaseView';
import AlbumListView from '../views/AlbumListView';
import LoaderView from './LoaderView';
import getData from '../fn/Api';

const albumListTmpl = require('../../../templates/home/_partials/albumList');


export default class BasePageView extends BaseView<IAppStatus, IAlbum> {
  model: AppStatusModel;
  collection: AlbumModel[];
  status: StatusModel = new StatusModel({ isLoading: true });
  protected favs: AlbumModel[];
  protected albumListView: AlbumListView;
  protected $albumList: JQuery;
  protected $loader: JQuery;
  protected masonryClass: string = '.jsMasonryBox';
  private loaderView: LoaderView;
  private $masonryBox: JQuery;
  private msnry: MasonryGrid;
  private albumlistEl: string = '.albumList';
  constructor(args: IPageView) { super(args); }
  protected setOptions(args?: IPageView): this {
    super.setOptions(args);
    this.status.set = { url: args.url };
    return this;
  }
  protected setEl(): this {
    super.setEl();
    this.$loader = this.$el.find('.listLoader');
    this.$albumList = this.$el.find(this.albumlistEl);
    this.$masonryBox = this.$el.find('.jsMasonry');
    return this;
  }
  protected setCustomEvents(): this {
    super.setCustomEvents();
    this.setLoader();
    this.observer.on('AlbumViewOnRender', () =>  this.setMasonry());
    this.observer.on('loadingStart', () => {
      this.status.set = { isLoading: true };
      this.loaderView.show();
    });
    this.observer.on('loadingFinish', () => {
      this.status.set = { isLoading: false };
      this.loaderView.hide();
    });
    return this;
  }
  protected setFn(): this {
    super.setFn();
    this.observer.emit('loadingStart');
    this.resetChildView();
    this.resetList();
    if (this.status.get.url) {
      const term = this.model.get.term || '';
      getData(this.status.get.url, term).then((albums) => {
        this.albumListViewRender(albums);
      }, (albums) => {
        this.networkErrorRender();
      });
    }
    return this;
  }
  protected setLoader(): this {
    this.loaderView = new LoaderView({ el: '#loaderView' });
    this.loaderView.show();
    return this;
  }
  protected setMasonry(): this {
    if (!this.msnry) {
      this.msnry = new Masonry(this.$masonryBox[0], {
        itemSelector: this.masonryClass,
        columnWidth: this.masonryClass,
        percentPosition: true,
        transitionDuration: '0.2s'
      });
    } else {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
    return this;
  }
  protected albumListViewRender(albums: any): void {
    let collection: AlbumModel[] = albums.map((album: IAlbum) => { return new AlbumModel(album); });
    this.albumListView = new AlbumListView({
      el: this.el + ' ' + this.albumlistEl,
      model: this.model,
      collection: collection,
      template: albumListTmpl,
      parentView: this
    });
  }
  protected networkErrorRender(): void {
    this.observer.emit('loadingFinish');
  }
  protected resetChildView(): void {
    if (this.albumListView) { this.albumListView.destroy(); }
  }
  protected resetList(): void {
    this.$albumList.addClass('hide').hide();
    this.$albumList.children().remove();
  }
}
