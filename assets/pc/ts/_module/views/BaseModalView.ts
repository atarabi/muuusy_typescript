import BaseView = require('../views/BaseView');

const $ = require('jquery');

/**
 * BaseModalView Class Description v2.0.0
 */
abstract class BaseModalView<T> extends BaseView<T> {
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
    this._$inner.on('click', (e: JQueryEventObject) => {
      e.stopPropagation();
    });
    this._$el.on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.close();
    });
    this._$closeTrigger.on('click', (e) => {
      e.preventDefault();
      this.close();
    });
    this.open();
  }
  resetEvents(): void {
    super.resetEvents();
    this._$inner.off();
    this._$closeTrigger.off();
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

export = BaseModalView;
