document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('profile') as HTMLInputElement;
  const status = document.getElementById('status')!;
  chrome.storage.sync.get('profile', (data) => {
    if (data.profile) input.value = data.profile;
  });
  document.getElementById('save')!.onclick = () => {
    chrome.storage.sync.set({ profile: input.value }, () => {
      status.textContent = '保存しました';
      setTimeout(() => status.textContent = '', 1500);
    });
  };
});
