# modifications 📦 — 改造パーツ

手術で付与される改造パーツ（§16.3）。**形状差を優先・オレンジで強調**。透過 png 推奨。
大型・重要改造だけ表示し、自動優先度制御（`displayPriority`）。無い場合はオレンジの記号図形で代替。

縦切り版の最小セット（3〜5種・§23.1）。`src/game/data/modifications.ts` の `id` と一致させる：

| ファイル名 | id | 部位の例 |
|---|---|---|
| `mod_arm_piston.png` | `arm_piston` | 腕：爆裂ピストン |
| `mod_eye_lens.png` | `eye_lens` | 眼：照準レンズ |
| `mod_leg_spring.png` | `leg_spring` | 脚：跳躍スプリング |
| `mod_spine_coil.png` | `spine_coil` | 背：神経コイル |
| `mod_jaw_brace.png` | `jaw_brace` | 顎：食いしばりブレース |
