from __future__ import annotations

import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


def read_json(name: str) -> dict:
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


def main() -> None:
    index = read_json("asset_index.json")
    frames = read_json("atlas_frames_runtime.json")
    screen_map = read_json("screen_asset_map.json")

    asset_ids = {asset["id"] for asset in index["assets"]}
    frame_ids = {frame["id"] for atlas in frames["atlases"] for frame in atlas["frames"]}

    missing_files: list[str] = []
    dimension_mismatches: list[str] = []
    for asset in index["assets"]:
      path = ROOT / asset["path"]
      if not path.exists():
          missing_files.append(asset["path"])
          continue
      with Image.open(path) as image:
          if image.width != asset["width"] or image.height != asset["height"]:
              dimension_mismatches.append(asset["path"])

    missing_refs: list[str] = []
    for screen, spec in screen_map["screens"].items():
        for key in ("backgrounds", "ui", "eventSheets"):
            for asset_id in spec.get(key, []):
                if asset_id not in asset_ids:
                    missing_refs.append(f"{screen}.{key}: {asset_id}")
        for frame_id in spec.get("frames", []):
            if frame_id not in frame_ids:
                missing_refs.append(f"{screen}.frames: {frame_id}")

    atlas_paths = {atlas["path"] for atlas in frames["atlases"]}
    missing_atlases = [path for path in atlas_paths if not (ROOT / path).exists()]

    print(f"assets: {len(asset_ids)}")
    print(f"atlases: {len(frames['atlases'])}")
    print(f"frames: {len(frame_ids)}")
    print(f"screens: {len(screen_map['screens'])}")
    print(f"missing_files: {len(missing_files)}")
    print(f"dimension_mismatches: {len(dimension_mismatches)}")
    print(f"missing_refs: {len(missing_refs)}")
    print(f"missing_atlases: {len(missing_atlases)}")

    errors = missing_files + dimension_mismatches + missing_refs + missing_atlases
    if errors:
        print("")
        for error in errors:
            print(f"ERROR: {error}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
