FROM mcr.microsoft.com/dotnet/sdk:8.0 AS compile

RUN apt-get update
RUN apt-get install make
RUN apt-get install npm -y

WORKDIR /build
COPY . .
RUN make release

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
COPY --from=compile /build/build /app

ENV ASPNETCORE_ENVIRONMENT=Development
ENV IS_GOOGLE_CLOUD=true

WORKDIR /app
EXPOSE 8080
ENTRYPOINT [ "dotnet", "/app/eds.dll" ]
