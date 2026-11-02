(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const defaults = { energy: 72, happiness: 85, fullness: 48, pats: 0, snacks: 0, bugs: 0 };
  const state = { ...defaults };
  let asleep = false;
  let sound = false;
  let audio;
  const phrases = [
    'Head pat received. Serotonin successfully compiled.',
    'I’m not procrastinating. I’m in the ready queue.',
    'You had me at malloc. You lost me at free snacks.',
    'My love language is positive reinforcement learning.',
    'No thoughts. Just threads.',
    'The only race condition here is to the snack drawer.'
  ];
  function move(pose) { window.dispatchEvent(new CustomEvent('tigermotion', { detail: pose })); }
  function say(message) { $('speech').textContent = message; }
  function log(message) {
    const li = document.createElement('li');
    const arrow = document.createElement('span');
    arrow.textContent = '›';
    li.append(arrow, document.createTextNode(message));
    $('log').append(li);
    while ($('log').children.length > 3) $('log').firstElementChild.remove();
  }
  function render() {
    for (const key of ['energy', 'happiness', 'fullness']) {
      state[key] = Math.max(0, Math.min(100, state[key]));
      $(key).value = state[key];
      $(key).textContent = `${state[key]}%`;
      $(`${key}-value`).textContent = `${state[key]}%`;
    }
    for (const key of ['pats', 'snacks', 'bugs']) $(`${key}-count`).textContent = state[key];
    $('buddy-description').textContent = state.happiness >= 95 ? 'Thriving. In a very small way.' : 'Doing his absolute medium.';
    window.dispatchEvent(new CustomEvent('tigerchange', { detail: { ...state } }));
  }
  function burst(symbol = '♡', count = 5) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particle.textContent = symbol;
      particle.style.setProperty('--dx', `${(Math.random() - .5) * 170}px`);
      particle.style.color = ['#cc8d9f', '#aa8cc3', '#d4a162'][i % 3];
      particle.style.animationDelay = `${i * 50}ms`;
      $('particles').append(particle);
      setTimeout(() => particle.remove(), 1400);
    }
  }
  function beep(frequency = 640) {
    if (!sound) return;
    try {
      audio ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === 'suspended') audio.resume().catch(() => {});
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audio.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.4, audio.currentTime + .1);
      gain.gain.setValueAtTime(.035, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .16);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + .17);
    } catch { log('sound unavailable; still cute'); }
  }
  $('tiger').addEventListener('click', () => {
    if (asleep) { say('Shhh. Currently downloading more dreams.'); return; }
    state.pats++;
    state.happiness += 4;
    say(phrases[(state.pats - 1) % phrases.length]);
    log(`head pat #${state.pats}: serotonin++`);
    move('wave');
    burst(); beep(); render();
  });
  $('sound-toggle').addEventListener('click', () => {
    sound = !sound;
    $('sound-toggle').setAttribute('aria-pressed', String(sound));
    $('sound-toggle').querySelector('span').textContent = sound ? 'Sound on' : 'Sound off';
    beep();
  });
  function clock() {
    const now = new Date();
    $('clock').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    $('clock').dateTime = now.toISOString();
  }
  clock(); setInterval(clock, 10000);
  window.Tiger = { $, defaults, state, say, log, render, burst, beep, move,
    get asleep() { return asleep; },
    set asleep(value) { asleep = value; move(value ? 'sleep' : 'idle'); }
  };
  render();
})();
