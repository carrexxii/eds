SOURCE_DIR := ./src
BUILD_DIR  := ./build
WWW_ROOT   := ./wwwroot

CLIENT_PROJS := $(filter-out $(wildcard ./src/shared/*), $(wildcard ./src/*/*.fsproj))
CLIENTS      := $(basename $(notdir $(CLIENT_PROJS)))
CLIENT_COUNT := $(words $(CLIENTS))

all: run

.PHONY: run
run: build
	@dotnet run

.PHONY: build
build: css js
	@read
	@npx webpack
	@dotnet build

.PHONY: watch
watch: build
	@trap '$(foreach count,                      \
		$(shell seq 1 $$(($(CLIENT_COUNT) + 2))), \
		kill %$(count);)' SIGINT
	@npx tailwindcss -i $(SOURCE_DIR)/styles.css -o $(WWW_ROOT)/styles.css --watch=always &
	@$(foreach proj, $(CLIENT_PROJS),                                            \
		(dotnet fable watch $(proj) -o $(BUILD_DIR)/$(basename $(notdir $(proj))) \
		--noRestore --silent --runWatch npx webpack &);)
	@dotnet watch

.PHONY: js
js:
	@$(foreach dir, $(CLIENTS), mkdir $(BUILD_DIR)/$(dir) -p;)
	@$(foreach proj, $(CLIENT_PROJS), \
		(dotnet fable watch $(proj) -o $(BUILD_DIR)/$(basename $(notdir $(proj))) --noRestore --silent &);)
	@read

.PHONY: css
css:
	@npx tailwindcss -i $(SOURCE_DIR)/styles.css -o $(WWW_ROOT)/styles.css --watch=always

.PHONY: pack
pack:
	@npx webpack watch

.PHONY: restore
restore:
	@npm install &
	@git submodule update --remote --merge &
	@dotnet tool restore &
	@dotnet restore
	@$(foreach proj, $(CLIENT_PROJS), (dotnet restore $(proj) &);)
	@cp ./data/* $(WWW_ROOT)/

.PHONY: clean
clean:
	@$(foreach proj, $(CLIENT_PROJS), dotnet clean $(proj);)
	@dotnet clean
	@dotnet fable clean --yes
	@rm -rf wwwroot/*

.PHONY: remove
remove: clean
	@$(foreach dir,                                                       \
		$(wildcard $(SOURCE_DIR)/*/bin/) $(wildcard $(SOURCE_DIR)/*/obj/), \
		(rm -rf $(dir));)
	@rm -rf ./bin ./obj
	@rm -rf ./node_modules
	@rm -f  ./*-lock.*
	@rm -rf $(shell grep path .gitmodules | sed 's/.*= //')
	@$(foreach dir, $(CLIENTS), rm -rf $(BUILD_DIR)/$(dir);)

.PHONY: cloc
cloc:
	@cloc --vcs=git
