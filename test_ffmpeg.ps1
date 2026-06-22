$ffmpegPath = Get-ChildItem -Path $env:LOCALAPPDATA\Microsoft\WinGet\Packages -Filter ffmpeg.exe -Recurse -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName -First 1
if ($ffmpegPath) {
    & $ffmpegPath -i "public\zaidsaifi15_pindown.io_1782033607.mp4" -vf fps=24 -vcodec libwebp -f image2 -vframes 5 "public\frames\test_%04d.webp"
}
