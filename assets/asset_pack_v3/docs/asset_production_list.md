# Mimi's Mad Doctor Stadium Asset Production List v2

Purpose: organize generated image assets so the game loader can reference stable filenames by category.

## Naming Rules

- Use lowercase snake case.
- Use stable gameplay IDs, not visual descriptions.
- Use suffixes:
  - `_bg.png` for full-screen backgrounds.
  - `_atlas.png` for transparent sprite sheets.
  - `_sheet.png` for non-transparent multi-image sheets.
  - `_frame.png` for transparent UI frames.
  - `_raw.png` for chroma-key or unprocessed generation sources.
- Keep generated raw sources in `asset_pack_v2/raw/`.
- Keep runtime-ready files in:
  - `asset_pack_v2/backgrounds/`
  - `asset_pack_v2/atlases/`
  - `asset_pack_v2/ui/`
  - `asset_pack_v2/events/`

## Runtime Asset Groups

### Core Existing Assets To Import

| ID | Target filename | Source |
|---|---|---|
| bg_title_a | `backgrounds/bg_title_a.png` | existing title option A |
| bg_title_b | `backgrounds/bg_title_b.png` | existing title option B |
| bg_medical_room | `backgrounds/bg_medical_room.png` | existing medical room |
| bg_surgery_room | `backgrounds/bg_surgery_room.png` | existing surgery room |
| bg_stadium_default | `backgrounds/bg_stadium_default.png` | existing underground stadium |
| bg_stadium_shirogane | `backgrounds/bg_stadium_shirogane.png` | existing Shirogane stadium |
| bg_stadium_kanayama | `backgrounds/bg_stadium_kanayama.png` | existing Kanayama stadium |
| bg_stadium_yamanobe | `backgrounds/bg_stadium_yamanobe.png` | existing Yamanobe stadium |
| bg_stadium_imperial | `backgrounds/bg_stadium_imperial.png` | existing Imperial stadium |
| bg_stadium_modified | `backgrounds/bg_stadium_modified.png` | existing post-clear stadium |
| atlas_mimi | `atlases/atlas_mimi.png` | refined Mimi sheet |
| atlas_players | `atlases/atlas_players.png` | fixed nine sheet |
| atlas_player_parts | `atlases/atlas_player_parts.png` | common body/head parts |
| atlas_enemy_teams | `atlases/atlas_enemy_teams.png` | enemy team variations |
| atlas_dice | `atlases/atlas_dice.png` | dice sheet |
| atlas_team_logos | `atlases/atlas_team_logos.png` | team/sponsor logo sheet |
| atlas_ui_icons_base | `atlases/atlas_ui_icons_base.png` | existing UI icon sheet |
| atlas_match_cutins | `atlases/atlas_match_cutins.png` | existing match cut-ins |

### New Assets Generated In v2

| ID | Target filename | Need |
|---|---|---|
| atlas_surgery_ui | `atlases/atlas_surgery_ui.png` | dice tray, operating table overlay, surgery result badges, operation buttons |
| atlas_surgery_methods | `atlases/atlas_surgery_methods.png` | initial 3 surgery methods plus future method-card icon frames |
| atlas_status_icons | `atlases/atlas_status_icons.png` | injury, spirit, tension, explosive, hidden injury, surgery state, money, AP status icons |
| atlas_research_cards | `atlases/atlas_research_cards.png` | 5 research branches and reusable research card art |
| atlas_sponsor_logos_full | `atlases/atlas_sponsor_logos_full.png` | 8 normal sponsors plus 4 upper/post-clear sponsor emblems |
| atlas_mod_parts_expanded | `atlases/atlas_mod_parts_expanded.png` | expanded mechanical, biological, structural, mental, failure mutation parts |
| atlas_result_panels | `ui/atlas_result_panels.png` | payout, injury report, surgery result, match result, rank-up panels |
| atlas_ui_frames | `ui/atlas_ui_frames.png` | reusable UI windows, tabs, card frames, alert banners |
| sheet_story_events | `events/sheet_story_events.png` | intro, first surgery, defeat, final, doctor registration, post-clear unlock event art |
| sheet_player_expressions | `atlases/sheet_player_expressions.png` | nine player bust/expression variants for details and events |

## Coverage Checklist

- Vertical slice: title, medical room, player list, match, betting, injury confirmation, surgery, result, save/load.
- Normal route: 8-match season, league opponents, 8 sponsors, research progression, roles/nicknames, event beats.
- Full route: final boss, clear scene, post-clear modified league, abnormal stadium, advanced surgery visuals.

## Notes For Loader Implementation

- Treat each atlas as a coarse sheet first. Exact sprite rectangles can be manually registered later in `asset_index.json`.
- If using PixiJS, load these as base textures and define frame rectangles in code or JSON.
- Image-generated text is avoided in runtime atlases. UI text should be rendered by the game.
- The v2 atlas filenames are stable. Future regenerated variants should use `_v2`, `_v3`, etc. only in raw/prototype folders, then replace the stable runtime file after selection.
