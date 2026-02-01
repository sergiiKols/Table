# Используем официальный образ .NET SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Копируем csproj и восстанавливаем зависимости
COPY ["DataManagementSystem.API.csproj", "./"]
RUN dotnet restore "DataManagementSystem.API.csproj"

# Копируем все файлы и собираем проект
COPY . .
RUN dotnet publish "DataManagementSystem.API.csproj" -c Release -o /app/publish

# Используем runtime образ для запуска
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Копируем startup скрипт
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Используем shell скрипт для запуска с правильной переменной окружения
ENTRYPOINT ["/app/start.sh"]
