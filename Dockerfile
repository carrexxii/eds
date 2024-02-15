FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
COPY ./build /app

WORKDIR /app
EXPOSE 5000
ENTRYPOINT [ "dotnet", "eds.dll" ]
