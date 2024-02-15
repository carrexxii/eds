# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# COPY ./build /app
# COPY ./data /

# FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
# WORKDIR /app
# EXPOSE 5000
# ENTRYPOINT [ "dotnet", "eds" ]

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

RUN apt-get update
RUN apt-get install make -y
RUN apt-get install npm -y

WORKDIR /workspace
COPY . .
RUN make release

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
COPY --from=build /workspace/deploy /app
WORKDIR /app
EXPOSE 5000
ENTRYPOINT [ "dotnet", "eds" ]
