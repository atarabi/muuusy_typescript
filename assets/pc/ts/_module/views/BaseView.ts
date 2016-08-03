import * as $ from 'jquery';

import BaseModel from '../models/BaseModel';
import StatusModel from '../models/StatusModel';

import IBaseView from '../views/IBaseView';


/**
 * BaseView Class Description v2.0.0
 */
abstract class BaseView<T, T2> {
  model: BaseModel<T>;
  collection: BaseModel<T2>[];
  status: StatusModel = new StatusModel({ isLoading: true });
  protected _el: string;
  protected _$el: JQuery;
  protected _template(args?: { data: {} }): string { return null; };
  constructor(args: IBaseView<T, T2>) {
    if (this._el) { this._$el = $(this._el); }
    if (args) {
      if (args.el) {
        this._el = args.el;
        this._$el = $(args.el);
      }
      this._setOptions(args);
    }
    this.render();
    this._setEl();
    this._setEvents();
    this._setCustomEvents();
    this._setFn();
    this.resetModel();
    this.resetStatus();
  }
  protected _setOptions(args?: IBaseView<T, T2>): void {
    if (args.collection) {
      this.collection = args.collection;
    }else if (args.model) {
      this.model = args.model;
    }
    if (args.template) { this._template = args.template; }
  }
  protected render(): void {
    const templateDataDefault = { data: {} };
    if (this._template(templateDataDefault) !== null) {
      this.remove();
      if (this.collection) {
        let tmpEls = this.collection.map((model) => {
          return this._template({ data: model.get });
        });
        this._$el.append(tmpEls.join(''));
      }else if (this.model) {
        this._$el.append(this._template({ data: this.model.get }));
      }else {
        this._$el.append(this._template(templateDataDefault));
      }
    }
  }
  protected _setEl(): void {
    return;
  }
  protected _setEvents(): void {
    return;
  }
  protected _setCustomEvents(): void {
    return;
  }
  protected _setFn(): void {
    return;
  }
  get el(): string {
    return this._el;
  }
  get $el(): JQuery {
    return this._$el;
  }
  destroy(): void {
    this.resetModel();
    this.resetStatus();
    this.resetEvents();
    this.remove();
  }
  remove(): void {
    this._$el.children().remove();
  }
  resetEvents(): void {
    this.$el.off();
  }
  resetModel(): void {
    let Model = class TempModel extends BaseModel<T>{};
    this.model = new Model();
  }
  resetStatus(): void {
    this.status = new StatusModel({ isLoading: true });
  }
  resetCollection(): void {
    this.collection = [];
  }
}

export default BaseView;
