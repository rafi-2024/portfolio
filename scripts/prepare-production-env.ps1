$ErrorActionPreference = 'Stop'

$repositoryRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
$environmentPath = Join-Path $repositoryRoot '.env.production'

if (-not (Test-Path $environmentPath)) {
    Copy-Item (Join-Path $repositoryRoot '.env.production.example') $environmentPath
}

$lines = [System.Collections.Generic.List[string]]::new()
Get-Content $environmentPath | ForEach-Object { [void]$lines.Add($_) }

function Get-EnvValue([string]$name) {
    $line = $lines | Where-Object { $_ -match "^$name=" } | Select-Object -First 1
    if ($null -eq $line) { return $null }
    return ($line -replace "^$name=", '').Trim('"')
}

function Set-EnvValue([string]$name, [string]$value) {
    $replacement = '{0}="{1}"' -f $name, $value
    for ($index = 0; $index -lt $lines.Count; $index++) {
        if ($lines[$index] -match "^$name=") {
            $lines[$index] = $replacement
            return
        }
    }
    [void]$lines.Add($replacement)
}

function New-Secret {
    $bytes = [byte[]]::new(32)
    $random = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try { $random.GetBytes($bytes) } finally { $random.Dispose() }
    return [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
}

$defaults = @{
    'NODE_ENV' = 'production'
    'NEXT_TELEMETRY_DISABLED' = '1'
    'POSTGRES_USER' = 'portfolio_user'
    'POSTGRES_DB' = 'portfolio_db'
    'N8N_BASIC_AUTH_ACTIVE' = 'true'
    'N8N_BASIC_AUTH_USER' = 'admin'
    'N8N_PUBLIC_WEBHOOK_URL' = 'http://localhost:5678/'
    'N8N_WEBHOOK_URL' = 'http://n8n:5678/webhook/contact-form'
    'APP_PORT' = '3000'
}

foreach ($entry in $defaults.GetEnumerator()) {
    $currentValue = Get-EnvValue $entry.Key
    if ([string]::IsNullOrWhiteSpace($currentValue) -or ($entry.Key -eq 'N8N_WEBHOOK_URL' -and $currentValue -like 'https://your-n8n-service*')) {
        Set-EnvValue $entry.Key $entry.Value
    }
}

foreach ($secretName in @('POSTGRES_PASSWORD', 'N8N_BASIC_AUTH_PASSWORD')) {
    $currentValue = Get-EnvValue $secretName
    if ([string]::IsNullOrWhiteSpace($currentValue) -or $currentValue -like 'replace-with-*' -or $currentValue -eq 'changeme') {
        Set-EnvValue $secretName (New-Secret)
    }
}

Set-Content -Path $environmentPath -Value $lines -Encoding utf8
Write-Host "Prepared $environmentPath. Existing non-placeholder values were preserved."
Write-Host 'Keep .env.production private; it is excluded by .gitignore.'
