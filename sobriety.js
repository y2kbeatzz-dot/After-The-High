(() => {
  // Synced from Crystal's sobriety counter screenshot on Sep 7, 2026 around 2:28 PM ET.
  const soberSince = new Date('2025-04-17T00:52:48-04:00');
  const root = document.querySelector('#sobriety-live');
  if (root) {
    const units = ['years','months','days','hours','minutes','seconds'];
    const els = Object.fromEntries(units.map(u => [u, root.querySelector(`[data-unit="${u}"]`)]));
    const totalDaysEl = root.querySelector('[data-total-days]');

    function addYears(date, amount){ const d = new Date(date); d.setFullYear(d.getFullYear()+amount); return d; }
    function addMonths(date, amount){ const d = new Date(date); const day = d.getDate(); d.setDate(1); d.setMonth(d.getMonth()+amount); const max = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate(); d.setDate(Math.min(day,max)); return d; }
    function addDays(date, amount){ const d = new Date(date); d.setDate(d.getDate()+amount); return d; }

    function calendarDiff(start, end){
      let cursor = new Date(start);
      let years = end.getFullYear() - cursor.getFullYear();
      let t = addYears(cursor, years);
      if (t > end){ years--; t = addYears(cursor, years); }
      cursor = t;
      let months = (end.getFullYear()-cursor.getFullYear())*12 + (end.getMonth()-cursor.getMonth());
      t = addMonths(cursor, months);
      if (t > end){ months--; t = addMonths(cursor, months); }
      cursor = t;
      let days = 0;
      while (addDays(cursor,1) <= end && days < 32){ cursor = addDays(cursor,1); days++; }
      let ms = end - cursor;
      const hours = Math.floor(ms / 3600000); ms -= hours*3600000;
      const minutes = Math.floor(ms / 60000); ms -= minutes*60000;
      const seconds = Math.floor(ms / 1000);
      return {years,months,days,hours,minutes,seconds};
    }

    function tick(){
      const now = new Date();
      const d = calendarDiff(soberSince, now);
      units.forEach(u => {
        if (!els[u]) return;
        els[u].querySelector('.sobriety-num').textContent = d[u];
        const label = els[u].querySelector('.sobriety-label');
        label.textContent = `${u.slice(0,-1)}${d[u] === 1 ? '' : 's'}`;
      });
      if (totalDaysEl) totalDaysEl.textContent = Math.floor((now - soberSince)/86400000).toLocaleString();
    }
    tick();
    setInterval(tick, 1000);
  }

  // Recovery soundtrack using official YouTube audio embeds.
  const catalog = document.querySelector('#all-drugs');
  if (!catalog || document.querySelector('#recovery-music')) return;

  const style = document.createElement('style');
  style.textContent = `
    .recovery-music{padding:11vh 6vw;background:linear-gradient(180deg,#070707,#160b15 55%,#070707);border-top:1px solid #ffffff18;border-bottom:1px solid #ffffff18}
    .recovery-music h2{font-size:clamp(52px,8vw,120px);line-height:.84;letter-spacing:-.06em;margin:0 0 18px}
    .music-sub{max-width:760px;color:#aaa;font-size:17px;line-height:1.7;margin-bottom:36px}
    .music-shell{display:grid;grid-template-columns:minmax(240px,.65fr) minmax(0,1.35fr);gap:26px;align-items:stretch}
    .music-tracklist{display:grid;gap:10px;align-content:start}
    .music-track{appearance:none;width:100%;text-align:left;border:1px solid #ffffff18;background:#0d0d0d;color:#fff;border-radius:18px;padding:18px 20px;cursor:pointer}
    .music-track.active{border-color:#ff647a;background:#1b0b12}
    .music-track small{display:block;color:#ff7588;font-size:10px;letter-spacing:.18em;font-weight:900;margin-bottom:7px}
    .music-track strong{font-size:20px;display:block}.music-track span{display:block;color:#888;margin-top:5px;font-size:13px}
    .music-player{border:1px solid #ffffff18;background:#0a0a0a;border-radius:24px;padding:18px;overflow:hidden}
    .music-video{aspect-ratio:16/9;background:#000;border-radius:16px;overflow:hidden}.music-video>div,.music-video iframe{width:100%!important;height:100%!important}
    .now-playing{display:flex;justify-content:space-between;gap:20px;align-items:end;margin:18px 2px 12px}.now-playing small{display:block;color:#ff7588;font-weight:900;letter-spacing:.14em}.now-playing strong{font-size:clamp(19px,3vw,29px)}
    .music-controls{display:grid;grid-template-columns:auto auto auto 1fr;gap:10px;align-items:center}.music-btn{width:46px;height:46px;border-radius:50%;border:1px solid #ffffff20;background:#151515;color:#fff;font-size:18px;cursor:pointer}.music-btn.main{width:56px;height:56px;background:#fff;color:#111;font-size:21px}
    .seek-wrap{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;min-width:0}.seek-wrap span{font-size:11px;color:#888;font-variant-numeric:tabular-nums}.music-range{width:100%;accent-color:#ff647a}
    .volume-row{display:flex;align-items:center;gap:10px;margin-top:14px;color:#888;font-size:12px}.volume-row input{max-width:180px}
    .music-note{color:#666;font-size:12px;line-height:1.5;margin-top:14px}
    @media(max-width:780px){.music-shell{grid-template-columns:1fr}.music-controls{grid-template-columns:auto auto auto}.seek-wrap{grid-column:1/-1}.recovery-music{padding:10vh 5vw}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.id = 'recovery-music';
  section.className = 'recovery-music';
  section.innerHTML = `
    <div class="eyebrow">RECOVERY SOUNDTRACK · J. COLE</div>
    <h2>MUSIC THAT<br>FITS THE STORY.</h2>
    <p class="music-sub">Two songs from <b>KOD</b> that connect directly to addiction and recovery. Use the controls below to play, pause, skip between the two tracks, seek, and adjust volume.</p>
    <div class="music-shell">
      <div class="music-tracklist">
        <button class="music-track active" data-index="0"><small>TRACK 01</small><strong>Once an Addict (Interlude)</strong><span>J. Cole · 3:17</span></button>
        <button class="music-track" data-index="1"><small>TRACK 02</small><strong>FRIENDS</strong><span>J. Cole feat. kiLL edward · 4:17</span></button>
      </div>
      <div class="music-player">
        <div class="music-video"><div id="yt-recovery-player"></div></div>
        <div class="now-playing"><div><small>NOW PLAYING</small><strong id="music-title">Once an Addict (Interlude)</strong></div><span id="music-state">Ready</span></div>
        <div class="music-controls">
          <button class="music-btn" id="music-prev" aria-label="Previous track">⏮</button>
          <button class="music-btn main" id="music-toggle" aria-label="Play or pause">▶</button>
          <button class="music-btn" id="music-next" aria-label="Next track">⏭</button>
          <div class="seek-wrap"><span id="music-current">0:00</span><input class="music-range" id="music-seek" type="range" min="0" max="1000" value="0" aria-label="Seek"><span id="music-duration">0:00</span></div>
        </div>
        <div class="volume-row">VOLUME <input class="music-range" id="music-volume" type="range" min="0" max="100" value="75" aria-label="Volume"></div>
        <div class="music-note">Playback comes from J. Cole's official YouTube audio releases. Browsers may require you to tap Play before audio can start.</div>
      </div>
    </div>`;
  catalog.parentNode.insertBefore(section, catalog);

  const tracks = [
    {id:'uirzHXHpgqM', title:'Once an Addict (Interlude)'},
    {id:'4JmZ2PgzTos', title:'FRIENDS'}
  ];
  let currentIndex = 0, player = null, seekTimer = null;
  const titleEl = section.querySelector('#music-title');
  const stateEl = section.querySelector('#music-state');
  const toggle = section.querySelector('#music-toggle');
  const seek = section.querySelector('#music-seek');
  const currentEl = section.querySelector('#music-current');
  const durationEl = section.querySelector('#music-duration');
  const volume = section.querySelector('#music-volume');

  const fmt = s => { s = Math.max(0, Math.floor(Number(s)||0)); return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; };
  function setActive(index){
    currentIndex = (index + tracks.length) % tracks.length;
    section.querySelectorAll('.music-track').forEach((b,i)=>b.classList.toggle('active', i===currentIndex));
    titleEl.textContent = tracks[currentIndex].title;
  }
  function load(index, autoplay=true){
    setActive(index);
    if (!player) return;
    if (autoplay) player.loadVideoById(tracks[currentIndex].id);
    else player.cueVideoById(tracks[currentIndex].id);
  }
  function syncSeek(){
    if (!player || typeof player.getDuration !== 'function') return;
    const d = player.getDuration() || 0, c = player.getCurrentTime() || 0;
    seek.value = d ? Math.round((c/d)*1000) : 0;
    currentEl.textContent = fmt(c); durationEl.textContent = fmt(d);
  }
  function onState(event){
    const Y = window.YT && window.YT.PlayerState;
    if (!Y) return;
    if (event.data === Y.PLAYING){ toggle.textContent='❚❚'; stateEl.textContent='Playing'; }
    else if (event.data === Y.PAUSED){ toggle.textContent='▶'; stateEl.textContent='Paused'; }
    else if (event.data === Y.BUFFERING){ stateEl.textContent='Loading…'; }
    else if (event.data === Y.ENDED){ load(currentIndex+1, true); }
    else { toggle.textContent='▶'; }
  }

  function makePlayer(){
    player = new YT.Player('yt-recovery-player', {
      videoId: tracks[0].id,
      playerVars:{playsinline:1,rel:0,modestbranding:1,controls:0},
      events:{
        onReady:()=>{ player.setVolume(Number(volume.value)); stateEl.textContent='Ready'; seekTimer=setInterval(syncSeek,500); },
        onStateChange:onState
      }
    });
  }
  if (window.YT && window.YT.Player) makePlayer();
  else {
    const old = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function(){ if (typeof old === 'function') old(); makePlayer(); };
    const api = document.createElement('script'); api.src='https://www.youtube.com/iframe_api'; document.head.appendChild(api);
  }

  section.querySelectorAll('.music-track').forEach(btn=>btn.addEventListener('click',()=>load(Number(btn.dataset.index), true)));
  section.querySelector('#music-prev').addEventListener('click',()=>load(currentIndex-1,true));
  section.querySelector('#music-next').addEventListener('click',()=>load(currentIndex+1,true));
  toggle.addEventListener('click',()=>{
    if (!player) return;
    const Y = window.YT && window.YT.PlayerState;
    if (Y && player.getPlayerState() === Y.PLAYING) player.pauseVideo(); else player.playVideo();
  });
  seek.addEventListener('input',()=>{
    if (!player) return; const d = player.getDuration()||0; player.seekTo(d*(Number(seek.value)/1000), true);
  });
  volume.addEventListener('input',()=>{ if (player) player.setVolume(Number(volume.value)); });
  window.addEventListener('beforeunload',()=>{ if (seekTimer) clearInterval(seekTimer); });
})();