$ffmpegPath = Get-ChildItem -Path $env:LOCALAPPDATA\Microsoft\WinGet\Packages -Filter ffmpeg.exe -Recurse -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName -First 1
if ($ffmpegPath) {
    Remove-Item -Path "public\frames\*" -Force
    & $ffmpegPath -i "public\zaidsaifi15_pindown.io_1782033607.mp4" -vf fps=24 -vcodec libwebp -lossless 0 -compression_level 4 -q:v 80 -f image2 "public\frames\frame_%04d.webp"
}
