(() => {
  // LIVE SOBRIETY COUNTER
  const soberSince = new Date('2025-04-17T00:52:12-04:00');
  const root = document.querySelector('#sobriety-live');
  if (root) {
    const units = ['years','months','days','hours','minutes','seconds'];
    const els = Object.fromEntries(units.map(u => [u, root.querySelector(`[data-unit="${u}"]`)]));
    const totalDaysEl = root.querySelector('[data-total-days]');
    const addYears=(d,n)=>{d=new Date(d);d.setFullYear(d.getFullYear()+n);return d};
    const addMonths=(d,n)=>{d=new Date(d);const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);const max=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,max));return d};
    const addDays=(d,n)=>{d=new Date(d);d.setDate(d.getDate()+n);return d};
    function diff(start,end){let c=new Date(start),y=end.getFullYear()-c.getFullYear(),t=addYears(c,y);if(t>end){y--;t=addYears(c,y)}c=t;let m=(end.getFullYear()-c.getFullYear())*12+end.getMonth()-c.getMonth();t=addMonths(c,m);if(t>end){m--;t=addMonths(c,m)}c=t;let days=0;while(addDays(c,1)<=end&&days<32){c=addDays(c,1);days++}let ms=end-c,h=Math.floor(ms/3600000);ms-=h*3600000;let min=Math.floor(ms/60000);ms-=min*60000;let s=Math.floor(ms/1000);return{years:y,months:m,days,hours:h,minutes:min,seconds:s}}
    function tick(){const now=new Date(),d=diff(soberSince,now);units.forEach(u=>{if(!els[u])return;const n=els[u].querySelector('.sobriety-num'),l=els[u].querySelector('.sobriety-label');if(n)n.textContent=d[u];if(l)l.textContent=`${u.slice(0,-1)}${d[u]===1?'':'s'}`});if(totalDaysEl)totalDaysEl.textContent=Math.floor((now-soberSince)/86400000).toLocaleString()}
    tick();setInterval(tick,1000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick()});addEventListener('pageshow',tick);addEventListener('focus',tick);
  }

  // KEEP WEED / THC AS A GUARANTEED MAIN-SCROLL STOP
  const story=document.querySelector('.story'), stage=document.querySelector('.stage'), weedNative=stage&&stage.querySelector('[data-cannabis-scroll]');
  if(story&&stage&&weedNative&&!document.querySelector('#weed-scroll-guarantee')){
    const st=document.createElement('style');st.textContent=`#weed-scroll-guarantee{position:fixed;inset:0;z-index:35;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(250px,.85fr);align-items:center;gap:6vw;padding:11vh 7vw 7vh;background:radial-gradient(circle at 62% 48%,#1f5a34,#07100a 58%);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s linear}#weed-scroll-guarantee.show{opacity:1;visibility:visible}#weed-scroll-guarantee h2{font-size:clamp(50px,8.5vw,128px);line-height:.82;letter-spacing:-.07em;margin:0;text-transform:uppercase}#weed-scroll-guarantee p{max-width:650px;margin:28px 0 0;color:#d2d2d2;line-height:1.65;font-size:clamp(15px,1.3vw,18px)}.weed-force-visual{display:grid;place-items:center;min-height:55vh}.weed-force-leaf{font-size:170px;color:#7bdc8e;animation:weedFloat 3s ease-in-out infinite}@keyframes weedFloat{50%{transform:translateY(-14px) rotate(4deg)}}@media(max-width:850px){#weed-scroll-guarantee{grid-template-columns:1fr;align-content:center}.weed-force-visual{min-height:22vh}.weed-force-leaf{font-size:120px}}`;document.head.appendChild(st);
    const overlay=document.createElement('div');overlay.id='weed-scroll-guarantee';overlay.innerHTML=`<div><h2>Weed / THC</h2><p>Cannabis can affect attention, short-term memory, coordination, reaction time, mood and judgment. High-THC products such as dabs, concentrates and some edibles can feel much stronger than expected and may trigger panic, paranoia or severe confusion in some people. Driving while high is unsafe, and frequent use can become difficult to control for some people.</p></div><div class="weed-force-visual"><div class="weed-force-leaf">☘</div></div>`;document.body.appendChild(overlay);
    const weedStop=()=>{const r=story.getBoundingClientRect(),max=Math.max(1,story.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-r.top/max)),scenes=[...stage.querySelectorAll('.scene')],idx=scenes.indexOf(weedNative);if(idx<0)return;overlay.classList.toggle('show',Math.abs(p*(scenes.length-1)-idx)<0.42)};addEventListener('scroll',()=>requestAnimationFrame(weedStop),{passive:true});addEventListener('resize',weedStop);weedStop();
  }

  // EXTRA RECOVERY COPY; NO EXTRA SONGS
  const recovery=document.querySelector('#my-story');
  if(recovery&&!document.querySelector('#crystal-story-extra')){
    const copy=recovery.querySelector('.recovery-copy'), song=copy&&copy.querySelector('.story-song'), extra=document.createElement('div');
    extra.id='crystal-story-extra';
    extra.innerHTML=`<p>For a long time, using was not just about wanting to get high. It became a way to quiet everything for a while. The problem was that the quiet never lasted. When the high wore off, whatever I was trying not to feel was still there, and addiction kept asking for more.</p><p>There is a point where something that once felt like an escape starts making your world smaller. Your choices start revolving around the next time you can use, the next time you can feel numb, or the next time you can avoid feeling sick, anxious, empty, or overwhelmed.</p><p>Getting sober meant losing the shortcut I had used to escape. I had to learn that cravings are feelings, not commands, and that one terrible night does not have to become a relapse.</p><p>Some days sobriety feels powerful. Other days it is quiet and ordinary: making it through the day, going to sleep sober, waking up and doing it again. Those ordinary days matter too.</p><p>I still count the time because the number means something to me. It is proof that I have kept choosing my life over the thing that was taking it away from me.</p>`;
    if(copy)copy.insertBefore(extra,song||null);
  }

  // GOATCOUNTER ANALYTICS — COUNTS VISITS/SESSIONS, NOT EVERY REFRESH
  if(!document.querySelector('script[data-goatcounter]')){
    window.goatcounter = window.goatcounter || {};
    window.goatcounter.path = () => '/';
    const gc=document.createElement('script');
    gc.setAttribute('data-goatcounter','https://crystal.goatcounter.com/count');
    gc.async=true;
    gc.src='https://gc.zgo.at/count.js';
    document.body.appendChild(gc);
  }

  // VISIBLE PEOPLE REACHED COUNTER
  if(!document.querySelector('#people-reached')){
    const css=document.createElement('style');
    css.textContent=`.people-reached{padding:7vh 6vw;background:linear-gradient(180deg,#090909,#140b10);border-top:1px solid #ffffff18;border-bottom:1px solid #ffffff18}.reach-card{max-width:900px;margin:auto;text-align:center;border:1px solid #ffffff20;border-radius:28px;padding:38px 24px;background:#0c0c0c;box-shadow:0 24px 80px #0006}.reach-eyebrow{color:#ff7487;font-size:11px;font-weight:1000;letter-spacing:.22em}.reach-number{font-size:clamp(70px,14vw,170px);font-weight:1000;line-height:.9;letter-spacing:-.065em;margin:18px 0}.reach-label{font-size:clamp(20px,3vw,34px);font-weight:900}.reach-note{max-width:620px;margin:14px auto 0;color:#888;line-height:1.55;font-size:13px}.reach-live{display:inline-flex;align-items:center;gap:8px;margin-top:18px;padding:8px 11px;border-radius:999px;background:#151515;color:#aaa;font-size:11px;font-weight:800}.reach-dot{width:7px;height:7px;border-radius:50%;background:#73e28b;box-shadow:0 0 12px #73e28b}`;
    document.head.appendChild(css);
    const sec=document.createElement('section');sec.id='people-reached';sec.className='people-reached';
    sec.innerHTML=`<div class="reach-card"><div class="reach-eyebrow">AFTER THE HIGH · LIVE VISITOR COUNT</div><div class="reach-number" id="reach-number">—</div><div class="reach-label">PEOPLE REACHED</div><p class="reach-note">This is based on visits, not every refresh. Reloading the page repeatedly during the same GoatCounter session does not keep adding fake visits.</p><div class="reach-live"><span class="reach-dot"></span><span id="reach-status">Tracking is live</span></div></div>`;
    const share=document.querySelector('#share')||document.querySelector('#share-after-high');
    if(share&&share.parentNode)share.parentNode.insertBefore(sec,share);else document.body.appendChild(sec);

    const number=sec.querySelector('#reach-number'),status=sec.querySelector('#reach-status');
    const loadCount=()=>fetch('https://crystal.goatcounter.com/counter/TOTAL.json',{cache:'no-store'})
      .then(r=>{if(!r.ok)throw new Error('counter unavailable');return r.json()})
      .then(data=>{number.textContent=data.count||'0';status.textContent='Unique-visit tracking is live'})
      .catch(()=>{number.textContent='LIVE';status.textContent='Tracking is live · enable public visitor counts in GoatCounter Settings to show the number'});
    setTimeout(loadCount,1200);
  }
})();