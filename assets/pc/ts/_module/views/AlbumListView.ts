import PageStatusType = require('../interfaces/PageStatusType');
import AlbumListViewArgsType = require('../interfaces/AlbumListViewArgsType');

import PageStatusModel = require('../models/PageStatusModel');
import AlbumModel = require('../models/AlbumModel');
import BaseView = require('../views/BaseView');
import BasePageView = require('../views/BasePageView');
import AlbumDetailModalView = require('./AlbumDetailModalView');

const $ = jQuery = require('jquery');
const imagesLoaded = require('imagesloaded');
const albumListTmpl = require('../../../templates/home/_partials/albumList');
const notFoundTmpl = require('../../../templates/home/_partials/notFound');


class AlbumListView extends BaseView<PageStatusType> {
  model: PageStatusModel;
  collection: PageStatusModel[];
  parentView: BasePageView;
  private _albumDetailModalView: AlbumDetailModalView;
  private _albumDetailModalViewEl: string = this.parentView.el + ' .albumDetailModalView';
  private _modalModel: AlbumModel;
  private _deferredEvents: JQueryDeferred<void> = jQuery.Deferred<void>();
  private _masonryClass: string = '.jsMasonryBox';
  constructor(args: AlbumListViewArgsType) {
    super(args);
  }
  protected _setOptions(args?: AlbumListViewArgsType): void {
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

export = AlbumListView;
