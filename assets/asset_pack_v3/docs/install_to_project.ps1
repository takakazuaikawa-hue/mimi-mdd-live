param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectRoot,

  [string]$AssetSubdir = "public/assets/mimi_mad_doctor"
)

$ErrorActionPreference = "Stop"

$packRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$projectRootResolved = Resolve-Path $ProjectRoot
$destination = Join-Path $projectRootResolved $AssetSubdir

New-Item -ItemType Directory -Force -Path $destination | Out-Null

$items = @(
  "backgrounds",
  "atlases",
  "ui",
  "events",
  "sprites",
  "asset_index.json",
  "asset_groups.json",
  "atlas_frames_runtime.json",
  "screen_asset_map.json"
)

foreach ($item in $items) {
  $source = Join-Path $packRoot $item
  $target = Join-Path $destination $item
  if (Test-Path $source -PathType Container) {
    Copy-Item -Path $source -Destination $destination -Recurse -Force
  } else {
    Copy-Item -Path $source -Destination $target -Force
  }
}

Write-Host "Installed asset pack to: $destination"
Write-Host "Use base URL: /assets/mimi_mad_doctor"
