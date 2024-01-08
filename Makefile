SERVER_DIR = "src/server/"
CLIENT_DIR = "src/client/"

all: css run

.PHONY: run
run:
	dotnet run --project $(SERVER_DIR)

.PHONY: watch
watch:
	dotnet watch run --project $(SERVER_DIR)

.PHONY: build
build: css
	dotnet build $(SERVER_DIR)
	dotnet build $(CLIENT_DIR)

.PHONY: watch-css
watch-css:
	npx tailwindcss -i $(SERVER_DIR)/templates/styles.css -o $(CLIENT_DIR)/wwwroot/styles.css --watch

.PHONY: restore
restore:
	dotnet tool restore
	dotnet restore $(SERVER_DIR)
	dotnet restore $(CLIENT_DIR)

.PHONY: css
css:
	npx tailwindcss -i $(SERVER_DIR)/templates/styles.css -o $(CLIENT_DIR)/wwwroot/styles.css

.PHONY: clean
clean:
	dotnet clean $(SERVER_DIR)
	dotnet clean $(CLIENT_DIR)
	rm $(CLIENT_DIR)/wwwroot/styles.css

.PHONY: remove
remove: clean
	rm -rf $(SERVER_DIR)/bin $(SERVER_DIR)/obj
	rm -rf $(CLIENT_DIR)/bin $(CLIENT_DIR)/obj
