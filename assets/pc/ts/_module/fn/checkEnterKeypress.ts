// isEnterKeyPress
export default function checkEnterKeypress(e: JQueryEventObject): boolean {
  let isConverting: boolean = false;
  if (e.type === 'keydown') {
    if (e.which === 229) {
      // 日本語入力時 変換中フラグtrue
      isConverting = true;
    }
  }
  if (e.which === 13) {
    if (isConverting) {
      // 日本語変換確定 変換中フラグfasle
      isConverting = false;
    }else if (e.type !== 'keyup') {
      // Enterキー押下時
      return true;
    }
  }
  return false;
};
