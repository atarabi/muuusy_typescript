import * as $ from 'jquery';
import { EventEmitter2 } from 'eventemitter2';

import BaseModel from '../../models/abstruct/BaseModel';
import StatusModel from '../../models/StatusModel';

import IBaseView from '../../views/interface/IBaseView';


abstract class BaseView<T, T2> {
  model: BaseModel<T>;
  collection: BaseModel<T2>[];
  status: StatusModel = new StatusModel({ isLoading: true });
  observer: EventEmitter2;
  protected _el: string;
  protected _$el: JQuery;
  protected template(args?: { data: {} }): string { return null; };
  constructor(args: IBaseView<T, T2>) {
    if (this._el) { this._$el = $(this._el); }
    if (args.el) {
      this._el = args.el;
      this._$el = $(args.el);
    }
    if (args) { this.setOptions(args); }
    this.render().setEl().setEvents().setCustomEvents().setFn();
  }
  protected setOptions(args?: IBaseView<T, T2>): this {
    this.collection = args.collection || this.collection;
    this.model = args.model || this.model;
    this.template = args.template || this.template;
    this.observer = new EventEmitter2({
      wildcard: true,
      delimiter: '::',
      newListener: false,
      maxListeners: 20
    });
    return this;
  }
  protected render(): this {
    const templateDataDefault = { data: {} };
    if (this.template(templateDataDefault) !== null) {
      this.remove();
      if (this.collection) {
        let tmpEls = this.collection.map((model) => { return this.template({ data: model.get }); });
        this.$el.append(tmpEls.join(''));
      }else if (this.model) {
        this.$el.append(this.template({ data: this.model.get }));
      }else {
        this.$el.append(this.template(templateDataDefault));
      }
    }
    return this;
  }
  protected setEl(): this { return this; }
  protected setEvents(): this { return this; }
  protected setCustomEvents(): this { return this; }
  protected setFn(): this { return this; }
  get el(): string { return this._el; }
  get $el(): JQuery { return this._$el; }
  destroy(): void {
    this.resetEvents().remove();
    return;
  }
  protected remove(): this {
    this.$el.children().remove();
    return this;
  }
  protected resetEvents(): this {
    this.$el.off();
    return this;
  }
  protected resetCollection(): this {
    this.collection = [];
    return this;
  }
}

export default BaseView;
