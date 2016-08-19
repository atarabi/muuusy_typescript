import * as $ from 'jquery';
const imagesLoaded = require('imagesloaded');

import IAppStatus from '../models/interface/IAppStatus';
import IAlbum from '../models/interface/IAlbum';
import AppStatusModel  from '../models/AppStatusModel';
import AlbumModel  from '../models/AlbumModel';

import IAlbumListView from '../views/interface/IAlbumListView';
import BaseView from '../views/abstruct/BaseView';
import PageView from '../views/PageView';
import AlbumDetailModalView from '../views/AlbumDetailModalView';

const notFoundTmpl = require('../../../templates/home/_partials/notFound');
const albumDetailTmpl = require('../../../templates/home/_partials/albumDetail.ejs');


export default class AlbumListView extends BaseView<IAppStatus, IAlbum> {
  private parentView: PageView;
  private $modalOpenTrigger: JQuery;
  private albumDetailModalView: AlbumDetailModalView;
  private albumDetailModalViewEl: string = this.parentView.el + ' .albumDetailModalView';
  private modalModel: AlbumModel;
  private masonryClass: string = '.jsMasonryBox';
  constructor(args: IAlbumListView) { super(args); }
  protected setOptions(args?: IAlbumListView): this {
    super.setOptions(args);
    this.parentView = args.parentView;
    return this;
  }
  protected setEl(): this {
    super.setEl();
    this.$modalOpenTrigger = this.$el.find('.jsModalOpenTrigger');
    return this;
  }
  protected render(): this {
    super.render();
    this.$el.hide().removeClass('hide');
    if (this.collection.length > 0) {
      this.$el.hide().removeClass('hide');
      imagesLoaded(this.$el, this.onImgesLoaded());
    } else {
      this.notFoundRender();
    }
    return this;
  }
  protected setEvents(): this {
    super.setEvents();
    this.$modalOpenTrigger.on('click', (e: JQueryEventObject) => {
      const collectionId = $(e.target).closest(this.masonryClass).data('collectionId');
      this.modalModel = this.getModel(collectionId);
      this.openAlbumDetail();
    });
    return this;
  }
  protected resetEvents(): this {
    super.resetEvents();
    this.$modalOpenTrigger.off();
    return this;
  }
  protected getModel(collectionId: string): AlbumModel {
    return this.collection.find((model: AlbumModel) => {
      return model.get.collectionId === collectionId;
    });
  }
  private onImgesLoaded(): void {
    setTimeout(() => {
      this.show().fixImgSize().parentView.observer.emit('AlbumViewOnRender');
    }, 200);
  }
  private notFoundRender(): this {
    this.show();
    this.$el.append(notFoundTmpl({term: this.model.get.term}));
    return this;
  }
  protected show(): this {
    this.parentView.observer.emit('loadingFinish');
    this.$el.fadeIn(300);
    return this;
  }
  private fixImgSize(): this {
    this.$el.children().each(function() {
      const $img = $(this).find('img');
      const width = $img.width();
      const height = $img.height();
      if (height > width) {
        $img.addClass('fixHeight');
        // img.css({height: width});
      }
    });
    return this;
  }
  private openAlbumDetail(): this {
    if (this.albumDetailModalView) { this.albumDetailModalView.destroy(); }
    this.albumDetailModalView = new AlbumDetailModalView({
      el: this.albumDetailModalViewEl,
      model: this.modalModel,
      template: albumDetailTmpl
    });
    return this;
  }
}
