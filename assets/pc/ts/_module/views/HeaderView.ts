import * as $ from 'jquery';

import IAppStatus from '../models/IAppStatus';
import IAlbum from '../models/IAlbum';
import AppStatusModel from '../models/AppStatusModel';
import AlbumModel from '../models/AlbumModel';

import BaseView from '../views/BaseView';
import BasePageView from '../views/BasePageView';
import FeedView from '../views/FeedView';
import SearchView from '../views/SearchView';
import MypageView from '../views/MypageView';

import checkEnterKeypress from '../fn/checkEnterKeypress';

const feedViewTmpl = require('../../../templates/home/_partials/homeView.ejs');
const mypageViewTmpl = require('../../../templates/home/_partials/mypageView.ejs');
const searchViewTmpl = require('../../../templates/home/_partials/searchView.ejs');


export default class HeaderView extends BaseView<IAppStatus, IAlbum> {
  model: AppStatusModel;
  collection: AlbumModel[];
  private _$searchText: JQuery;
  private _$homeTrigger: JQuery;
  private _$notificationTrigger: JQuery;
  private _$userTrigger: JQuery;
  private _$searchTrigger: JQuery;
  private _homeView: BasePageView;
  private _mypageView: BasePageView;
  private _searchView: BasePageView;
  protected _setEl(): void {
    super._setEl();
    this._$searchText = this._$el.find('.searchText');
    this._$homeTrigger = this._$el.find('.navHome a');
    this._$notificationTrigger = this._$el.find('.navNotification a');
    this._$userTrigger = this._$el.find('.navUser a');
    this._$searchTrigger = this._$el.find('.searchTrigger');
  };
  protected _setEvents(): void {
    this._$homeTrigger.on('click', () => {
      if (this._homeView && this._homeView.status.get.isLoading) { return false; }
      if (this._homeView && !this._homeView.status.get.isLoading) { this._homeView.status.set = { isLoading: true }; }
      this.openPage('#homeView', '');
    });
    this._$userTrigger.on('click', () => {
      if (this._mypageView && this._mypageView.status.get.isLoading) { return false; }
      if (this._mypageView && !this._mypageView.status.get.isLoading) {
        this._mypageView.status.set = { isLoading: true };
        console.log(this._mypageView.status.get.isLoading);
      }
      this.openPage('#mypageView', '');
    });
    this._$searchTrigger.on('click', (e: JQueryEventObject) => {
      if (this._searchView && this._searchView.status.get.isLoading) { return false; }
      if (this._$searchText.val().length > 0) {
        e.preventDefault();
        this.openPage('#searchView', this._$searchText.val());
      }
    });
    this._$searchText.on('keydown keyup', (e: JQueryEventObject) => {
      if (this._searchView && this._searchView.status.get.isLoading) { return false; }
      if (checkEnterKeypress(e) && $(e.currentTarget).val().length > 0) {
        $(e.currentTarget).blur();
        this.openPage('#searchView', $(e.currentTarget).val());
      }
    });
  };
  openPage(id: string, term: string): void {
    const $view = $(id);
    $('.pageView').addClass('hide');
    switch (id) {
      case '#homeView':
        if (this._homeView) { this._homeView.destroy(); }
        $view.append(feedViewTmpl());
        this._homeView = new FeedView({
          el: id,
          model: this.model,
          url: '/api/feed'
        });
        break;
      case '#mypageView':
        if (this._mypageView) { this._mypageView.destroy(); }
        $view.append(mypageViewTmpl());
        this._mypageView = new MypageView({
          el: id,
          model: this.model,
          url: '/api/favs'
        });
        break;
      case '#searchView':
        if (this._searchView) { this._searchView.destroy(); }
        $view.append(searchViewTmpl());
        this.model.set = { term: term };
        this._searchView = new SearchView({
          el: id,
          model: this.model,
          url: 'https://itunes.apple.com/search'
        });
        break;
    }
    $view.removeClass('hide').hide().fadeIn(300);
  }
  resetEvents(): void {
    super.resetEvents();
    this._$homeTrigger.off();
    this._$userTrigger.off();
    this._$searchTrigger.off();
    this._$searchText.off();
  }
}
