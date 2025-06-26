// content scriptからのメッセージを受けて、ネイティブメッセージング経由でプロファイル指定起動
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.action === 'open-in-another-profile' && message.url) {
    chrome.storage.sync.get('profile', (data) => {
      const profile = data.profile || 'Profile 2';
      chrome.runtime.sendNativeMessage(
        'com.kaishoya.openlinkprofile',
        { url: message.url, profile },
        function (_response) {
        }
      );
    });
  }
});
