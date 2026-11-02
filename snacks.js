(() => {
  const T = window.Tiger;
  let eating = false;
  let timer;
  function finish() { clearTimeout(timer); eating = false; T.$('feed').disabled = false; }
  T.$('feed').addEventListener('click', () => {
    if (eating) return;
    if (T.asleep) { T.say('Please leave the cookie by my pillow.'); return; }
    if (T.state.fullness >= 100) { T.say('Buffer full. Cookie queue temporarily closed.'); T.log('snack buffer full; try catching bugs'); return; }
    eating = true;
    T.$('feed').disabled = true;
    T.state.snacks++;
    T.state.fullness += 18;
    T.state.energy += 7;
    T.state.happiness += 6;
    T.say(['Cookie accepted. Terms and crumbs apply.', 'Finally. A byte I can actually eat.', 'This is what I call a cache hit.'][(T.state.snacks - 1) % 3]);
    T.log(`cookie #${T.state.snacks} successfully devoured`);
    T.burst('🍪', 4); T.beep(450); T.render();
    timer = setTimeout(finish, 750);
  });
  window.addEventListener('tigerreset', finish);
})();
