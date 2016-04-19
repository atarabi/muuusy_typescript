import BaseModel = require('../models/BaseModel');
import StatusModel = require('../models/StatusModel');

import IBaseView = require('../views/IBaseView');

const $ = jQuery = require('jquery');
const _ = require('lodash');

/**
 * BaseView Class Description v2.0.0
 */
abstract class BaseView<T> {
  model: BaseModel<T>;
  collection: BaseModel<T>[];
  status: StatusModel = new StatusModel({ isLoading: true });
  protected _el: string;
  protected _$el: JQuery;
  protected _template(args?: { data: {} }): string { return null; };
  private _deferredOptions: JQueryDeferred<void> = jQuery.Deferred<void>();
  private _deferredRender: JQueryDeferred<void> = jQuery.Deferred<void>();
  private _deferredSetEl: JQueryDeferred<void> = jQuery.Deferred<void>();
  constructor(args: IBaseView<T>) {
    if (this._el) { this._$el = $(this._el); }
    if (args) {
      if (args.el) {
        this._el = args.el;
        this._$el = $(args.el);
      }
      this._setOptions(args);
    }else {
      this._deferredOptions.resolve();
    }
    this._deferredOptions.promise().then(() => {
      this.render();
      return this._deferredRender.promise();
    }).then(() => {
      this._setEl();
      return this._deferredSetEl.promise();
    }).then(() => {
      this._setEvents();
      this._setCustomEvents();
      this._setFn();
      this.resetModel();
      this.resetStatus();
    });
  }
  protected _setOptions(args?: IBaseView<T>): void {
    if (args.collection) {
      this.collection = args.collection;
    }else if (args.model) {
      this.model = args.model;
    }
    if (args.template) { this._template = args.template; }
    this._deferredOptions.resolve();
  }
  protected render(): void {
    const templateDataDefault = { data: {} };
    if (this._template(templateDataDefault) !== null) {
      this.remove();
      if (this.collection) {
        let tmpEls = [];
        _.each(this.collection, (model) => {
          const el = this._template({ data: model.get });
          tmpEls.push(el);
        });
        this._$el.append(tmpEls.join(''));
      }else if (this.model) {
        this._$el.append(this._template({ data: this.model.get }));
      }else {
        this._$el.append(this._template(templateDataDefault));
      }
    }
    this._deferredRender.resolve();
  }
  protected _setEl(): void {
    this._deferredSetEl.resolve();
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

export = BaseView;