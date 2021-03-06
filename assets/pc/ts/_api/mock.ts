import * as $ from 'jquery';
require('jquery-mockjax')($, window);

// API Mock
export default function setMock(): void {
  $.mockjax({
    url: '/api/feed',
    proxy: '/js/_api/feed.json',
    // status: 500,
    responseTime: 500
  });
  $.mockjax({
    url: '/api/favs',
    proxy: '/js/_api/favs.json',
    // status: 500,
    responseTime: 500
  });
};
