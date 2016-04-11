/// <reference path="../../../lib.d.ts" />

import PageStatusModel = require('./_module/models/PageStatusModel');
import HeaderView = require('./_module/views/HeaderView');
import FeedView = require('./_module/views/FeedView');
import SearchView = require('./_module/views/SearchView');
import MypageView = require('./_module/views/MypageView');

const pageStatusModel = new PageStatusModel();

const homeView = new FeedView({
  el: '#homeView',
  model: pageStatusModel,
  url: '/api/feed'
});

const mypageView = new MypageView({
  el: '#mypageView',
  model: pageStatusModel,
  url: '/api/favs'
});

const searchView = new SearchView({
  el: '#searchView',
  model: pageStatusModel,
  url: 'https://itunes.apple.com/search'
});

const headerView = new HeaderView({
  el: '#header',
  model: pageStatusModel,
  views: {
    homeView: homeView,
    mypageView: mypageView,
    searchView: searchView
  }
});
