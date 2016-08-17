const loaderTmpl = require('../../../templates/_partials/loader.ejs');
import * as $ from 'jquery';

export default class LoaderView {
  private $el: JQuery;
  constructor(args: { el: string}) {
    this.$el = $(args.el);
    this.$el.html(loaderTmpl);
  }
  show() {
    this.$el.show();
  }
  hide() {
    this.$el.fadeOut(400);
  }
}
