# characters 📦

選手は「共通素体＋頭部差分＋改造差分」（§16.3）。ミミは立ち絵＋カットイン（§16.5）。
透過 png 推奨。無い場合はシルエット矩形＋頭部色で代替。

## ミミ
| ファイル名 | 用途 |
|---|---|
| `mimi_cheer.png` | 試合：黒×オレンジのチアバニー立ち絵 |
| `mimi_surgery.png` | 手術：手術衣（耳・尻尾維持） |
| `mimi_cutin_01.png` 〜 `mimi_cutin_03.png` | 重要カットイン2〜3枚 |

## 選手（9人）
| ファイル名 | 用途 |
|---|---|
| `player_body.png` | 選手共通素体（黒基調＋白/灰＋オレンジ二色フラット） |
| `player_head_01.png` 〜 `player_head_09.png` | 頭部差分9種（固定ナインに対応） |

## 敵
| ファイル名 | 用途 |
|---|---|
| `enemy_body.png` | 敵共通素体（記号的表現） |
| `enemy_ace_head.png` | エース頭部1種（個別の顔） |

頭部差分の番号は `src/game/data/players.ts` の `headId`（`head_01`…）に対応。
