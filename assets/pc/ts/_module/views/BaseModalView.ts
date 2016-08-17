import * as $ from 'jquery';

import BaseView from '../views/BaseView';


/**
 * BaseModalView Class Description v2.0.0
 */
abstract class BaseModalView<T, T2> extends BaseView<T, T2> {
  private _$wrapper: JQuery;
  private _$inner: JQuery;
  private _$closeTrigger: JQuery;
  private _fadeSpeed = 300;
  protected _setEl(): void {
    super._setEl();
    this._$wrapper = this._$el.find('.jsModalWrapper');
    this._$inner = this._$el.find('.jsModalInner');
    this._$closeTrigger = this._$el.find('.jsModalCloseTrigger');
  }
  protected _setEvents(): void {
    this._$inner.on('click', (e: JQueryEventObject) => e.stopPropagation());
    this._$el.on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.close();
    });
    this._$closeTrigger.on('click', (e) => {
      e.preventDefault();
      this.close();
    });
  }
  resetEvents(): void {
    super.resetEvents();
    this._$inner.off();
    this._$closeTrigger.off();
  }
  protected _setFn() {
    super._setFn();
    this.open();
  }
  open(): void {
    this._$wrapper.hide().fadeIn(this._fadeSpeed);
    this._$el.hide().removeClass('hide').show();
    $('html').css('overflowY', 'scroll');
    $('body').css('overflowY', 'hidden');
  }
  close(): void {
    this._$wrapper.fadeOut(this._fadeSpeed, () => {
      this._$el.hide();
      $('html').css('overflowY', 'hidden');
      $('body').css('overflowY', 'scroll');
    });
  }
}

export default BaseModalView;
