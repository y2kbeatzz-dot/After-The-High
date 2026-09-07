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

  // Add cannabis/weed to the MAIN animated scroll sequence.
  const scrollStory = document.querySelector('.story');
  const scrollStage = document.querySelector('.stage');
  if (scrollStory && scrollStage && !scrollStage.querySelector('[data-cannabis-scroll]')) {
    const weedStyle = document.createElement('style');
    weedStyle.textContent = `
      .weed-leaf{width:190px;height:190px;display:grid;place-items:center;position:relative}
      .weed-leaf:before{content:'☘';font-size:175px;line-height:1;color:#7bdc8e;filter:drop-shadow(0 24px 30px #0008);transform:rotate(-8deg)}
      .weed-badge{position:absolute;right:-8px;bottom:18px;background:#101612;border:1px solid #7bdc8e66;color:#bdf5c7;border-radius:999px;padding:9px 12px;font-size:11px;font-weight:900;letter-spacing:.12em}
      @media(max-width:650px){.weed-leaf{width:135px;height:135px}.weed-leaf:before{font-size:125px}}
    `;
    document.head.appendChild(weedStyle);

    const weedScene = document.createElement('article');
    weedScene.className = 'scene';
    weedScene.dataset.color = '#1f5a34';
    weedScene.setAttribute('data-cannabis-scroll','true');
    weedScene.innerHTML = `<div class="copy"><h2>Weed / THC</h2><p>Cannabis can affect attention, short-term memory, coordination, reaction time, mood and judgment. High-THC products such as concentrates, dabs and some edibles can hit much harder than expected and may trigger panic, paranoia or severe confusion in some people. Driving while high is unsafe, and frequent use can become difficult to control for some people.</p></div><div class="visual-rail"><div class="obj weed-leaf"><span class="weed-badge">THC</span></div></div>`;

    const alcoholScene = [...scrollStage.querySelectorAll('.scene')].find(s => /Alcohol/i.test(s.textContent));
    if (alcoholScene) scrollStage.insertBefore(weedScene, alcoholScene);
    else scrollStage.appendChild(weedScene);

    // Re-run the scroll animation with the new scene included.
    // This handler is registered after the original one, so it becomes the final visual state each frame.
    const allScenes = [...scrollStage.querySelectorAll('.scene')];
    scrollStory.style.height = `${allScenes.length * 100}vh`;
    let weedBusy = 0;
    function drawAll(){
      const r = scrollStory.getBoundingClientRect();
      const p = Math.max(0,Math.min(1,-r.top/Math.max(1,scrollStory.offsetHeight-innerHeight)));
      const pos = p*(allScenes.length-1);
      const active = Math.max(0,Math.min(allScenes.length-1,Math.round(pos)));
      scrollStage.style.setProperty('--c',allScenes[active].dataset.color || '#7d1d2b');
      allScenes.forEach((scene,i)=>{
        const d=i-pos,a=Math.abs(d);
        scene.style.opacity=Math.max(0,1-a*1.35);
        scene.style.visibility=a>1.15?'hidden':'visible';
        scene.style.transform=`translate3d(0,${d*70}px,0)`;
        const obj=scene.querySelector('.obj');
        if(obj){
          obj.style.opacity=Math.max(0,1-a*1.7);
          obj.style.transform=`translate3d(${d*55}px,${Math.sin(pos+i)*8}px,${(1-a)*70}px) rotateY(${d*-25}deg) rotateZ(${d*8}deg)`;
        }
      });
      weedBusy=0;
    }
    addEventListener('scroll',()=>{if(!weedBusy){weedBusy=1;requestAnimationFrame(drawAll)}},{passive:true});
    addEventListener('resize',drawAll);
    drawAll();
  }

  // Expand Crystal's story without creating another song card.
  // The only song inside MY STORY remains Juice WRLD — Lean Wit Me.
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

  // Dedicated cannabis / weed section so it is not buried in one small card.
  const catalog = document.querySelector('#all-drugs');
  if (catalog && !document.querySelector('#cannabis-focus')) {
    const cannabisStyle = document.createElement('style');
    cannabisStyle.textContent = `
      .cannabis-focus{padding:11vh 6vw;background:linear-gradient(180deg,#07110b,#0d2115 48%,#080808);border-top:1px solid #ffffff18;border-bottom:1px solid #ffffff18}
      .cannabis-focus h2{font-size:clamp(55px,9vw,128px);line-height:.84;letter-spacing:-.06em;margin:0 0 24px}
      .cannabis-intro{max-width:850px;color:#c9c9c9;font-size:clamp(17px,1.6vw,21px);line-height:1.75;margin-bottom:38px}
      .cannabis-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:12px}
      .cannabis-card{border:1px solid #ffffff1c;background:#0b100d;padding:24px;min-height:200px}
      .cannabis-card small{display:block;color:#7ddc9a;font-weight:900;letter-spacing:.14em;font-size:10px;margin-bottom:10px}
      .cannabis-card b{display:block;font-size:22px;margin-bottom:10px}.cannabis-card p{color:#aaa;line-height:1.6;margin:0}
      .cannabis-note{max-width:850px;margin-top:28px;color:#888;line-height:1.65;font-size:14px}
    `;
    document.head.appendChild(cannabisStyle);
    const section = document.createElement('section');
    section.id = 'cannabis-focus';
    section.className = 'cannabis-focus';
    section.innerHTML = `
      <div class="eyebrow" style="color:#7ddc9a">CANNABIS / WEED</div>
      <h2>WEED COUNTS<br>TOO.</h2>
      <p class="cannabis-intro">Cannabis is often talked about like it cannot cause problems because its overdose risk is different from opioids or other drugs. But it can still affect memory, reaction time, coordination, judgment, anxiety, mood, and daily functioning. Higher-THC products can produce much stronger effects than people expect.</p>
      <div class="cannabis-grid">
        <div class="cannabis-card"><small>CANNABIS</small><b>Marijuana / Weed / Flower</b><p>THC can impair attention, short-term memory, coordination and reaction time. Some people experience anxiety, panic, paranoia or confusion.</p></div>
        <div class="cannabis-card"><small>EDIBLES</small><b>Gummies / Brownies / Drinks</b><p>Edibles can take longer to feel and may last much longer than inhaled cannabis. That delay can lead people to take more before the first dose has fully taken effect.</p></div>
        <div class="cannabis-card"><small>HIGH THC</small><b>Dabs / Wax / Shatter / Concentrates</b><p>Concentrates can contain far more THC than traditional flower. Stronger exposure can increase the chance of panic, severe intoxication, vomiting or psychotic-like symptoms in some people.</p></div>
        <div class="cannabis-card"><small>VAPES</small><b>THC Carts / Pens</b><p>Potency can vary widely, and unregulated products may contain unexpected ingredients or contaminants. THC still impairs driving and reaction time even when it is vaped.</p></div>
        <div class="cannabis-card"><small>DEPENDENCE</small><b>Cannabis Use Disorder</b><p>Some people develop tolerance, cravings and difficulty cutting down even when cannabis is causing problems with school, work, relationships, sleep or motivation.</p></div>
        <div class="cannabis-card"><small>CHS</small><b>Cannabinoid Hyperemesis Syndrome</b><p>Long-term frequent cannabis use can be linked to repeated severe nausea and vomiting in some people. Symptoms can become serious enough to require medical care.</p></div>
        <div class="cannabis-card"><small>MENTAL HEALTH</small><b>Anxiety / Panic / Psychosis Risk</b><p>High doses can trigger intense anxiety, panic or paranoia. Cannabis may also worsen psychotic symptoms in vulnerable people, especially with frequent high-THC use.</p></div>
        <div class="cannabis-card"><small>SYNTHETIC</small><b>K2 / Spice</b><p>Synthetic cannabinoids are not the same as cannabis. Their effects can be far more unpredictable and may include seizures, severe agitation, psychosis, heart problems or loss of consciousness.</p></div>
        <div class="cannabis-card"><small>SAFETY</small><b>Driving / Mixing</b><p>Driving while high is unsafe because cannabis affects attention, coordination and reaction time. Mixing cannabis with alcohol or other drugs can increase impairment and unpredictability.</p></div>
      </div>
      <p class="cannabis-note">This section is about risk and awareness, not saying cannabis affects everyone the same way. Product strength, frequency of use, age, mental-health vulnerability, other substances and individual biology can all change the experience.</p>`;
    catalog.parentNode.insertBefore(section, catalog);
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