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
  pose('idle');
})();
