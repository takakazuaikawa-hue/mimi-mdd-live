$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = if ($args.Count -gt 0) { [int]$args[0] } else { 4177 }
$python = "C:\Users\takakazu\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"

Write-Host "Serving asset pack preview from $scriptDir"
Write-Host "Open: http://localhost:$port/preview.html"
Set-Location $scriptDir
& $python -m http.server $port
