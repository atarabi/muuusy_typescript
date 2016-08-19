import * as $ from 'jquery';

import BaseView from '../../views/abstruct/BaseView';


abstract class BaseModalView<T, T2> extends BaseView<T, T2> {
  private $wrapper: JQuery;
  private $inner: JQuery;
  private $closeTrigger: JQuery;
  private fadeSpeed = 300;
  protected setEl(): this {
    super.setEl();
    this.$wrapper = this.$el.find('.jsModalWrapper');
    this.$inner = this.$el.find('.jsModalInner');
    this.$closeTrigger = this.$el.find('.jsModalCloseTrigger');
    return this;
  }
  protected setEvents(): this {
    super.setEvents();
    this.$inner.on('click', (e: JQueryEventObject) => e.stopPropagation());
    this.$el.on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.close();
    });
    this.$closeTrigger.on('click', (e: JQueryEventObject) => {
      e.preventDefault();
      this.close();
    });
    return this;
  }
  protected resetEvents(): this {
    super.resetEvents();
    this.$inner.off();
    this.$closeTrigger.off();
    return this;
  }
  protected setFn(): this {
    super.setFn();
    this.open();
    return this;
  }
  protected open(): void {
    this.$wrapper.hide().fadeIn(this.fadeSpeed);
    this.$el.hide().removeClass('hide').show();
    $('html').css('overflowY', 'scroll');
    $('body').css('overflowY', 'hidden');
  }
  protected close(): void {
    this.$wrapper.fadeOut(this.fadeSpeed, () => {
      this.$el.hide();
      $('html').css('overflowY', 'hidden');
      $('body').css('overflowY', 'scroll');
    });
  }
}

export default BaseModalView;
