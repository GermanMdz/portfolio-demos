FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY http_server/http_server.csproj ./http_server/
RUN dotnet restore ./http_server/http_server.csproj

COPY http_server/. ./http_server/
RUN dotnet publish ./http_server/http_server.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

ENV DOTNET_RUNNING_IN_CONTAINER=true \
    PORT=5002

COPY --from=build /app/publish ./
COPY static ./static
COPY demo-files ./demo-files

EXPOSE 5002

CMD ["sh", "-c", "mkdir -p /app/demo-files && dotnet /app/http_server.dll --port ${PORT} --directory /app/demo-files --static /app/static"]
