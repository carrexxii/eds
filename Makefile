SERVER_DIR = "src/server/"
CLIENT_DIR = "src/client/"
WWWROOT    = $(CLIENT_DIR)/"wwwroot"

all: css run

.PHONY: run
run:
	dotnet run --project $(SERVER_DIR)

.PHONY: build
build: css
	dotnet build $(SERVER_DIR)
	dotnet build $(CLIENT_DIR)

.PHONY: restore
restore:
	dotnet tool restore
	dotnet restore $(SERVER_DIR)
	dotnet restore $(CLIENT_DIR)

.PHONY: css
css:
	tailwindcss -i $(CLIENT_DIR)/styles.css -o $(WWWROOT)/styles.css

.PHONY: css-watch
css-watch:
	tailwindcss -i $(CLIENT_DIR)/styles.css -o $(WWWROOT)/styles.css --watch

.PHONY: clean
clean:
	dotnet clean $(SERVER_DIR)
	dotnet clean $(CLIENT_DIR)
	rm $(WWWROOT)/styles.css

.PHONY: remove
remove: clean
	rm -rf $(SERVER_DIR)/bin $(SERVER_DIR)/obj
	rm -rf $(CLIENT_DIR)/bin $(CLIENT_DIR)/obj
