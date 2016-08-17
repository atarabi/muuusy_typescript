import IAlbum from '../models/IAlbum';
import StatusModel from '../models/StatusModel';
import AlbumModel from '../models/AlbumModel';

import IAlbumDetailModalView from '../views/IAlbumDetailModalView';
import BaseModalView from '../views/BaseModalView';

const albumDetailTmpl = require('../../../templates/home/_partials/albumDetail.ejs');


export default class AlbumDetailModalView extends BaseModalView<IAlbum, IAlbum> {
  model: AlbumModel;
  collection: AlbumModel[];
  status: StatusModel = new StatusModel({ isLoading: false, isFav: false });
  private _$favIcon: JQuery;
  private _$modalFavTrigger: JQuery;
  constructor(args: IAlbumDetailModalView) {
    super(args);
  }
  protected _setOptions(args?: IAlbumDetailModalView): void {
    args.template = albumDetailTmpl;
    super._setOptions(args);
  }
  protected _setEl(): void {
    this._$modalFavTrigger = this._$el.find('.jsModalFavTrigger');
    this._$favIcon = this._$modalFavTrigger.find('i');
    super._setEl();
  };
  protected _setEvents(): void {
    super._setEvents();
    this._$modalFavTrigger.on('click', () => {
      if (!this.status.get.isLoading) {
        this.status.set = { isLoading: true };
        this._toggleFav();
      }
    });
  };
  protected _toggleFav(): void {
    setTimeout(() => {
      this.status.set = (!this.status.get.isFav) ? { isFav: true } : { isFav: false };
      this.status.set = { isLoading: false };
      this._checkFavStatus();
    }, 200);
  };
  protected _checkFavStatus(): void {
    if (this.status.get.isFav) {
      this._$favIcon.removeClass('fa-heart').addClass('fa-heart-o');
    }else {
      this._$favIcon.removeClass('fa-heart-o').addClass('fa-heart');
    }
  }
  resetEvents(): void {
    super.resetEvents();
    this._$modalFavTrigger.off();
  }
}
