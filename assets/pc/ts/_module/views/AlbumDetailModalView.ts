import IAlbum from '../models/interface/IAlbum';
import StatusModel from '../models/StatusModel';
import AlbumModel from '../models/AlbumModel';

import IAlbumDetailModalView from '../views/interface/IAlbumDetailModalView';
import BaseModalView from '../views/abstruct/BaseModalView';


export default class AlbumDetailModalView extends BaseModalView<IAlbum, IAlbum> {
  model: AlbumModel;
  status: StatusModel = new StatusModel({ isLoading: false, isFav: false });
  private $favIcon: JQuery;
  private $modalFavTrigger: JQuery;
  constructor(args: IAlbumDetailModalView) { super(args); }
  protected setOptions(args?: IAlbumDetailModalView): this {
    super.setOptions(args);
    return this;
  }
  protected setEl(): this {
    super.setEl();
    this.$modalFavTrigger = this.$el.find('.jsModalFavTrigger');
    this.$favIcon = this.$modalFavTrigger.find('i');
    return this;
  };
  protected setEvents(): this {
    super.setEvents();
    this.$modalFavTrigger.on('click', () => {
      if (!this.status.get.isLoading) {
        this.status.set = { isLoading: true };
        this.toggleFav().then(() => this.checkFavStatus());
      }
    });
    return this;
  };
  protected resetEvents(): this {
    super.resetEvents();
    this.$modalFavTrigger.off();
    return this;
  }
  protected toggleFav(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.status.set = (!this.status.get.isFav) ? { isFav: true } : { isFav: false };
        this.status.set = { isLoading: false };
        resolve();
      }, 200);
    });
  };
  protected checkFavStatus(): this {
    if (this.status.get.isFav) {
      this.$favIcon.removeClass('fa-heart').addClass('fa-heart-o');
    }else {
      this.$favIcon.removeClass('fa-heart-o').addClass('fa-heart');
    }
    return this;
  }
}
