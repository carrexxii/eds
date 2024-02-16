# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# COPY ./build /app

# WORKDIR /app
# EXPOSE 5000
# ENTRYPOINT [ "dotnet", "eds.dll" ]

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

RUN apt-get update
RUN apt-get install make
RUN apt-get install npm -y

COPY . .
RUN make release

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
WORKDIR /app
COPY --from=build /app/build /app

ENV ASPNETCORE_ENVIRONMENT=Production
ENV IS_GOOGLE_CLOUD=true

EXPOSE 8080
ENTRYPOINT [ "dotnet", "/app/eds.dll" ]

# # Install node
# ARG NODE_MAJOR=20
# RUN apt-get update
# RUN apt-get install -y ca-certificates curl gnupg
# RUN mkdir -p /etc/apt/keyrings
# RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
# RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
# RUN apt-get update && apt-get install nodejs -y

# WORKDIR /workspace
# COPY . .
# RUN dotnet tool restore
# RUN dotnet run Bundle

# COPY --from=build /workspace/deploy /app
# WORKDIR /app
# EXPOSE 5000
# ENTRYPOINT [ "dotnet", "Server.dll" ]