# Quick check

Serve the folder with `python3 -m http.server 4173` and open http://localhost:4173.

- Pet the tiger: happiness and head-pat count increase, with a new message.
- Give a snack: fullness, energy, happiness, and snack count increase. At 100% fullness the tiger declines; catching bugs creates more capacity.
- Take a nap: energy rises for 10 seconds. Wake early using the same button. Feeding and the game wait until the tiger wakes.
- Catch bugs: start a round, catch five bugs, and check the total counter. Test timeout, replay, Escape, and closing mid-round. Every bug is a keyboard-focusable button.
- Reload: stats and counters persist when browser storage is available. Sound defaults off. Private browsing/storage failure must not prevent play.
- Fresh start: cancel preserves progress; confirmation resets it and ends any active nap.
- Check the layout at 390px and 1440px widths, keyboard focus, dialogs, and reduced motion.

All counters represent play in this browser. The website does not create GitHub commits or claim to read repository history.

Verified in headless Chrome on 2026-11-02: pet, feed, reload persistence, sleep/wake, keyboard game completion, timer expiry, Escape, reset/cancel, 390px overflow, reduced motion, and no JavaScript page errors.
