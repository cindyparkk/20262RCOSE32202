# Tiger.exe 🐯

A very small tiger with a very large workload. A playful, browser-only desktop companion built for COSE322.

Open `index.html` in a browser, or serve this folder with `python3 -m http.server 4173` and visit http://localhost:4173.

No build step, dependencies, API keys, or account required.

The tiger artwork was supplied for this project and bears the System Software Lab name. This is a student project, not an official lab website; artwork ownership remains with its original creator.

## What’s inside

- Pet the animated tiger for head pats, hearts, and operating-system one-liners.
- Share cookies, restore energy with a ten-second nap, and catch five bugs in a twenty-second mini-game.
- Track energy, happiness, snack capacity, and lifetime play counters.
- Keep progress in local browser storage, with a confirmation before resetting.
- Turn on optional synthesized sounds. Sound starts off every visit.
- Use keyboard controls, mobile layouts, native dialogs, and reduced-motion settings.

The activity counters are local play statistics, not GitHub commit counts. Nothing is sent to a server. Google Fonts is the only external page resource, with system-font fallbacks.

Source: plain HTML, CSS, and JavaScript. See `ASSETS.md` for artwork notes and `TESTING.md` for the verification checklist.

## A tiger with moves

The tiger uses a transparent 1254 × 1254 sprite sheet recreated from the reference. Each 627px pose renders at 250 CSS pixels for crisp 2× screens. It switches between typing poses, waves after a head pat, munches during snacks, sleeps with closed eyes, and does a victory wiggle after catching five bugs.

Use **Pause motion** inside the tiger window to stop animation while continuing to play. Device reduced-motion settings are respected, and animation stops while the tab is hidden. All poses come from one image request; the full generation prompt is recorded in `assets/tiger-sprites-prompt.txt`.
