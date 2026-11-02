(() => {
  const T = window.Tiger;
  let timer;
  let ticks = 0;
  function wake(reward = true) {
    clearInterval(timer);
    T.asleep = false;
    T.$('scene').classList.remove('sleeping');
    T.$('nap').querySelector('strong').textContent = 'Power nap';
    T.$('nap').querySelector('small').textContent = 'Sleep is a feature';
    T.$('mood').innerHTML = '<i></i> In my coding era';
    T.$('session-label').textContent = 'cozy mode';
    if (reward) {
      T.say('Reboot complete. Still tiny. Slightly more powerful.');
      T.log('returned from sleep(); feeling refreshed');
      T.burst('✦'); T.render();
    }
  }
  T.$('nap').addEventListener('click', () => {
    if (T.asleep) { wake(); return; }
    T.asleep = true; ticks = 0;
    T.$('scene').classList.add('sleeping');
    T.$('nap').querySelector('strong').textContent = 'Wake up';
    T.$('nap').querySelector('small').textContent = 'Or let him dream';
    T.$('mood').innerHTML = '<i></i> Running dream.exe';
    T.$('session-label').textContent = 'restoring energy…';
    T.say('Saving my work to the pillow. Back in 10 seconds.');
    T.log('sleep(10); productivity can wait');
    timer = setInterval(() => {
      ticks++; T.state.energy += 3; T.state.happiness += 1; T.render();
      if (ticks >= 10) wake();
    }, 1000);
  });
  window.addEventListener('tigerreset', () => wake(false));
})();
