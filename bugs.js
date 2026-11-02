(() => {
  const T = window.Tiger;
  const dialog = T.$('bug-dialog');
  const field = T.$('bug-field');
  let timer;
  let deadline;
  let score = 0;
  let playing = false;
  function finish(message) {
    playing = false; clearInterval(timer); field.replaceChildren();
    T.$('game-message').textContent = message;
    T.$('start-game').disabled = false;
    T.$('start-game').textContent = 'One more round';
  }
  function spawn() {
    field.replaceChildren();
    const bug = document.createElement('button');
    bug.className = 'bug'; bug.textContent = '🐛';
    bug.setAttribute('aria-label', `Catch bug ${score + 1} of 5`);
    bug.style.left = `${8 + Math.random() * 68}%`;
    bug.style.top = `${8 + Math.random() * 60}%`;
    bug.addEventListener('click', () => {
      if (!playing) return;
      if (Date.now() >= deadline) { finish('Time’s up. Bugs are just tiny learning opportunities.'); return; }
      score++; T.state.bugs++; T.state.fullness -= 7; T.state.energy -= 3; T.state.happiness += 3;
      T.$('game-score').textContent = `${score} / 5 bugs`;
      T.beep(820); T.render();
      if (score >= 5) {
        finish('All clear! Your code is now 100% bug-ish free.');
        T.say('Five bugs caught. Promoting myself to senior tiger.');
        T.log('5 bugs squashed. tiny promotion earned');
        T.move('dance');
        T.$('start-game').focus();
      } else spawn();
    });
    field.append(bug);
    bug.focus({ preventScroll: true });
  }
  T.$('debug').addEventListener('click', () => {
    if (T.asleep) { T.say('The debugger is currently debugging a dream.'); return; }
    dialog.showModal();
  });
  T.$('start-game').addEventListener('click', () => {
    clearInterval(timer); score = 0; playing = true; deadline = Date.now() + 20000;
    T.$('game-score').textContent = '0 / 5 bugs';
    T.$('game-time').textContent = '20s';
    T.$('game-message').textContent = 'They’re small. They’re green. They’re in production.';
    T.$('start-game').disabled = true;
    spawn();
    timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      T.$('game-time').textContent = `${remaining}s`;
      if (!remaining) { finish('Time’s up. Bugs are just tiny learning opportunities.'); T.$('start-game').focus(); }
    }, 200);
  });
  T.$('close-game').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (playing) finish('Round paused? Better: a new beginning.'); T.$('debug').focus(); });
  window.addEventListener('tigerreset', () => { finish('Ready for some very literal debugging?'); dialog.close(); });
})();
