(() => {
  const T = window.Tiger;
  const key = 'tiger-exe-v1';
  const reminders = [
    'Even the best processes\nneed a little idle time.',
    'Your worth isn’t measured\nin completed tasks.',
    'One small step is still\na whole step.',
    'Drink some water.\nYou’re not a server rack.',
    'A break is a context switch.\nNot a character flaw.',
    'You can be a work in progress\nand someone’s favorite person.'
  ];
  let reminder = 0;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && typeof saved === 'object') {
      for (const name of Object.keys(T.defaults)) {
        if (Number.isSafeInteger(saved[name]) && saved[name] >= 0) {
          T.state[name] = Math.min(saved[name], ['energy', 'happiness', 'fullness'].includes(name) ? 100 : 1000000);
        }
      }
      T.log('welcome back. your tiny friend remembered');
    }
  } catch { T.log('memory unavailable; this visit still counts'); }
  T.render();
  window.addEventListener('tigerchange', () => {
    try { localStorage.setItem(key, JSON.stringify(T.state)); } catch { /* Private browsing or full storage: play continues without persistence. */ }
  });
  T.$('new-reminder').addEventListener('click', () => {
    reminder = (reminder + 1) % reminders.length;
    T.$('reminder').textContent = reminders[reminder];
  });
  const dialog = T.$('reset-dialog');
  dialog.addEventListener('close', () => T.$('reset').focus());
  T.$('reset').addEventListener('click', () => dialog.showModal());
  T.$('cancel-reset').addEventListener('click', () => dialog.close());
  T.$('confirm-reset').addEventListener('click', () => {
    window.dispatchEvent(new Event('tigerreset'));
    Object.assign(T.state, T.defaults);
    T.render(); T.say('New day. Same excellent little paws.');
    T.log('fresh start loaded; you’ve got this');
    dialog.close();
  });
})();
