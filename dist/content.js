function r(e,n){if(e.querySelector(".open-in-another-profile-btn"))return;const o=document.createElement("button");o.className="open-in-another-profile-btn",o.style.marginLeft="8px",o.innerHTML=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  `,o.onclick=t=>{t.stopPropagation(),chrome.runtime.sendMessage({action:"open-in-another-profile",url:n})},e.appendChild(o)}const i=new MutationObserver(()=>{document.querySelectorAll(".link-bubble-header").forEach(e=>{const n=e.querySelector("a");n&&n.href&&r(e,n.href)})});i.observe(document.body,{childList:!0,subtree:!0});
