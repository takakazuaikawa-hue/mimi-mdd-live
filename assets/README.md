# assets — 差し替え用アセット箱 📦

> **画像・音は後から随時追加する前提の「箱」です。** ここにファイルを置くだけでゲームに反映されます（コード変更不要。下記の命名規則に従えば、起動時にマニフェストが拾います）。
> 置かれていないファイルは**自動的にプレースホルダ**（単色シルエット／無音）で代替され、コンソールエラーにはなりません。

## 仕組み

- 論理名 → ファイルパスの対応は **`src/services/assetLoader/manifest.ts`** に定義。
- 画像は `AssetLoader`（`src/services/assetLoader/`）が読み込み、無ければ Pixi 側がプレースホルダ図形を描画。
- 音は `AudioManager`（`src/services/audio/`）が読み込み、無ければ無音。
- ファイルを追加したら、必要に応じて `manifest.ts` に1行足すだけ（既に箱の標準ファイル名は登録済み）。

## フォルダ構成

| フォルダ | 中身 | 仕様書 |
|---|---|---|
| `backgrounds/` | タイトル/医務室/地下球場/手術室 などの背景 1920×1080 | §16.2, §23.1 |
| `characters/`  | ミミ立ち絵・選手共通素体・頭部差分・敵素体 | §16.3〜16.5, §23.1 |
| `modifications/` | 改造パーツ（オレンジ強調・形状差分） | §16.3, §23.1 |
| `ui/` | UIアイコン一式・ダイス5色 | §17, §23.1 |
| `logos/` | 球団ロゴ・後援ロゴ | §23.1 |
| `audio/bgm/` | 通常曲・重要戦曲（BGM） | §15.1, §23.1 |
| `audio/sfx/` | 効果音一式 | §15.2, §23.1 |

## 現在の組み込み状況（2026-06 整理）

置いていただいた素材を `manifest.ts` に割り当て済み。**緑背景の `*_chromakey.png` は実行時に透過処理**（`src/services/assetLoader/chromaKey.ts`）して立ち絵・ロゴに使用。

| 素材 | 用途 | 状態 |
|---|---|---|
| `backgrounds/title_background_a.png` | タイトル背景 | ✅（b は予備 `BG_IMAGES.titleAlt`） |
| `backgrounds/medical_room_background.png` | 医務室ホーム | ✅ |
| `backgrounds/underground_stadium_background.png` | 試合/次戦/配当 | ✅ |
| `backgrounds/surgery_room_background.png` | 手術室/怪我確認 | ✅ |
| `logos/title_logo.png` | タイトルロゴ（緑→透過） | ✅ |
| `characters/mimi_character_sheet_chromakey.png` | ミミ立ち絵 3×2＝6ポーズ | ✅ タイトルで cheer 使用 |
| `characters/fixed_nine_character_sheet_chromakey.png` | 9選手 3×3 ポートレート | ✅ 選手詳細で使用 |
| `ui/ui_icons.png` | UIアイコン 6×7＝42種 | 🟡 スプライト基盤あり・配線は次段階 |
| `modifications/special_dice.png` | ダイス5色（1面のみ） | 🟡 種別表示用。出目1〜6はCSSダイスで描画 |
| `modifications/modification_parts.png`・`team_sponsor_logos.png` | 改造/後援ロゴ | 🟡 未配線（基盤あり） |

立ち絵差し替え時は同じ緑背景＋同レイアウト（mimi=3×2 / nine=3×3）にすれば自動反映。
ミミのポーズ→セル番号は `manifest.ts` の `MIMI_POSE_CELL`。

## BGM の振り分け（試合中／そうでない時を分離）

`manifest.ts` の `BGM_POOLS` で管理。**曲の入れ替えはこの配列を編集するだけ**（画面に応じて自動切替・同プールは曲を切らさない）。

- **home**（タイトル/医務室/次戦/配当）: i-turned-into-pudding / skapank-ghosts / 9人揃って俺たちは勝てる / pachinko-run
- **match**（試合中・ランダム）: 爆裂野球 / 爆裂・賭けろ野球 / exploding-baseball / strike-zone-riot(+JP) / crash-the-pattern / 魔球 / pachinko-run(JP)
- **important**（重要戦・終盤・フックのみ）: seventh-inning-riot / 九回の隅落ち
- **surgery**（手術/怪我確認）: why-do-i-fall-apart / go-on,-even-in-ruins

※自動再生はブラウザ仕様で**最初のタップ/クリック後**に鳴り始めます。🔊ボタン（左下）でオン/オフ。

## 命名規則（共通）

- 小文字 + アンダースコア区切り。例：`bg_infirmary.webp`, `mimi_cheer.webp`, `dice_red.webp`。
- 画像は **webp 推奨**（png 透過が必要な立ち絵・ロゴは png 可）。
- 各フォルダの `README.md` に「期待されるファイル名一覧」と寸法を記載。

詳細は各サブフォルダの README を参照。
