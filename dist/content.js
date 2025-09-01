function s(o,e){if(o.querySelector(".open-in-another-profile-btn"))return;const t=document.createElement("button");t.className="open-in-another-profile-btn",t.style.marginLeft="8px",t.innerHTML=`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  `,t.onclick=async i=>{i.stopPropagation(),chrome.storage.sync.get(["target","custom"],n=>{if(n.target==="custom"&&n.custom){const r=window.open("",n.custom);r?(r.location.href="about:blank",setTimeout(()=>{try{r.location.href=e,r.focus()}catch{window.open(e,n.custom)}},100)):window.open(e,n.custom)}else chrome.runtime.sendMessage({action:"open-in-another-profile",url:e})})},o.appendChild(t)}const c=new MutationObserver(()=>{document.querySelectorAll(".link-bubble-header").forEach(o=>{const e=o.querySelector("a");e&&e.href&&s(o,e.href)})});c.observe(document.body,{childList:!0,subtree:!0});
