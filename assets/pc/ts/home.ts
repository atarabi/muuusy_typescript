/// <reference path="../../../lib.d.ts" />

import AppStatusModel = require('./_module/models/AppStatusModel');
import HeaderView = require('./_module/views/HeaderView');
import FeedView = require('./_module/views/FeedView');
import SearchView = require('./_module/views/SearchView');
import MypageView = require('./_module/views/MypageView');

const appStatusModel: AppStatusModel = new AppStatusModel();

const homeView: FeedView = new FeedView({
  el: '#homeView',
  model: appStatusModel,
  url: '/api/feed'
});

const mypageView: MypageView = new MypageView({
  el: '#mypageView',
  model: appStatusModel,
  url: '/api/favs'
});

const searchView: SearchView = new SearchView({
  el: '#searchView',
  model: appStatusModel,
  url: 'https://itunes.apple.com/search'
});

const headerView: HeaderView = new HeaderView({
  el: '#header',
  model: appStatusModel,
  views: {
    homeView: homeView,
    mypageView: mypageView,
    searchView: searchView
  }
});