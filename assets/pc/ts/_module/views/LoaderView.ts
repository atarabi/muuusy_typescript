import * as $ from 'jquery';

const loaderTmpl = require('../../../templates/_partials/loader.ejs');


export default class LoaderView {
  private $el: JQuery;
  constructor(args: { el: string}) {
    this.$el = $(args.el);
    this.$el.html(loaderTmpl);
  }
  show(): this {
    this.$el.show();
    return this;
  }
  hide(): this {
    this.$el.fadeOut(400);
    return this;
  }
}
