import HeaderViewArgsType = require('../interfaces/HeaderViewArgsType');
import PageStatusType = require('../interfaces/PageStatusType');

import PageStatusModel = require('../models/PageStatusModel');
import BaseView = require('../views/BaseView');
import BasePageView = require('../views/BasePageView');

const $ = require('jquery');
const checkEnterKeypress = require('../fn/checkEnterKeypress');

// 記事情報やページ全体のView
class HeaderView extends BaseView<PageStatusType> {
  model: PageStatusModel;
  collection: PageStatusModel[];
  private _$searchText: JQuery;
  private _$homeTrigger: JQuery;
  private _$notificationTrigger: JQuery;
  private _$userTrigger: JQuery;
  private _$searchTrigger: JQuery;
  private _views: {
    homeView: BasePageView;
    mypageView: BasePageView;
    searchView: BasePageView;
  };
  constructor(args: HeaderViewArgsType) {
    super(args);
  }
  protected _setOptions(args?: HeaderViewArgsType): void {
    super._setOptions(args);
    this._views = args.views;
  }
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
      this.movePage($(this), 'home');
      this._views.homeView.$el.trigger('onOpen');
    });
    this._$userTrigger.on('click', () => {
      this.movePage($(this), 'mypage');
      this._views.mypageView.$el.trigger('onOpen');
    });
    this._$searchTrigger.on('click', (e: JQueryEventObject) => {
      if (this._$searchText.val().length > 0) {
        this.movePage($(e.target), 'search');
        e.preventDefault();
        let keyword = this._$searchText.val();
        this._views.searchView.$el.trigger('onOpen', [keyword]);
      }
    });
    this._$searchText.on('keydown keyup', (e: JQueryEventObject) => {
      if (checkEnterKeypress(e) && $(e.target).val().length > 0) {
        this.movePage($(e.target), 'search');
        let keyword = this._$searchText.val();
        this._views.searchView.$el.trigger('onOpen', [keyword]);
        $(e.target).blur();
      }
    });
  };
  protected movePage($tgt: JQuery, pageName: string): void {
    $('.pageView').addClass('hide');
    if (pageName === 'home') {
      $('#homeView').removeClass('hide').hide().fadeIn(300);
    }else if (pageName === 'mypage') {
      $('#mypageView').removeClass('hide').hide().fadeIn(300);
    }else if (pageName === 'search') {
      $('#searchView').removeClass('hide').hide().fadeIn(300);
    }
  }
  resetEvents(): void {
    super.resetEvents();
    this._$homeTrigger.off();
    this._$userTrigger.off();
    this._$searchTrigger.off();
    this._$searchText.off();
  }
}

export = HeaderView;
