import BaseViewArgsType = require('../interfaces/BaseViewArgsType');
import AlbumType = require('../interfaces/AlbumType');

import StatusModel = require('../models/StatusModel');
import AlbumModel = require('../models/AlbumModel');
import BaseModalView = require('./BaseModalView');

const albumDetailTmpl = require('../../../templates/home/_partials/albumDetail.ejs');

// AlbumDetailModalView
class AlbumDetailModalView extends BaseModalView<AlbumType> {
  model: AlbumModel;
  collection: AlbumModel[];
  status: StatusModel = new StatusModel({ isLoading: true, isFav: false });
  private _$favIcon: JQuery;
  private _$modalFavTrigger: JQuery;
  constructor(args: BaseViewArgsType<AlbumType>) {
    super(args);
  }
  protected _setOptions(args?: BaseViewArgsType<AlbumType>): void {
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
    this.status.get.isFav = (this._$favIcon.hasClass('fa-heart')) ? true : false;
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

export = AlbumDetailModalView;
