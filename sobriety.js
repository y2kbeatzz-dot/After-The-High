(() => {
  // ----- LIVE SOBRIETY COUNTER -----
  const soberSince = new Date('2025-04-17T00:52:48-04:00');
  const root = document.querySelector('#sobriety-live');
  if (root) {
    const units = ['years','months','days','hours','minutes','seconds'];
    const els = Object.fromEntries(units.map(u => [u, root.querySelector(`[data-unit="${u}"]`)]));
    const totalDaysEl = root.querySelector('[data-total-days]');
    const addYears=(d,n)=>{d=new Date(d);d.setFullYear(d.getFullYear()+n);return d};
    const addMonths=(d,n)=>{d=new Date(d);const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);const max=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,max));return d};
    const addDays=(d,n)=>{d=new Date(d);d.setDate(d.getDate()+n);return d};
    function diff(start,end){let c=new Date(start),y=end.getFullYear()-c.getFullYear(),t=addYears(c,y);if(t>end){y--;t=addYears(c,y)}c=t;let m=(end.getFullYear()-c.getFullYear())*12+end.getMonth()-c.getMonth();t=addMonths(c,m);if(t>end){m--;t=addMonths(c,m)}c=t;let days=0;while(addDays(c,1)<=end&&days<32){c=addDays(c,1);days++}let ms=end-c,h=Math.floor(ms/3600000);ms-=h*3600000;let min=Math.floor(ms/60000);ms-=min*60000;let s=Math.floor(ms/1000);return{years:y,months:m,days,hours:h,minutes:min,seconds:s}}
    function tick(){const d=diff(soberSince,new Date());units.forEach(u=>{if(!els[u])return;els[u].querySelector('.sobriety-num').textContent=d[u];els[u].querySelector('.sobriety-label').textContent=`${u.slice(0,-1)}${d[u]===1?'':'s'}`});if(totalDaysEl)totalDaysEl.textContent=Math.floor((Date.now()-soberSince)/86400000).toLocaleString()}
    tick();setInterval(tick,1000);
  }

  // ----- ALWAYS-VISIBLE MUSIC BUTTON + CROSS-PLATFORM MODAL -----
  if (document.querySelector('#crystal-music-button')) return;
  const css=document.createElement('style');
  css.textContent=`
  #crystal-music-button{position:fixed;right:18px;bottom:18px;z-index:9999;border:1px solid #ffffff33;background:#fff;color:#111;border-radius:999px;padding:14px 18px;font:800 14px/1 system-ui;box-shadow:0 12px 40px #0008;cursor:pointer}
  #crystal-music-modal{position:fixed;inset:0;z-index:10000;background:#050505f5;display:none;overflow:auto;-webkit-overflow-scrolling:touch;color:#fff;font-family:system-ui}
  #crystal-music-modal.open{display:block}.cm-wrap{max-width:900px;margin:auto;padding:28px 18px 60px}.cm-head{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:20px}.cm-head h2{margin:0;font-size:clamp(34px,7vw,72px);letter-spacing:-.05em}.cm-close{border:1px solid #ffffff33;background:#151515;color:#fff;width:48px;height:48px;border-radius:50%;font-size:24px;cursor:pointer}.cm-track{border:1px solid #ffffff1f;background:#0d0d0d;border-radius:20px;padding:16px;margin:14px 0}.cm-track h3{margin:0 0 10px;font-size:22px}.cm-frame{aspect-ratio:16/9;width:100%;border:0;border-radius:14px;background:#000}.cm-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}.cm-link{display:inline-flex;align-items:center;justify-content:center;padding:11px 14px;border-radius:999px;border:1px solid #ffffff26;background:#151515;color:#fff;text-decoration:none;font-weight:750}.cm-note{color:#999;line-height:1.6;font-size:13px;margin-top:16px}
  @media(max-width:600px){#crystal-music-button{right:12px;bottom:12px;padding:13px 16px}.cm-wrap{padding-top:16px}.cm-head h2{font-size:40px}}
  `;
  document.head.appendChild(css);

  const btn=document.createElement('button');btn.id='crystal-music-button';btn.textContent='♫ MUSIC';btn.setAttribute('aria-label','Open recovery music player');
  const modal=document.createElement('div');modal.id='crystal-music-modal';modal.innerHTML=`
    <div class="cm-wrap">
      <div class="cm-head"><div><div style="color:#ff7487;font-size:11px;font-weight:900;letter-spacing:.18em">RECOVERY SOUNDTRACK</div><h2>J. COLE</h2></div><button class="cm-close" aria-label="Close">×</button></div>
      <div class="cm-track"><h3>Once an Addict (Interlude)</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/uirzHXHpgqM?playsinline=1&rel=0" title="J. Cole - Once an Addict (Interlude)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="cm-links"><a class="cm-link" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=uirzHXHpgqM">YouTube</a><a class="cm-link" target="_blank" rel="noopener" href="https://open.spotify.com/track/0Px86mRlxdB3YqpK6KXWlr">Spotify</a><a class="cm-link" target="_blank" rel="noopener" href="https://music.apple.com/us/song/1373861500">Apple Music</a></div></div>
      <div class="cm-track"><h3>FRIENDS (feat. kiLL edward)</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/4JmZ2PgzTos?playsinline=1&rel=0" title="J. Cole - FRIENDS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="cm-links"><a class="cm-link" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=J.+Cole+FRIENDS+kiLL+edward">YouTube</a><a class="cm-link" target="_blank" rel="noopener" href="https://open.spotify.com/album/4Wv5UAieM1LDEYVq5WmqDd">Spotify</a><a class="cm-link" target="_blank" rel="noopener" href="https://music.apple.com/us/album/kod/1373861481">Apple Music</a></div></div>
      <div class="cm-note">Use the player controls inside each video for play, pause, seeking, volume, fullscreen, and AirPlay/Picture-in-Picture where your browser supports them. On iPhone/iPad and some Android browsers, audio must begin after you tap Play.</div>
    </div>`;
  document.body.append(btn,modal);
  const close=()=>modal.classList.remove('open');
  btn.addEventListener('click',()=>modal.classList.add('open'));
  modal.querySelector('.cm-close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();