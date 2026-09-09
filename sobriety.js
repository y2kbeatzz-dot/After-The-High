(() => {
  // Keep this file lightweight. Main content, scroll scenes, story, music,
  // vaping, and nicotine quit tools now live directly in index.html.

  // Optional live sobriety counter support for versions of the page that use #sobriety-live.
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
    tick();
    setInterval(tick,1000);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick()});
    addEventListener('pageshow',tick);
    addEventListener('focus',tick);
  }

  // GoatCounter analytics.
  if(!document.querySelector('script[data-goatcounter]')){
    window.goatcounter = window.goatcounter || {};
    window.goatcounter.path = () => '/';
    const gc=document.createElement('script');
    gc.setAttribute('data-goatcounter','https://crystal.goatcounter.com/count');
    gc.async=true;
    gc.src='https://gc.zgo.at/count.js';
    document.body.appendChild(gc);
  }

  // Visible people-reached counter.
  if(!document.querySelector('#people-reached')){
    const css=document.createElement('style');
    css.textContent=`.people-reached{padding:7vh 6vw;background:linear-gradient(180deg,#090909,#140b10);border-top:1px solid #ffffff18;border-bottom:1px solid #ffffff18}.reach-card{max-width:900px;margin:auto;text-align:center;border:1px solid #ffffff20;border-radius:28px;padding:38px 24px;background:#0c0c0c;box-shadow:0 24px 80px #0006}.reach-eyebrow{color:#ff7487;font-size:11px;font-weight:1000;letter-spacing:.22em}.reach-number{font-size:clamp(70px,14vw,170px);font-weight:1000;line-height:.9;letter-spacing:-.065em;margin:18px 0}.reach-label{font-size:clamp(20px,3vw,34px);font-weight:900}.reach-note{max-width:620px;margin:14px auto 0;color:#888;line-height:1.55;font-size:13px}.reach-live{display:inline-flex;align-items:center;gap:8px;margin-top:18px;padding:8px 11px;border-radius:999px;background:#151515;color:#aaa;font-size:11px;font-weight:800}.reach-dot{width:7px;height:7px;border-radius:50%;background:#73e28b;box-shadow:0 0 12px #73e28b}`;
    document.head.appendChild(css);
    const sec=document.createElement('section');
    sec.id='people-reached';
    sec.className='people-reached';
    sec.innerHTML=`<div class="reach-card"><div class="reach-eyebrow">AFTER THE HIGH · LIVE VISITOR COUNT</div><div class="reach-number" id="reach-number">—</div><div class="reach-label">PEOPLE REACHED</div><p class="reach-note">This is based on visits, not every refresh. Reloading repeatedly during the same session does not keep adding fake visits.</p><div class="reach-live"><span class="reach-dot"></span><span id="reach-status">Tracking is live</span></div></div>`;
    const share=document.querySelector('#share');
    if(share&&share.parentNode) share.parentNode.insertBefore(sec,share); else document.body.appendChild(sec);
    const number=sec.querySelector('#reach-number'),status=sec.querySelector('#reach-status');
    setTimeout(()=>fetch('https://crystal.goatcounter.com/counter/TOTAL.json',{cache:'no-store'})
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then(data=>{number.textContent=data.count||'0';status.textContent='Unique-visit tracking is live'})
      .catch(()=>{number.textContent='LIVE';status.textContent='Tracking is live'}),1200);
  }
})();