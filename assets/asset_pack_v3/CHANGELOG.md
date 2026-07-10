# Asset Pack v3 Changelog

## 3.1.0

Expanded V3 into a fuller project handoff package.

### Added

- `sprites_all/`: all 452 runtime frames exported as individual PNG files by category.
- `sprite_exports_index.json`: index of all individual sprite exports.
- `sprite_layout_hints.json`: default anchors and rough hitboxes for all 452 frames.
- `match_animation_sets.json`: named animation sets for pitcher, batter, runner, fielding, ball, hit, dust, and overlay effects.
- `preload_bundles.json`: screen/feature preload bundles for boot, home, match, surgery, research, sponsors, and story.
- `docs/integration_v3.md`: project integration guide.

### Expanded PixiJS Match Support

- Deterministic transparent match atlases for silhouettes, props/effects, status overlays, and field props.
- Match screen map now references these frames.

### Counts

- Runtime assets: 52
- Individual sprite exports: 452
- Atlases: 20
- Frames: 452
- Screens: 10
- Preload bundles: 9
- Match animation sets: 16

## 3.0.0

V3 packages the latest runtime-ready set as a separate handoff folder.

### Added Since Earlier Packs

- PixiJS match playback assets:
  - `atlases/atlas_match_silhouettes.png`
  - `atlases/atlas_match_props_effects.png`
  - `atlases/atlas_match_status_overlays.png`
  - `atlases/atlas_field_props.png`
- Match frame IDs for pitching, batting, running, fielding, catcher poses, ball effects, base props, shadows, hit sparks, and status overlays.
- `screen_asset_map.json` now includes match playback frames.
- `project_requests.md` documents what the game project side should decide or provide.

### Runtime Counts

- Assets: 52
- Atlases: 20
- Frames: 452
- Screens: 10

### Recommended Project Handoff

Copy `asset_pack_v3` into the project as:

```text
public/assets/mimi_mad_doctor
```

Runtime base URL:

```text
/assets/mimi_mad_doctor
```
