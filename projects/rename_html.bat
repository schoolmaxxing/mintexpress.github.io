@echo off
for /d %%d in (*) do call :renamehtml "%%d"
goto :eof

:renamehtml
pushd %1
for %%f in (*.html) do (
    if /I not "%%f"=="index.html" (
        ren "%%f" "index.html"
        echo Renamed %%f in %1 to index.html
        goto :done
    )
)
:done
popd
