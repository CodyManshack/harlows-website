# img_optimize.ps1
# Usage: .\img_optimize.ps1 source-image.jpg basename
# Example: .\img_optimize.ps1 source-3000.png drink


param(
    [string]$Source,
    [string]$Base = "drink"
)

if (-not $Source) {
    Write-Host "Usage: .\img_optimize.ps1 source-image.jpg [basename]"
    exit 1
}


# Create output folder
$outDir = Join-Path -Path (Get-Location) -ChildPath $Base
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir | Out-Null
}

$ext = [System.IO.Path]::GetExtension($Source).ToLower()
$tmpSrc = $Source
if ($ext -eq ".png") {
    $tmpSrc = "$env:TEMP\${Base}_tmp.jpg"
    magick $Source -background white -flatten $tmpSrc
    Write-Host "Converted $Source to $tmpSrc (JPG)"
}

$sizes = @(400, 800, 1200, 2000)
foreach ($sz in $sizes) {
    $outFile = Join-Path $outDir "${Base}-$sz.jpg"
    magick $tmpSrc -resize "${sz}x${sz}^" -gravity center -extent "${sz}x${sz}" $outFile
    Write-Host "Created $outFile"
}

if ($tmpSrc -ne $Source -and (Test-Path $tmpSrc)) {
    Remove-Item $tmpSrc
}
