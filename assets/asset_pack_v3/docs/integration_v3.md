# Asset Pack v3 Integration Guide

## Recommended Placement

Copy this folder into the game project as:

```text
public/assets/mimi_mad_doctor
```

Runtime base URL:

```ts
const ASSET_BASE_URL = "/assets/mimi_mad_doctor";
```

## Minimum Runtime JSON

Load these first:

```ts
const assetIndex = await fetch(`${ASSET_BASE_URL}/asset_index.json`).then((r) => r.json());
const atlasFrames = await fetch(`${ASSET_BASE_URL}/atlas_frames_runtime.json`).then((r) => r.json());
const screenMap = await fetch(`${ASSET_BASE_URL}/screen_asset_map.json`).then((r) => r.json());
const layoutHints = await fetch(`${ASSET_BASE_URL}/sprite_layout_hints.json`).then((r) => r.json());
const preloadBundles = await fetch(`${ASSET_BASE_URL}/preload_bundles.json`).then((r) => r.json());
```

## Fast Start

If atlas slicing is not ready yet, use:

```text
sprites_all/<category>/<frame_id>.png
```

Example:

```text
sprites_all/match_silhouettes/sil_pitcher_throw_1.png
sprites_all/dice/dice_explosive_red.png
sprites_all/mimi/mimi_neutral.png
```

## PixiJS Atlas Path

Use `atlas_frames_runtime.json` for `Texture` rectangles. Use `sprite_layout_hints.json` for anchor and rough hitbox defaults.

Suggested anchor usage:

```ts
sprite.anchor.set(hint.anchor[0], hint.anchor[1]);
```

## Match Prototype Bundle

For the first playable match scene, preload:

```text
preload_bundles.json -> bundles.match_core
```

Then add stadiums lazily:

```text
preload_bundles.json -> bundles.match_league_stadiums
```

## Project-Side Decisions Still Needed

- Logical match canvas size, for example `1920x1080` or `1280x720`.
- Baseline Y coordinates for pitcher, batter, runner, fielder, catcher, and bases.
- Whether production should keep `sprites_all` or use atlases only.
- Whether generated Mimi is temporary or canonical.
