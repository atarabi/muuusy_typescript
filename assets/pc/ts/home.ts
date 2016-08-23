/// <reference path="../../../lib.d.ts" />


import AppStatusModel from './_module/models/AppStatusModel';
import HeaderView from './_module/views/HeaderView';

const appStatusModel = new AppStatusModel();

const headerView = new HeaderView({
  el: '#header',
  model: appStatusModel
});
