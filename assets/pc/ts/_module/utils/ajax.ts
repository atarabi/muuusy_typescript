// ajax
interface AjaxType {
  NETWORK_ERROR: string;
  init(): void;
  getStatus(arg: string): string;
};

const ajax: AjaxType = {
  NETWORK_ERROR: '通信エラーです。インターネット回線を確認してください。',
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
      alert(this.NETWORK_ERROR);
    }
    return status;
  }
};

export default ajax;
