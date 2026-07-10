export type AssetEntry = {
  id: string;
  kind: 'background' | 'atlas' | 'ui' | 'event_sheet';
  path: string;
  width: number;
  height: number;
  alpha: boolean;
  status: 'ready';
  notes: string;
};

export type AssetIndex = {
  version: string;
  root: string;
  assets: AssetEntry[];
};

export type AtlasFrame = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  sourceX?: number;
  sourceY?: number;
  sourceW?: number;
  sourceH?: number;
  trimmed?: boolean;
};

export type AtlasDefinition = {
  path: string;
  width: number;
  height: number;
  grid: [number, number];
  frames: AtlasFrame[];
};

export type AtlasFrames = {
  version: string;
  coordinateSystem: 'pixel-top-left';
  note: string;
  atlases: AtlasDefinition[];
};

export async function loadAssetJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function buildAssetUrl(packRoot: string, relativePath: string): string {
  return `${packRoot.replace(/\\/$/, '')}/${relativePath}`;
}

export function findAsset(index: AssetIndex, id: string): AssetEntry {
  const asset = index.assets.find((entry) => entry.id === id);
  if (!asset) {
    throw new Error(`Unknown asset id: ${id}`);
  }
  return asset;
}

export function findFrame(frames: AtlasFrames, frameId: string): { atlas: AtlasDefinition; frame: AtlasFrame } {
  for (const atlas of frames.atlases) {
    const frame = atlas.frames.find((candidate) => candidate.id === frameId);
    if (frame) {
      return { atlas, frame };
    }
  }
  throw new Error(`Unknown frame id: ${frameId}`);
}

// PixiJS sketch:
//
// const index = await loadAssetJson<AssetIndex>('/assets/asset_pack_v2/asset_index.json');
// const frames = await loadAssetJson<AtlasFrames>('/assets/asset_pack_v2/atlas_frames_trimmed.json');
// const { atlas, frame } = findFrame(frames, 'mimi_neutral');
// const texture = await Assets.load(buildAssetUrl('/assets/asset_pack_v2', atlas.path));
// const sprite = new Sprite(new Texture({ source: texture.source, frame: new Rectangle(frame.x, frame.y, frame.w, frame.h) }));
//
// Canvas sketch:
//
// const image = new Image();
// image.src = buildAssetUrl('/assets/asset_pack_v2', atlas.path);
// ctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, dx, dy, dw, dh);
