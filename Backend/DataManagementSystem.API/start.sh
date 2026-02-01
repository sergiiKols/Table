#!/bin/bash
# Startup script для Render.com
# Устанавливаем ASPNETCORE_URLS используя переменную окружения PORT

export ASPNETCORE_URLS="http://0.0.0.0:${PORT:-10000}"

echo "Starting application on $ASPNETCORE_URLS"

dotnet DataManagementSystem.API.dll
