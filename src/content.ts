function addOpenInAnotherProfileButton(header: HTMLElement, linkUrl: string) {
  if (header.querySelector('.open-in-another-profile-btn')) return;
  const btn = document.createElement('button');
  btn.className = 'open-in-another-profile-btn';
  btn.style.marginLeft = '8px';
  btn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  `;
  btn.onclick = (e) => {
    e.stopPropagation();
    chrome.runtime.sendMessage({ action: 'open-in-another-profile', url: linkUrl });
  };
  header.appendChild(btn);
}

// link-bubble-headerの監視
const observer = new MutationObserver(() => {
  document.querySelectorAll<HTMLElement>('.link-bubble-header').forEach(header => {
    const link = header.querySelector('a');
    if (link && link.href) {
      addOpenInAnotherProfileButton(header, link.href);
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
