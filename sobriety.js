(() => {
  // Crystal's sober start time, synced to the Sep 7, 2026 7:28 PM screenshot.
  const soberSince = new Date('2025-04-17T00:52:12-04:00');
  const root = document.querySelector('#sobriety-live');
  if (root) {
    const units=['years','months','days','hours','minutes','seconds'];
    const els=Object.fromEntries(units.map(u=>[u,root.querySelector(`[data-unit="${u}"]`)]));
    const totalDaysEl=root.querySelector('[data-total-days]');
    const addYears=(d,n)=>{d=new Date(d);d.setFullYear(d.getFullYear()+n);return d};
    const addMonths=(d,n)=>{d=new Date(d);const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);const max=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();d.setDate(Math.min(day,max));return d};
    const addDays=(d,n)=>{d=new Date(d);d.setDate(d.getDate()+n);return d};
    function diff(start,end){let c=new Date(start),y=end.getFullYear()-c.getFullYear(),t=addYears(c,y);if(t>end){y--;t=addYears(c,y)}c=t;let m=(end.getFullYear()-c.getFullYear())*12+end.getMonth()-c.getMonth();t=addMonths(c,m);if(t>end){m--;t=addMonths(c,m)}c=t;let days=0;while(addDays(c,1)<=end&&days<32){c=addDays(c,1);days++}let ms=end-c,h=Math.floor(ms/3600000);ms-=h*3600000;let min=Math.floor(ms/60000);ms-=min*60000;let s=Math.floor(ms/1000);return{years:y,months:m,days,hours:h,minutes:min,seconds:s}}
    function tick(){
      const now=new Date();
      const d=diff(soberSince,now);
      units.forEach(u=>{
        if(!els[u])return;
        els[u].querySelector('.sobriety-num').textContent=d[u];
        els[u].querySelector('.sobriety-label').textContent=`${u.slice(0,-1)}${d[u]===1?'':'s'}`;
      });
      if(totalDaysEl)totalDaysEl.textContent=Math.floor((now-soberSince)/86400000).toLocaleString();
    }
    tick();
    setInterval(tick,1000);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick()});
    window.addEventListener('pageshow',tick);
    window.addEventListener('focus',tick);
  }

  const story=document.querySelector('.story');
  const stage=document.querySelector('.stage');
  const weedNative=stage&&stage.querySelector('[data-cannabis-scroll]');
  if(story&&stage&&weedNative){
    const css=document.createElement('style');
    css.textContent=`#weed-scroll-guarantee{position:fixed;inset:0;z-index:35;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(250px,.85fr);align-items:center;gap:6vw;padding:11vh 7vw 7vh;background:radial-gradient(circle at 62% 48%,#1f5a34,#07100a 58%);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .18s linear}#weed-scroll-guarantee.show{opacity:1;visibility:visible}#weed-scroll-guarantee h2{font-size:clamp(50px,8.5vw,128px);line-height:.82;letter-spacing:-.07em;margin:0;text-transform:uppercase}#weed-scroll-guarantee p{max-width:650px;margin:28px 0 0;color:#d2d2d2;line-height:1.65;font-size:clamp(15px,1.3vw,18px)}.weed-force-visual{display:grid;place-items:center;min-height:55vh;position:relative}.weed-force-leaf{font-size:170px;line-height:1;color:#7bdc8e;filter:drop-shadow(0 28px 35px #0009);animation:weedFloat 3s ease-in-out infinite}.weed-force-badge{position:absolute;bottom:26%;right:23%;background:#101612;border:1px solid #7bdc8e66;color:#bdf5c7;border-radius:999px;padding:10px 14px;font-size:11px;font-weight:900;letter-spacing:.12em}@keyframes weedFloat{50%{transform:translateY(-14px) rotate(4deg)}}@media(max-width:850px){#weed-scroll-guarantee{grid-template-columns:1fr;align-content:center;gap:3vh}.weed-force-visual{min-height:22vh}.weed-force-leaf{font-size:120px}.weed-force-badge{bottom:8%;right:35%}}`;
    document.head.appendChild(css);
    const overlay=document.createElement('div');overlay.id='weed-scroll-guarantee';overlay.innerHTML=`<div><h2>Weed / THC</h2><p>Cannabis can affect attention, short-term memory, coordination, reaction time, mood and judgment. High-THC products such as dabs, concentrates and some edibles can feel much stronger than expected and may trigger panic, paranoia or severe confusion in some people. Driving while high is unsafe, and frequent use can become difficult to control for some people.</p></div><div class="weed-force-visual"><div class="weed-force-leaf">☘</div><div class="weed-force-badge">THC</div></div>`;document.body.appendChild(overlay);
    function weedStop(){const r=story.getBoundingClientRect();const max=Math.max(1,story.offsetHeight-innerHeight);const p=Math.max(0,Math.min(1,-r.top/max));const scenes=[...stage.querySelectorAll('.scene')];const weedIndex=scenes.indexOf(weedNative);if(weedIndex<0)return;const pos=p*(scenes.length-1);overlay.classList.toggle('show',Math.abs(pos-weedIndex)<0.42)}
    addEventListener('scroll',()=>requestAnimationFrame(weedStop),{passive:true});addEventListener('resize',weedStop);weedStop();
  }

  const recovery=document.querySelector('#my-story');
  if(recovery&&!document.querySelector('#crystal-story-extra')){
    const copy=recovery.querySelector('.recovery-copy');const song=copy&&copy.querySelector('.story-song');const extra=document.createElement('div');extra.id='crystal-story-extra';extra.innerHTML=`<p>For a long time, using was not just about wanting to get high. It became a way to quiet everything for a while. The problem was that the quiet never lasted. When the high wore off, whatever I was trying not to feel was still there, and addiction kept asking for more.</p><p>There is a point where something that once felt like an escape starts making your world smaller. Your choices start revolving around the next time you can use, the next time you can feel numb, or the next time you can avoid feeling sick, anxious, empty, or overwhelmed. That is the part people do not always see from the outside.</p><p>Getting sober meant losing the shortcut I had used to escape. I had to learn that cravings are feelings, not commands, and that one terrible night does not have to become a relapse.</p><p>Some days sobriety feels powerful. Other days it is quiet and ordinary: making it through the day, going to sleep sober, waking up and doing it again. Those ordinary days matter too.</p><p>I still count the time because the number means something to me. It is proof that I have kept choosing my life over the thing that was taking it away from me.</p>`;if(copy)copy.insertBefore(extra,song||null);
  }

  const catalog=document.querySelector('#all-drugs');
  if(catalog&&!document.querySelector('#cannabis-focus')){
    const style=document.createElement('style');style.textContent=`.cannabis-focus{padding:11vh 6vw;background:linear-gradient(180deg,#07110b,#0d2115 48%,#080808);border-top:1px solid #ffffff18;border-bottom:1px solid #ffffff18}.cannabis-focus h2{font-size:clamp(55px,9vw,128px);line-height:.84;letter-spacing:-.06em;margin:0 0 24px}.cannabis-intro{max-width:850px;color:#c9c9c9;font-size:clamp(17px,1.6vw,21px);line-height:1.75;margin-bottom:38px}.cannabis-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:12px}.cannabis-card{border:1px solid #ffffff1c;background:#0b100d;padding:24px;min-height:200px}.cannabis-card small{display:block;color:#7ddc9a;font-weight:900;letter-spacing:.14em;font-size:10px;margin-bottom:10px}.cannabis-card b{display:block;font-size:22px;margin-bottom:10px}.cannabis-card p{color:#aaa;line-height:1.6;margin:0}`;document.head.appendChild(style);
    const section=document.createElement('section');section.id='cannabis-focus';section.className='cannabis-focus';section.innerHTML=`<div class="eyebrow" style="color:#7ddc9a">CANNABIS / WEED</div><h2>WEED COUNTS<br>TOO.</h2><p class="cannabis-intro">Cannabis has a different overdose profile from opioids, but it can still affect memory, coordination, reaction time, judgment, anxiety, mood and daily functioning.</p><div class="cannabis-grid"><div class="cannabis-card"><small>CANNABIS</small><b>Marijuana / Weed / Flower</b><p>THC can impair attention, short-term memory, coordination and reaction time.</p></div><div class="cannabis-card"><small>EDIBLES</small><b>Gummies / Brownies / Drinks</b><p>Edibles can take longer to feel and may last much longer than inhaled cannabis.</p></div><div class="cannabis-card"><small>HIGH THC</small><b>Dabs / Wax / Concentrates</b><p>Higher-potency products can increase the chance of panic, severe intoxication or confusion in some people.</p></div><div class="cannabis-card"><small>VAPES</small><b>THC Carts / Pens</b><p>Potency can vary widely and unregulated products may contain unexpected ingredients.</p></div><div class="cannabis-card"><small>DEPENDENCE</small><b>Cannabis Use Disorder</b><p>Some people develop tolerance, cravings and difficulty cutting down.</p></div><div class="cannabis-card"><small>CHS</small><b>Cannabinoid Hyperemesis Syndrome</b><p>Frequent long-term use can be linked to repeated severe nausea and vomiting in some people.</p></div><div class="cannabis-card"><small>MENTAL HEALTH</small><b>Anxiety / Panic / Paranoia</b><p>High doses can trigger intense anxiety, panic or paranoia in some people.</p></div><div class="cannabis-card"><small>SYNTHETIC</small><b>K2 / Spice</b><p>Synthetic cannabinoids can be far more unpredictable than cannabis.</p></div><div class="cannabis-card"><small>SAFETY</small><b>Driving / Mixing</b><p>Driving while high is unsafe because cannabis affects attention, coordination and reaction time.</p></div></div>`;catalog.parentNode.insertBefore(section,catalog);
  }

  // DISCOVERABILITY / SEO / SOCIAL SHARING
  const siteUrl='https://y2kbeatzz-dot.github.io/After-The-High/';
  const shareTitle='AFTER THE HIGH — Drug Awareness & Recovery';
  const shareText='Drug awareness, overdose prevention, recovery, music, and the people behind the statistics. Created by Crystal.';
  const previewUrl=siteUrl+'social-preview.svg';
  document.title=shareTitle;
  const setMeta=(selector,attrs)=>{let el=document.head.querySelector(selector);if(!el){el=document.createElement('meta');document.head.appendChild(el)}Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));};
  setMeta('meta[name="description"]',{name:'description',content:'AFTER THE HIGH is an interactive drug-awareness and recovery project by Crystal covering fentanyl, cocaine, meth, opioids, lean, benzodiazepines, MDMA, ketamine, cannabis, overdose warning signs, naloxone, recovery, music and remembrance.'});
  setMeta('meta[name="keywords"]',{name:'keywords',content:'drug awareness, addiction recovery, overdose prevention, fentanyl awareness, naloxone, cannabis awareness, lean codeine, cocaine, meth, opioids, harm reduction, sobriety, recovery story'});
  setMeta('meta[name="robots"]',{name:'robots',content:'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'});
  setMeta('meta[property="og:title"]',{property:'og:title',content:shareTitle});
  setMeta('meta[property="og:description"]',{property:'og:description',content:shareText});
  setMeta('meta[property="og:type"]',{property:'og:type',content:'website'});
  setMeta('meta[property="og:url"]',{property:'og:url',content:siteUrl});
  setMeta('meta[property="og:image"]',{property:'og:image',content:previewUrl});
  setMeta('meta[name="twitter:card"]',{name:'twitter:card',content:'summary_large_image'});
  setMeta('meta[name="twitter:title"]',{name:'twitter:title',content:shareTitle});
  setMeta('meta[name="twitter:description"]',{name:'twitter:description',content:shareText});
  setMeta('meta[name="twitter:image"]',{name:'twitter:image',content:previewUrl});
  let canonical=document.head.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=siteUrl;
  let manifest=document.head.querySelector('link[rel="manifest"]');if(!manifest){manifest=document.createElement('link');manifest.rel='manifest';manifest.href='manifest.webmanifest';document.head.appendChild(manifest)}
  if(!document.querySelector('#ath-jsonld')){const ld=document.createElement('script');ld.id='ath-jsonld';ld.type='application/ld+json';ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'AFTER THE HIGH',url:siteUrl,description:shareText,creator:{'@type':'Person',name:'Crystal'},about:['Drug awareness','Addiction recovery','Overdose prevention','Naloxone','Fentanyl','Cannabis','Sobriety']});document.head.appendChild(ld)}

  if(!document.querySelector('#share-after-high')){
    const s=document.createElement('style');s.textContent=`.ath-share{padding:10vh 6vw;background:radial-gradient(circle at 75% 30%,#351019,#070707 56%);border-top:1px solid #ffffff20}.ath-share-wrap{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(260px,.75fr);gap:5vw;align-items:center}.ath-share h2{font-size:clamp(48px,8vw,112px);line-height:.86;letter-spacing:-.06em;margin:0 0 22px}.ath-share p{max-width:760px;color:#ccc;font-size:clamp(17px,1.7vw,21px);line-height:1.7}.ath-share-buttons{display:flex;flex-wrap:wrap;gap:10px;margin-top:25px}.ath-share-btn{appearance:none;border:1px solid #ffffff24;background:#121212;color:#fff;border-radius:999px;padding:12px 16px;font:800 13px/1 system-ui;cursor:pointer;text-decoration:none}.ath-share-btn.primary{background:#fff;color:#111}.ath-share-btn:hover{transform:translateY(-1px)}.ath-qr{border:1px solid #ffffff20;background:#0c0c0c;border-radius:22px;padding:20px;text-align:center}.ath-qr img{width:min(230px,80vw);height:auto;background:white;border-radius:14px;padding:10px}.ath-qr small{display:block;color:#888;margin-top:12px;line-height:1.5}.ath-toast{position:fixed;left:50%;bottom:24px;translate:-50% 15px;z-index:20000;background:#fff;color:#111;border-radius:999px;padding:11px 16px;font:800 12px system-ui;opacity:0;pointer-events:none;transition:.2s}.ath-toast.show{opacity:1;translate:-50% 0}@media(max-width:760px){.ath-share-wrap{grid-template-columns:1fr}.ath-qr{max-width:320px}}`;
    document.head.appendChild(s);
    const section=document.createElement('section');section.id='share-after-high';section.className='ath-share';
    const enc=encodeURIComponent;
    section.innerHTML=`<div class="ath-share-wrap"><div><div class="eyebrow">HELP THIS REACH SOMEONE</div><h2>SHARE<br>AFTER THE HIGH.</h2><p>If this page taught you something, made you feel understood, or might help somebody you know, share it. Awareness works better when it leaves the screen it started on.</p><div class="ath-share-buttons"><button class="ath-share-btn primary" id="ath-native-share">↗ Share</button><button class="ath-share-btn" id="ath-copy">Copy link</button><a class="ath-share-btn" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(siteUrl)}">X / Twitter</a><a class="ath-share-btn" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${enc(siteUrl)}">Facebook</a><a class="ath-share-btn" target="_blank" rel="noopener" href="https://www.reddit.com/submit?url=${enc(siteUrl)}&title=${enc(shareTitle)}">Reddit</a><a class="ath-share-btn" target="_blank" rel="noopener" href="https://wa.me/?text=${enc(shareText+' '+siteUrl)}">WhatsApp</a><a class="ath-share-btn" href="mailto:?subject=${enc(shareTitle)}&body=${enc(shareText+'\n\n'+siteUrl)}">Email</a><button class="ath-share-btn" id="ath-discord">Copy for Discord</button></div></div><aside class="ath-qr"><img alt="QR code for AFTER THE HIGH" loading="lazy" src="https://quickchart.io/qr?size=280&margin=1&text=${enc(siteUrl)}"><strong>SCAN TO OPEN</strong><small>Point a phone camera at this QR code to open the site.</small></aside></div>`;
    const help=document.querySelector('#help');if(help)help.parentNode.insertBefore(section,help);else document.body.appendChild(section);
    const toast=document.createElement('div');toast.className='ath-toast';toast.textContent='Link copied';document.body.appendChild(toast);
    const copied=(text='Link copied')=>{toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)};
    const copy=async(text)=>{try{await navigator.clipboard.writeText(text);copied()}catch{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();copied()}};
    section.querySelector('#ath-copy').addEventListener('click',()=>copy(siteUrl));
    section.querySelector('#ath-discord').addEventListener('click',()=>copy(`AFTER THE HIGH — Drug Awareness & Recovery\n${shareText}\n${siteUrl}`));
    section.querySelector('#ath-native-share').addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:shareTitle,text:shareText,url:siteUrl})}catch(e){if(e.name!=='AbortError')copy(siteUrl)}}else copy(siteUrl)});
  }
})();