import BaseView = require('./BaseView');

const $ = require('jquery');

/**
 * BaseModalView Class Description v1.3.0
 * @fileoverview モーダルウィンドウのベースとなるopne/close機能を持ったクラス。デフォルトでfadeIn/fadeOutするので調整可能。BaseViewを継承。
 *    対応ブラウザはPCのモダンブラウザ（IE8以上）
 */
abstract class BaseModalView<T> extends BaseView<T> {
  private _$wrapper: JQuery;
  private _$inner: JQuery;
  private _$closeTrigger: JQuery;
  private _fadeSpeed = 300; // fadeしたくない場合は0
  protected _setEl(): void {
    super._setEl();
    this._$wrapper = this._$el.find('.jsModalWrapper');
    this._$inner = this._$el.find('.jsModalInner');
    this._$closeTrigger = this._$el.find('.jsModalCloseTrigger');
  }
  protected _setEvents(): void {
    this._$inner.on('click', (e: JQueryEventObject) => {
      // $elイベントのバブリングを停止
      e.stopPropagation();
    });
    this._$el.on('click', (e: JQueryEventObject) => {
      // 背景を押したら閉じるイベントハンドラ
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
