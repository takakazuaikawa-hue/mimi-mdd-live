const state = {
  mode: 'assets',
  kind: 'all',
  screen: 'all',
  search: '',
  index: null,
  frames: null,
  screenMap: null,
  imageCache: new Map(),
};

const $ = (id) => document.getElementById(id);

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

function setActiveTab() {
  for (const mode of ['assets', 'frames', 'screens']) {
    $(`tab-${mode}`).classList.toggle('active', state.mode === mode);
  }
  $('kind').disabled = state.mode === 'screens';
  $('screen').disabled = state.mode !== 'screens';
}

function assetUrl(path) {
  return `./${path}`;
}

function option(value, label = value) {
  const node = document.createElement('option');
  node.value = value;
  node.textContent = label;
  return node;
}

function setupControls() {
  const kinds = ['all', ...new Set(state.index.assets.map((asset) => asset.kind))];
  $('kind').replaceChildren(...kinds.map((kind) => option(kind)));

  const screens = ['all', ...Object.keys(state.screenMap.screens)];
  $('screen').replaceChildren(...screens.map((screen) => option(screen)));

  $('kind').addEventListener('change', (event) => {
    state.kind = event.target.value;
    render();
  });
  $('screen').addEventListener('change', (event) => {
    state.screen = event.target.value;
    render();
  });
  $('search').addEventListener('input', (event) => {
    state.search = event.target.value.trim().toLowerCase();
    render();
  });

  for (const mode of ['assets', 'frames', 'screens']) {
    $(`tab-${mode}`).addEventListener('click', () => {
      state.mode = mode;
      setActiveTab();
      render();
    });
  }
}

function cardBase(id, subText) {
  const card = document.createElement('article');
  card.className = 'card';

  const thumb = document.createElement('div');
  thumb.className = 'thumb';

  const info = document.createElement('div');
  info.className = 'info';
  const title = document.createElement('div');
  title.className = 'id';
  title.textContent = id;
  const path = document.createElement('div');
  path.className = 'path';
  path.textContent = subText;
  info.append(title, path);

  card.append(thumb, info);
  return { card, thumb };
}

function renderAssetCard(asset) {
  const { card, thumb } = cardBase(asset.id, `${asset.kind} · ${asset.width}x${asset.height} · ${asset.path}`);
  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = assetUrl(asset.path);
  img.alt = asset.id;
  thumb.append(img);
  return card;
}

function getAtlasByPath(path) {
  return state.frames.atlases.find((atlas) => atlas.path === path);
}

function getImage(path) {
  if (!state.imageCache.has(path)) {
    const image = new Image();
    image.src = assetUrl(path);
    state.imageCache.set(path, image);
  }
  return state.imageCache.get(path);
}

function renderFrameCard(atlas, frame) {
  const { card, thumb } = cardBase(frame.id, `${atlas.path} · ${frame.w}x${frame.h}`);
  const canvas = document.createElement('canvas');
  const maxW = 180;
  const maxH = 118;
  const scale = Math.min(maxW / frame.w, maxH / frame.h, 1);
  canvas.width = Math.max(1, Math.round(frame.w * scale));
  canvas.height = Math.max(1, Math.round(frame.h * scale));
  const context = canvas.getContext('2d');
  const image = getImage(atlas.path);

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, frame.x, frame.y, frame.w, frame.h, 0, 0, canvas.width, canvas.height);
  };

  if (image.complete) {
    draw();
  } else {
    image.addEventListener('load', draw, { once: true });
  }

  thumb.append(canvas);
  return card;
}

function matchesSearch(...values) {
  if (!state.search) return true;
  return values.some((value) => String(value).toLowerCase().includes(state.search));
}

function renderAssets() {
  $('title').textContent = 'Assets';
  const assets = state.index.assets.filter((asset) => {
    const kindOk = state.kind === 'all' || asset.kind === state.kind;
    return kindOk && matchesSearch(asset.id, asset.path, asset.kind);
  });
  $('grid').replaceChildren(...assets.map(renderAssetCard));
  renderEmpty(assets.length);
}

function renderFrames() {
  $('title').textContent = 'Atlas Frames';
  const cards = [];
  for (const atlas of state.frames.atlases) {
    for (const frame of atlas.frames) {
      if (matchesSearch(frame.id, atlas.path)) {
        cards.push(renderFrameCard(atlas, frame));
      }
    }
  }
  $('grid').replaceChildren(...cards);
  renderEmpty(cards.length);
}

function screenFrameIds(screenSpec) {
  return new Set(screenSpec.frames ?? []);
}

function screenAssetIds(screenSpec) {
  return new Set([
    ...(screenSpec.backgrounds ?? []),
    ...(screenSpec.ui ?? []),
    ...(screenSpec.eventSheets ?? []),
  ]);
}

function renderScreens() {
  const screenName = state.screen === 'all' ? Object.keys(state.screenMap.screens)[0] : state.screen;
  const screenSpec = state.screenMap.screens[screenName];
  $('title').textContent = `Screen: ${screenName}`;

  if (!screenSpec) {
    $('grid').replaceChildren();
    renderEmpty(0);
    return;
  }

  const assetIds = screenAssetIds(screenSpec);
  const frameIds = screenFrameIds(screenSpec);
  const cards = [];

  for (const asset of state.index.assets) {
    if (assetIds.has(asset.id) && matchesSearch(asset.id, asset.path)) {
      cards.push(renderAssetCard(asset));
    }
  }

  for (const atlas of state.frames.atlases) {
    for (const frame of atlas.frames) {
      if (frameIds.has(frame.id) && matchesSearch(frame.id, atlas.path)) {
        cards.push(renderFrameCard(atlas, frame));
      }
    }
  }

  $('grid').replaceChildren(...cards);
  renderEmpty(cards.length);
}

function renderEmpty(count) {
  if (count > 0) return;
  const empty = document.createElement('div');
  empty.className = 'empty';
  empty.textContent = 'No matching assets.';
  $('grid').append(empty);
}

function render() {
  if (state.mode === 'frames') renderFrames();
  else if (state.mode === 'screens') renderScreens();
  else renderAssets();
}

async function main() {
  const [index, frames, screenMap] = await Promise.all([
    loadJson('./asset_index.json'),
    loadJson('./atlas_frames_runtime.json'),
    loadJson('./screen_asset_map.json'),
  ]);

  state.index = index;
  state.frames = frames;
  state.screenMap = screenMap;

  $('summary').textContent = `${index.assets.length} assets · ${frames.atlases.length} atlases · ${frames.atlases.reduce(
    (sum, atlas) => sum + atlas.frames.length,
    0,
  )} frames`;
  setupControls();
  setActiveTab();
  render();
}

main().catch((error) => {
  console.error(error);
  $('summary').textContent = error.message;
  $('grid').innerHTML = `<div class="empty">${error.message}</div>`;
});
