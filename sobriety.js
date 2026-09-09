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

  // ADD NICOTINE / VAPING AS A REAL MAIN-SCROLL SCENE
  const story=document.querySelector('.story'), stage=document.querySelector('.stage');
  if(story&&stage&&!stage.querySelector('[data-nicotine-scroll]')){
    const nicStyle=document.createElement('style');
    nicStyle.textContent=`
      .nicotine-slide-visual{position:relative;width:min(100%,520px);height:360px;display:block}
      .nic-vape{position:absolute;width:88px;height:208px;border-radius:22px;background:linear-gradient(180deg,#59b0eb,#4e93d4 62%,#20262a);box-shadow:0 18px 32px #0008;transform-origin:center}
      .nic-vape:before{content:'';position:absolute;left:0;right:0;top:0;height:30px;border-radius:22px 22px 12px 12px;background:#1e1f22}
      .nic-vape:after{content:'';position:absolute;left:38px;bottom:18px;width:10px;height:10px;border-radius:50%;background:#8fe2ff;box-shadow:0 0 12px #8fe2ff}
      .nic-vape.a{left:18px;top:26px;transform:rotate(-8deg)}.nic-vape.b{left:132px;top:72px;transform:rotate(4deg) scale(1.08)}.nic-vape.c{left:250px;top:132px;transform:rotate(-10deg) scale(.94)}
      .nic-pouch{position:absolute;right:8px;top:72px;width:205px;height:150px}
      .nic-tin-base{position:absolute;inset:28px 0 0 8px;width:170px;height:108px;border-radius:999px;background:#8ad0c7;box-shadow:0 18px 30px #0008,inset 0 0 0 2px #ffffff1f}
      .nic-tin-lid{position:absolute;right:0;top:0;width:138px;height:88px;border-radius:999px;background:#7ec4bc;box-shadow:0 14px 25px #0007,inset 0 0 0 2px #ffffff1f;transform:rotate(10deg)}
      .nic-p{position:absolute;width:34px;height:18px;border-radius:6px;background:#eef3f3;box-shadow:0 3px 0 #d8e0e0}.nic-p.p1{left:32px;top:58px;transform:rotate(-20deg)}.nic-p.p2{left:60px;top:74px;transform:rotate(18deg)}.nic-p.p3{left:92px;top:60px;transform:rotate(-8deg)}.nic-p.p4{left:118px;top:84px;transform:rotate(25deg)}.nic-p.p5{left:74px;top:96px;transform:rotate(-28deg)}
      @media(max-width:850px){.nicotine-slide-visual{width:min(100%,420px);height:290px}.nic-vape.a{left:0}.nic-vape.b{left:96px}.nic-vape.c{left:198px}.nic-pouch{right:-10px;top:115px;transform:scale(.78);transform-origin:top right}}
    `;
    document.head.appendChild(nicStyle);

    const nicotineScene=document.createElement('article');
    nicotineScene.className='scene';
    nicotineScene.dataset.color='#16495c';
    nicotineScene.setAttribute('data-nicotine-scroll','true');
    nicotineScene.innerHTML=`<div class="copy"><h2>Nicotine / Vaping</h2><p>Nicotine is highly addictive. Vapes and nicotine pouches can deliver nicotine quickly, which can make dependence build fast. Nicotine can affect attention, mood and the developing brain, and people can experience cravings, irritability, anxiety and trouble concentrating when they stop. Vaping can also expose the lungs to chemicals and tiny particles, while nicotine pouches can still lead to dependence even without smoke.</p></div><div class="visual-rail"><div class="obj nicotine-slide-visual"><div class="nic-vape a"></div><div class="nic-vape b"></div><div class="nic-vape c"></div><div class="nic-pouch"><div class="nic-tin-base"></div><div class="nic-tin-lid"></div><span class="nic-p p1"></span><span class="nic-p p2"></span><span class="nic-p p3"></span><span class="nic-p p4"></span><span class="nic-p p5"></span></div></div></div>`;

    const alcoholScene=[...stage.querySelectorAll('.scene')].find(s=>/Alcohol/i.test(s.textContent));
    if(alcoholScene) stage.insertBefore(nicotineScene,alcoholScene); else stage.appendChild(nicotineScene);

    const scenes=[...stage.querySelectorAll('.scene')];
    story.style.height=`${Math.max(14,scenes.length)*100}vh`;
    let busy=0;
    function redraw(){
      const r=story.getBoundingClientRect(),max=Math.max(1,story.offsetHeight-innerHeight),p=Math.max(0,Math.min(1,-r.top/max)),pos=p*(scenes.length-1),active=Math.max(0,Math.min(scenes.length-1,Math.round(pos)));
      stage.style.setProperty('--c',scenes[active].dataset.color||'#7d1d2b');
      scenes.forEach((scene,i)=>{const d=i-pos,a=Math.abs(d);scene.style.opacity=Math.max(0,1-a*1.35);scene.style.visibility=a>1.15?'hidden':'visible';scene.style.transform=`translate3d(0,${d*70}px,0)`;const obj=scene.querySelector('.obj');if(obj){obj.style.opacity=Math.max(0,1-a*1.7);obj.style.transform=`translate3d(${d*55}px,${Math.sin(pos+i)*8}px,${(1-a)*70}px) rotateY(${d*-25}deg) rotateZ(${d*8}deg)`}});busy=0;
    }
    addEventListener('scroll',()=>{if(!busy){busy=1;requestAnimationFrame(redraw)}},{passive:true});addEventListener('resize',redraw);redraw();
  }

  // KEEP WEED / THC AS A GUARANTEED MAIN-SCROLL STOP
  const weedNative=stage&&stage.querySelector('[data-cannabis-scroll]');
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