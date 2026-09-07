(() => {
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

  // Expand Crystal's story without creating a second song card.
  const recovery = document.querySelector('#my-story');
  if (recovery && !document.querySelector('#crystal-story-extra')) {
    const copy = recovery.querySelector('.recovery-copy');
    const song = copy && copy.querySelector('.story-song');
    const extra = document.createElement('div');
    extra.id = 'crystal-story-extra';
    extra.innerHTML = `
      <p>For a long time, using was not just about wanting to get high. It became a way to quiet everything for a while. The problem was that the quiet never lasted. When the high wore off, whatever I was trying not to feel was still there, and addiction kept asking for more.</p>
      <p>There is a point where something that once felt like an escape starts making your world smaller. Your choices start revolving around the next time you can use, the next time you can feel numb, or the next time you can avoid feeling sick, anxious, empty, or overwhelmed. That is the part people do not always see from the outside.</p>
      <p>Getting sober meant losing the shortcut I had used to escape. I had to learn that cravings are feelings, not commands. I had to learn that one terrible night does not have to become a relapse and that being uncomfortable does not mean I am failing at recovery.</p>
      <p>Some days sobriety feels powerful. Other days it is quiet and ordinary: making it through the day, going to sleep sober, waking up and doing it again. Those ordinary days matter just as much, because recovery is built out of them.</p>
      <p>I still count the time because the number means something to me. It is not about pretending everything is fixed. It is proof that I have kept choosing my life over the thing that was taking it away from me. Every hour on that counter is time I got back.</p>
      <p>I also know recovery is not the same for everyone. Some people have years. Some have hours. Some relapse and come back. I do not think somebody's story stops mattering because their counter restarted. What matters is that there is still a person there who can keep going.</p>`;
    if (copy) copy.insertBefore(extra, song || null);
  }

  if (document.querySelector('#crystal-music-button')) return;
  const css=document.createElement('style');
  css.textContent=`#crystal-music-button{position:fixed;right:18px;bottom:18px;z-index:9999;border:1px solid #ffffff33;background:#fff;color:#111;border-radius:999px;padding:14px 18px;font:800 14px/1 system-ui;box-shadow:0 12px 40px #0008;cursor:pointer}#crystal-music-modal{position:fixed;inset:0;z-index:10000;background:#050505f5;display:none;overflow:auto;-webkit-overflow-scrolling:touch;color:#fff;font-family:system-ui}#crystal-music-modal.open{display:block}.cm-wrap{max-width:920px;margin:auto;padding:28px 18px 60px}.cm-head{display:flex;justify-content:space-between;gap:16px;align-items:center;margin-bottom:20px}.cm-head h2{margin:0;font-size:clamp(34px,7vw,72px);letter-spacing:-.05em}.cm-close{border:1px solid #ffffff33;background:#151515;color:#fff;width:48px;height:48px;border-radius:50%;font-size:24px;cursor:pointer}.cm-artist{margin:34px 0 12px;color:#ff7487;font-size:12px;font-weight:900;letter-spacing:.18em}.cm-track{border:1px solid #ffffff1f;background:#0d0d0d;border-radius:20px;padding:16px;margin:14px 0}.cm-track h3{margin:0 0 10px;font-size:22px}.cm-frame{aspect-ratio:16/9;width:100%;border:0;border-radius:14px;background:#000}.cm-note{color:#999;line-height:1.6;font-size:13px;margin-top:16px}@media(max-width:600px){#crystal-music-button{right:12px;bottom:12px;padding:13px 16px}.cm-wrap{padding-top:16px}.cm-head h2{font-size:40px}}`;
  document.head.appendChild(css);
  const btn=document.createElement('button');btn.id='crystal-music-button';btn.textContent='♫ MUSIC';btn.setAttribute('aria-label','Open recovery music player');
  const modal=document.createElement('div');modal.id='crystal-music-modal';modal.innerHTML=`<div class="cm-wrap"><div class="cm-head"><div><div style="color:#ff7487;font-size:11px;font-weight:900;letter-spacing:.18em">RECOVERY SOUNDTRACK</div><h2>MUSIC</h2></div><button class="cm-close" aria-label="Close">×</button></div><div class="cm-artist">J. COLE</div><div class="cm-track"><h3>Once an Addict (Interlude)</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/uirzHXHpgqM?playsinline=1&rel=0" title="J. Cole - Once an Addict"></iframe></div><div class="cm-track"><h3>FRIENDS</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/4JmZ2PgzTos?playsinline=1&rel=0" title="J. Cole - FRIENDS"></iframe></div><div class="cm-artist">JUICE WRLD</div><div class="cm-track"><h3>Lean Wit Me</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/5SejM_hBvMM?playsinline=1&rel=0" title="Juice WRLD - Lean Wit Me"></iframe></div><div class="cm-track"><h3>Wishing Well</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/C5i-UnuUKUI?playsinline=1&rel=0" title="Juice WRLD - Wishing Well"></iframe></div><div class="cm-artist">LIL PEEP</div><div class="cm-track"><h3>Save That Shit</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/WvV5TbJc9tQ?playsinline=1&rel=0" title="Lil Peep - Save That Shit"></iframe></div><div class="cm-track"><h3>Awful Things</h3><iframe class="cm-frame" loading="lazy" src="https://www.youtube.com/embed/zOujzvtwZ6M?playsinline=1&rel=0" title="Lil Peep - Awful Things"></iframe></div><div class="cm-note">Tap a player to play or pause. Mobile browsers may require one tap before audio can start.</div></div>`;
  document.body.append(btn,modal);
  const close=()=>modal.classList.remove('open');
  btn.addEventListener('click',()=>modal.classList.add('open'));
  modal.querySelector('.cm-close').addEventListener('click',close);
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();