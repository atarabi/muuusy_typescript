// ajax
interface AjaxType {
  init(): void;
  getStatus(arg: string): string;
};

const NETWORK_ERROR = '通信エラーです。インターネット回線を確認してください。';

const ajax: AjaxType = {
  init: () => {
    $.ajaxSetup({
      timeout: 35000,
      cache: false
    });
  },
  getStatus: (textStatus) => {
    if (textStatus === 'success') {
      // 通信成功の場合
      status = 'success';
    }else {
      // 通信エラーの場合
      status = 'networkError';
      alert(NETWORK_ERROR);
    }
    return status;
  }
};

export default ajax;
