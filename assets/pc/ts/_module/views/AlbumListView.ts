import * as $ from 'jquery';
import * as _ from 'lodash';
import imagesLoaded = require('imagesloaded');

import IAppStatus from '../models/IAppStatus';
import AppStatusModel  from '../models/AppStatusModel';
import AlbumModel  from '../models/AlbumModel';

import IAlbumListView from '../views/IAlbumListView';
import BaseView from '../views/BaseView';
import BasePageView from '../views/BasePageView';
import AlbumDetailModalView from '../views/AlbumDetailModalView';

const albumListTmpl = require('../../../templates/home/_partials/albumList');
const notFoundTmpl = require('../../../templates/home/_partials/notFound');


export default class AlbumListView extends BaseView<IAppStatus> {
  model: AppStatusModel;
  collection: AppStatusModel[];
  parentView: BasePageView;
  private _albumDetailModalView: AlbumDetailModalView;
  private _albumDetailModalViewEl: string = this.parentView.el + ' .albumDetailModalView';
  private _modalModel: AlbumModel;
  private _deferredEvents: JQueryDeferred<void> = $.Deferred<void>();
  private _masonryClass: string = '.jsMasonryBox';
  constructor(args: IAlbumListView) {
    super(args);
  }
  protected _setOptions(args?: IAlbumListView): void {
    args.template = albumListTmpl;
    this.parentView = args.parentView;
    super._setOptions(args);
    this.model = args.model;
  }
  protected render(): void {
    super.render();
    this._$el.hide().removeClass('hide');
    if (this.collection.length > 0) {
      imagesLoaded(this._$el, this.onImgesLoaded());
    }else {
      this.notFoundRender();
    }
  }
  protected show(): void {
    this.parentView.$el.trigger('loadingFinish');
    this._$el.fadeIn(300);
  }
  protected _setEvents(): void {
    this._$el.find('li > a').on('click', (e: JQueryEventObject) => {
      const collectionId = $(e.target).closest(this._masonryClass).data('collectionId');
      this._getModel(collectionId);
      this._deferredEvents.promise().done(() => {
        this.openAlbumDetail();
      });
    });
  }
  protected _getModel(collectionId: string): void {
    _.each(this.collection, (model: AlbumModel) => {
      if (model.get.collectionId === collectionId) {
        this._modalModel = model;
        this._deferredEvents.resolve();
      }
    });
  }
  private onImgesLoaded(): void {
    this.show();
    this.fixImgSize();
    this.parentView.$el.trigger('AlbumViewOnRender');
  }
  private notFoundRender(): void {
    this.show();
    this._$el.append(notFoundTmpl({searchWord: this.model.get.searchWord}));
  }
  private fixImgSize(): void {
    this._$el.children().each(() => {
      const $img = $(this).find('img');
      const width = $img.width();
      const height = $img.height();
      if (height > width) {
        $img.addClass('fixHeight');
        // img.css({height: width});
      }
    });
  }
  private openAlbumDetail(): void {
    if (this._albumDetailModalView) { this._albumDetailModalView.destroy(); }
    this._albumDetailModalView = new AlbumDetailModalView({
      el: this._albumDetailModalViewEl,
      model: this._modalModel
    });
  }
  resetEvents(): void {
    super.resetEvents();
    this._$el.find('li > a').off();
  }
}
