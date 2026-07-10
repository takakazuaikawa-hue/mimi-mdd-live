# Project Requests For Asset Integration

These are the things the game project side should provide or decide so the asset pack can be integrated cleanly.

## Required From Project Side

1. Public asset base URL
   - Recommended: `/assets/mimi_mad_doctor`
   - Needed so loader code can resolve `asset_index.json`, atlas PNGs, and frame JSON.

2. Atlas slicing strategy
   - Use `atlas_frames_runtime.json` for now.
   - Later, replace coarse/generated frame rectangles with tighter hand-authored rectangles where UI precision matters.

3. PixiJS coordinate scale
   - Decide the match canvas logical size, for example `1920x1080` or `1280x720`.
   - Needed to tune silhouette sizes, base positions, ball trajectory scale, and overlay effect scale.

4. Screen preload boundaries
   - Use `screen_asset_map.json` as the first pass.
   - Project should decide which screens eagerly preload and which lazily load.

5. Text rendering policy
   - Runtime text should be rendered by React/Canvas/Pixi, not baked into generated images.
   - Needed for Japanese copy, numbers, odds, ranks, and save slots.

6. Character sprite replacement policy
   - `atlas_mimi.png` is the reference-aligned current Mimi.
   - If the project has a canonical Mimi source file, decide whether to replace generated Mimi sheets or use them as temporary story/cut-in assets.

7. Audio handoff
   - This pack is image-only.
   - The project still needs BGM and SFX naming/specs if audio implementation begins.

## Nice To Have From Project Side

- A sample match screen screenshot or mock layout.
- Desired Pixi anchor points for silhouettes, ball, bases, and overlays.
- First implementation target: title/home/match/surgery, or match-only prototype.
- Whether to keep individual `sprites/` PNGs in production or use atlases only.

## Current V3 Coverage

- Title/home/surgery/match/league stadiums.
- Mimi, players, enemy teams, dice, icons, surgery UI, cards, sponsors, result panels.
- Story event sheet and player expression sheet.
- PixiJS match silhouettes, ball/prop effects, status overlays, and field props.
- Runtime JSON indexes and screen maps.
