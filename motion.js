(() => {
  const T = window.Tiger;
  const tiger = T.$('tiger');
  let timer;
  function pose(name) {
    clearTimeout(timer);
    tiger.dataset.pose = T.asleep ? 'sleep' : name;
    if (['wave', 'snack', 'dance'].includes(name) && !T.asleep) {
      timer = setTimeout(() => { tiger.dataset.pose = T.asleep ? 'sleep' : 'idle'; }, name === 'dance' ? 2100 : 1500);
    }
  }
  window.addEventListener('tigermotion', event => pose(event.detail));
  window.addEventListener('tigerreset', () => pose('idle'));
  const toggle = T.$('motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  function updateMotion() {
    const stopped = paused || reduced.matches;
    T.$('scene').classList.toggle('motion-paused', stopped || document.hidden);
    toggle.setAttribute('aria-pressed', String(!stopped));
    toggle.textContent = reduced.matches ? 'Motion reduced' : paused ? '▶ Play motion' : 'Ⅱ Pause motion';
    toggle.disabled = reduced.matches;
    toggle.title = reduced.matches ? 'Following your device’s reduced-motion preference' : 'Pause or resume tiger animations';
  }
  toggle.addEventListener('click', () => { paused = !paused; updateMotion(); });
  reduced.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  updateMotion();
  pose('idle');
})();
