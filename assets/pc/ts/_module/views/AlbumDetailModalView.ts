import IAppStatus from '../models/IAppStatus';
import IAlbum from '../models/IAlbum';
import AppStatusModel from '../models/AppStatusModel';
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
        this.status.get.isLoading = true;
        this._toggleFav();
      }
    });
  };
  protected _toggleFav(): void {
    this.status.get.isFav = (!this.status.get.isFav) ? true : false;
    this._checkFavStatus();
    this.status.get.isLoading = false;
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
  resetStatus(): void {
    this.status = new StatusModel({
      isLoading: true,
      isFav: false
    });
  }
}
