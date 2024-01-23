SOURCE_DIR = ./src
CLIENT_DIR = ./src/client
WWW_ROOT   = ./wwwroot

all: run

.PHONY: run
run: build
	dotnet run

.PHONY: build
build: css js
	npx webpack
	dotnet build

# .PHONY: watch
# watch:
# 	npx tailwindcss -i $(CLIENT_DIR)/styles.css -o $(WWW_ROOT)/styles.css --watch &
# 	dotnet fable watch $(CLIENT_DIR) -o $(CLIENT_DIR)/js -s &
# 	npx webpack --watch &
# 	dotnet watch

.PHONY: js
js:
	dotnet fable $(CLIENT_DIR) -o $(CLIENT_DIR)/js -s

.PHONY: css
css:
	npx tailwindcss -i $(CLIENT_DIR)/styles.css -o $(WWW_ROOT)/styles.css

.PHONY: restore
restore:
	npm install
	dotnet tool restore
	dotnet restore
	dotnet femto $(CLIENT_DIR)

.PHONY: clean
clean:
	dotnet clean
	dotnet clean $(CLIENT_DIR)
	dotnet fable clean --yes
	rm -rf $(CLIENT_DIR)/js/*
	rm -rf wwwroot/*

.PHONY: remove
remove: clean
	rm -rf ./bin ./obj
	rm -rf ./$(CLIENT_DIR)/bin ./$(CLIENT_DIR)/obj
	rm -rf ./node_modules
	rm -f  ./*-lock.*

.PHONY: cloc
cloc:
	cloc $(SOURCE_DIR) --include-lang F#
