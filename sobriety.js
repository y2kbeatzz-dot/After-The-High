(() => {
  // Synced from Crystal's sobriety counter screenshot on Sep 7, 2026 around 2:28 PM ET.
  const soberSince = new Date('2025-04-17T00:52:48-04:00');
  const root = document.querySelector('#sobriety-live');
  if (!root) return;

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
})();