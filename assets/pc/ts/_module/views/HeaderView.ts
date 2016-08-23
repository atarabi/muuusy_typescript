import * as $ from 'jquery';

import IAppStatus from '../models/interface/IAppStatus';
import IAlbum from '../models/interface/IAlbum';
import AppStatusModel from '../models/AppStatusModel';
import AlbumModel from '../models/AlbumModel';

import BaseView from '../views/abstruct/BaseView';
import PageView from '../views/PageView';

import checkEnterKeypress from '../fn/checkEnterKeypress';

const feedViewTmpl = require('../../../templates/home/_partials/homeView.ejs');
const mypageViewTmpl = require('../../../templates/home/_partials/mypageView.ejs');
const searchViewTmpl = require('../../../templates/home/_partials/searchView.ejs');

interface IParamas {
  hash: string;
  term: string;
}

export default class HeaderView extends BaseView<IAppStatus, IAlbum> {
  private $searchText: JQuery;
  private $homeTrigger: JQuery;
  private $notificationTrigger: JQuery;
  private $userTrigger: JQuery;
  private $searchTrigger: JQuery;
  private homeView: PageView;
  private mypageView: PageView;
  private searchView: PageView;
  protected setEl(): this {
    super.setEl();
    this.$searchText = this.$el.find('.searchText');
    this.$homeTrigger = this.$el.find('.navHome a');
    this.$notificationTrigger = this.$el.find('.navNotification a');
    this.$userTrigger = this.$el.find('.navUser a');
    this.$searchTrigger = this.$el.find('.searchTrigger');
    return this;
  };
  protected setEvents(): this {
    super.setEvents();
    this.$homeTrigger.on('click', () => {
      if (this.homeView && this.homeView.status.get.isLoading) { return false; }
      if (this.homeView && !this.homeView.status.get.isLoading) { this.homeView.status.set = { isLoading: true }; }
      this.openPage('#homeView', '');
    });
    this.$userTrigger.on('click', () => {
      if (this.mypageView && this.mypageView.status.get.isLoading) { return false; }
      if (this.mypageView && !this.mypageView.status.get.isLoading) {
        this.mypageView.status.set = { isLoading: true };
      }
      this.openPage('#mypageView', '');
    });
    this.$searchTrigger.on('click', (e: JQueryEventObject) => {
      if (this.searchView && this.searchView.status.get.isLoading) { return false; }
      if (this.$searchText.val().length > 0) {
        e.preventDefault();
        location.hash =  'search&term=' + this.$searchText.val();
        this.openPage('#searchView', this.$searchText.val());
      }
    });
    this.$searchText.on('keydown keyup', (e: JQueryEventObject) => {
      if (this.searchView && this.searchView.status.get.isLoading) { return false; }
      if (checkEnterKeypress(e) && $(e.currentTarget).val().length > 0) {
        $(e.currentTarget).blur();
        location.hash =  'search&term=' + $(e.currentTarget).val();
        this.openPage('#searchView', $(e.currentTarget).val());
      }
    });
    return this;
  };
  protected resetEvents(): this {
    super.resetEvents();
    this.$homeTrigger.off();
    this.$userTrigger.off();
    this.$searchTrigger.off();
    this.$searchText.off();
    return this;
  }
  protected setFn(): this {
    super.setFn();
    this.routing();
    return this;
  }
  routing(): this {
    const params: IParamas = this.parseParam(location.hash);
    console.log(params);
    switch (params.hash) {
      case 'mypage':
        this.openPage('#mypageView', '');
        break;
      case 'search':
        this.$searchText.val(params.term);
        this.openPage('#searchView', this.$searchText.val());
        break;
      default:
        this.openPage('#homeView', '');
        break;
    }
    return this;
  }
  parseParam(param: string): IParamas {
    const params = param.split('&');
    let newParams: IParamas = { hash: '', term: '' };
    params.forEach((param) => {
      if (param.charAt(0) === '#') {
        const paramArray = param.split('#');
        newParams.hash = paramArray[1];
      } else {
        const paramArray = param.split('=');
        if (!paramArray[1]) { return; }
        newParams[paramArray[0]] = paramArray[1];
      }
    });
    return newParams;
  }
  openPage(id: string, term: string): void {
    const $view = $(id);
    $('.pageView').addClass('hide');
    switch (id) {
      case '#homeView':
        if (this.homeView) { this.homeView.destroy(); }
        $view.append(feedViewTmpl());
        this.homeView = new PageView({
          el: id,
          model: this.model,
          url: '/api/feed'
        });
        break;
      case '#mypageView':
        if (this.mypageView) { this.mypageView.destroy(); }
        $view.append(mypageViewTmpl());
        this.mypageView = new PageView({
          el: id,
          model: this.model,
          url: '/api/favs'
        });
        break;
      case '#searchView':
        if (this.searchView) { this.searchView.destroy(); }
        $view.append(searchViewTmpl());
        this.model.set = { term: term };
        this.searchView = new PageView({
          el: id,
          model: this.model,
          url: 'https://itunes.apple.com/search'
        });
        break;
    }
    $view.removeClass('hide').hide().fadeIn(300);
  }
}
