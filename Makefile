SERVER_DIR = "src/server/"
CLIENT_DIR = "src/client/"

all: run

.PHONY: run
run:
	dotnet run --project $(SERVER_DIR)

.PHONY: build
build:
	dotnet build $(SERVER_DIR)
	dotnet build $(CLIENT_DIR)

.PHONY: restore
restore:
	dotnet tool restore
	dotnet restore $(SERVER_DIR)
	dotnet restore $(CLIENT_DIR)

.PHONY: clean
clean:
	dotnet clean $(SERVER_DIR)
	dotnet clean $(CLIENT_DIR)

.PHONY: remove
remove: clean
	rm -rf $(SERVER_DIR)/bin $(SERVER_DIR)/obj
	rm -rf $(CLIENT_DIR)/bin $(CLIENT_DIR)/obj
