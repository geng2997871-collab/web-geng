$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$url = 'http://127.0.0.1:5173/'
$viteJs = Join-Path $projectDir 'node_modules\vite\bin\vite.js'
$fallbackNode = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'

function Test-PortfolioServer {
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2
        return $response.StatusCode -eq 200
    }
    catch {
        return $false
    }
}

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodeExe = if ($nodeCommand) { $nodeCommand.Source } else { $null }

if (-not $nodeExe -and (Test-Path $fallbackNode)) {
    $nodeExe = $fallbackNode
}

if (-not (Test-Path $viteJs)) {
    Write-Host ''
    Write-Host '[ERROR] Missing file:' -ForegroundColor Red
    Write-Host $viteJs
    exit 1
}

if (-not $nodeExe) {
    Write-Host ''
    Write-Host '[ERROR] Node.js was not found.' -ForegroundColor Red
    exit 1
}

if (Test-PortfolioServer) {
    Start-Process $url | Out-Null
    exit 0
}

Start-Process -FilePath $nodeExe -ArgumentList "`"$viteJs`" --host 127.0.0.1" -WorkingDirectory $projectDir -WindowStyle Minimized | Out-Null

for ($i = 0; $i -lt 15; $i++) {
    Start-Sleep -Seconds 1
    if (Test-PortfolioServer) {
        Start-Process $url | Out-Null
        exit 0
    }
}

Start-Process $url | Out-Null
Write-Host ''
Write-Host '[INFO] The local server is still starting.' -ForegroundColor Yellow
Write-Host $url
exit 0
