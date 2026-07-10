# audio 📦 — BGM / SFX

無い場合は無音（`AudioManager` がフォールバック）。mp3 / ogg / webm 可。

## bgm/（§15.1）
通常曲は試合ごとにランダム＆解禁制。重要戦は専用曲。曲尺3分前後。
| ファイル名 | 用途 |
|---|---|
| `bgm/match_01.mp3` | 通常曲1 |
| `bgm/match_02.mp3` | 通常曲2 |
| `bgm/title.mp3` | タイトル（任意） |
| `bgm/surgery.mp3` | 手術室（任意） |

複数の通常曲は `manifest.ts` の `bgm.matchPool` 配列に列挙（ドラゴンゲームの `RACE_BGM_TRACKS` と同じ発想）。

## sfx/（§15.2）
賭けUI操作音は音楽テンポに馴染ませる（リズム判定はしない）。
| ファイル名 | 用途 |
|---|---|
| `sfx/bet_place.mp3` | 賭け確定 |
| `sfx/bet_win.mp3` | 的中 |
| `sfx/dice_roll.mp3` | ダイス転がし |
| `sfx/dice_land.mp3` | ダイス着地 |
| `sfx/surgery_success.mp3` | 手術成功 |
| `sfx/surgery_fail.mp3` | 手術失敗 |
| `sfx/injury.mp3` | 負傷 |
| `sfx/ui_tap.mp3` | UIタップ |
