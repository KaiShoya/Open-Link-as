document.addEventListener('DOMContentLoaded', () => {
  const profileInput = document.getElementById('profile') as HTMLInputElement;
  const status = document.getElementById('status')!;
  const targetSelect = document.getElementById('target-select') as HTMLSelectElement;
  const customInput = document.getElementById('target') as HTMLInputElement;

  // 復元
  chrome.storage.sync.get(['profile', 'target', 'custom'], (data) => {
    if (data.profile) profileInput.value = data.profile;
    if (data.custom) customInput.value = data.custom;
    if (data.target) {
      if (["_blank", "_self", "_parent", "_top"].includes(data.target)) {
        targetSelect.value = data.target;
        customInput.style.display = 'none';
      } else if (data.target === 'profile') {
        targetSelect.value = 'profile';
        profileInput.style.display = '';
        customInput.style.display = 'none';
      } else {
        targetSelect.value = 'custom';
        profileInput.style.display = 'none';
        customInput.style.display = '';
      }
    }
  });

  // select変更時
  targetSelect.addEventListener('change', () => {
    if (targetSelect.value === 'profile') {
      profileInput.style.display = '';
      customInput.style.display = 'none';
      profileInput.focus();
    } else if (targetSelect.value === 'custom') {
      profileInput.style.display = 'none';
      customInput.style.display = '';
      customInput.focus();
    } else {
      profileInput.style.display = 'none';
      customInput.style.display = 'none';
    }
  });

  document.getElementById('save')!.onclick = () => {
    let target = targetSelect.value;
    let custom = customInput.value.trim();
    if (target === 'custom') {
      if (!custom) {
        status.textContent = 'カスタム名を入力してください';
        customInput.focus();
        return;
      }
    }
    chrome.storage.sync.set({ profile: profileInput.value, target, custom: customInput.value }, () => {
      status.textContent = '保存しました';
      setTimeout(() => status.textContent = '', 1500);
    });
  };
});
