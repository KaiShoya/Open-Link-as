// content scriptからのメッセージを受けて、ネイティブメッセージング経由でプロファイル指定起動
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.action === 'open-in-another-profile' && message.url) {
    chrome.storage.sync.get(['profile', 'target', 'custom'], (data) => {
      if (data.target === 'profile') {
        const profile = data.profile || 'Profile 2';
        chrome.runtime.sendNativeMessage(
          'com.kaishoya.openlinkprofile',
          { url: message.url, profile },
          function (_response) {
          }
        );
      } else if (data.target === '_blank') {
        chrome.tabs.create({ url: message.url });
      } else if (data.target === '_self') {
        chrome.tabs.update({ url: message.url });
      } else {
        chrome.tabs.create({ url: message.url });
        // chrome.windows.create({ url: message.url });
      }
    });
  }
});
