# Mimi's Mad Doctor Stadium Asset Pack v3

This folder is the runtime-oriented image asset pack.

## Loader Entry Points

- `asset_index.json`: flat list of every runtime-ready PNG with dimensions and alpha information.
- `asset_groups.json`: grouped list by `backgrounds`, `atlases`, `ui`, and `events`.
- `screen_asset_map.json`: suggested asset/frame IDs per game screen.
- `atlas_frames.json`: coarse grid frame rectangles for atlas sprites.
- `atlas_frames_trimmed.json`: alpha-trimmed frame rectangles generated from the coarse grid.
- `atlas_frames_runtime.json`: recommended frame data for implementation; includes manual fixes for important generated sheets.
- `docs/asset_production_list.md`: human-readable production list and naming rules.
- `docs/atlas_frame_ids.csv`: flat table of all frame IDs and rectangles.
- `docs/atlas_frame_ids_trimmed.csv`: flat table of alpha-trimmed frame IDs and rectangles.
- `docs/loader_example.ts`: TypeScript sketch for loading assets and atlas frames.
- `docs/validate_asset_pack.py`: validates JSON, referenced files, dimensions, frame references, and screen map references.
- `docs/install_to_project.ps1`: copies runtime assets into a game project's `public/assets` tree.
- `sprites/`: individual PNG exports for high-use sprites such as Mimi, dice, and enemy team/ace assets.
- `docs/asset_pack_v3_runtime_contact_sheet.png`: preview including individual sprite exports.
- `preview.html` / `preview.js`: interactive browser preview for assets, atlas frames, and screen mappings.
- `serve_preview.ps1`: local static server helper for the preview.
- `docs/asset_pack_v3_contact_sheet.png`: quick visual overview.

## Folder Use

- `backgrounds/`: opaque 16:9 scene backgrounds, mostly `1920x1080`.
- `atlases/`: transparent sprite sheets and icon sheets.
- `atlases/atlas_match_silhouettes.png`: lightweight side-view baseball silhouettes for PixiJS match playback.
- `atlases/atlas_match_props_effects.png`: baseballs, swing arcs, dust, bases, shadows, hit sparks, and small match effects.
- `atlases/atlas_match_status_overlays.png`: explosive, spirit, tension, injury, betting pressure, final boss, and post-clear overlay effects.
- `atlases/atlas_field_props.png`: base bags, mound, field patches, dugout, crowd strips, light cones, side rail, and field markers.
- `ui/`: transparent title/logo/panel UI sheets.
- `events/`: opaque story/event illustration sheets.
- `raw/`: generated source files, including chroma-key sources.
- `sprites/`: optional individual sprite files exported from runtime atlas frames.

## Implementation Notes

- Treat each atlas as a base texture first. Register exact sprite rectangles later in code or JSON.
- Use `atlas_frames_runtime.json` for implementation. It starts from coarse grid cells, trims transparent padding, and includes manual corrections for important generated atlases.
- Use `sprites/` when a screen is easier to build with individual PNG files before atlas slicing is wired in.
- Use `screen_asset_map.json` as a first-pass preload plan per screen.
- UI text should be rendered by the game. Generated sheets intentionally avoid gameplay text.
- Prefer these stable runtime filenames over earlier `generated_assets/` prototype names.
- `atlases/atlas_mimi.png` is the reference-aligned Mimi sheet.
- `ui/atlas_result_panels.png`, `atlases/atlas_surgery_ui.png`, and `atlases/atlas_status_icons.png` are the most important new assets for implementing the surgery/result loop.

## Suggested Load Order

1. `ui/title_logo.png`
2. `backgrounds/*`
3. `atlases/atlas_ui_icons_base.png`
4. `atlases/atlas_status_icons.png` or individual files in `sprites/`
5. `atlases/atlas_mimi.png`
6. `atlases/atlas_players.png`
7. `atlases/atlas_enemy_teams.png`
8. `atlases/atlas_dice.png`
9. `atlases/atlas_surgery_ui.png`
10. Remaining atlases/events lazily by screen.

## Preview

From PowerShell:

```powershell
cd "C:\Users\takakazu\OneDrive\Documents\image generater\asset_pack_v3"
.\serve_preview.ps1 4177
```

Then open:

```text
http://localhost:4177/preview.html
```

The preview has three modes:

- `Assets`: every runtime PNG from `asset_index.json`.
- `Frames`: cropped atlas frames from `atlas_frames_runtime.json`.
- `Screens`: recommended assets/frames per screen from `screen_asset_map.json`.

## Validation

```powershell
& "C:\Users\takakazu\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" `
  "C:\Users\takakazu\OneDrive\Documents\image generater\asset_pack_v3\docs\validate_asset_pack.py"
```

Expected summary at this revision:

```text
assets: 52
atlases: 20
frames: 452
screens: 10
missing_files: 0
dimension_mismatches: 0
missing_refs: 0
missing_atlases: 0
```

## Install Into A Game Project

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File `
  "C:\Users\takakazu\OneDrive\Documents\image generater\asset_pack_v3\docs\install_to_project.ps1" `
  -ProjectRoot "C:\path\to\game-project"
```

Default destination:

```text
public/assets/mimi_mad_doctor
```

Default runtime base URL:

```text
/assets/mimi_mad_doctor
```
