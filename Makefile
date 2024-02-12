SOURCE_DIR := ./src
BUILD_DIR  := ./build
WWW_ROOT   := ./wwwroot

CLIENT_PROJS := $(filter-out $(wildcard ./src/shared/*), $(wildcard ./src/*/*.fsproj))
CLIENTS      := $(basename $(notdir $(CLIENT_PROJS)))
CLIENT_COUNT := $(words $(CLIENTS))

all: restore

.PHONY: maths csc user
maths:
	dotnet fable watch $(SOURCE_DIR)/maths/maths.fsproj -o $(BUILD_DIR)/maths --noRestore --silent
csc:
	dotnet fable watch $(SOURCE_DIR)/csc/csc.fsproj -o $(BUILD_DIR)/csc --noRestore --silent
user:
	dotnet fable watch $(SOURCE_DIR)/user/user.fsproj -o $(BUILD_DIR)/user --noRestore --silent

.PHONY: css
css:
	@npx tailwindcss -i $(SOURCE_DIR)/styles.css -o $(WWW_ROOT)/styles.css --watch

.PHONY: pack
pack:
	@npx webpack watch

.PHONY: restore
restore:
	@npm install
	@git submodule update --remote --merge
	@dotnet tool restore
	@dotnet restore
	@$(foreach proj, $(CLIENT_PROJS), (dotnet restore $(proj));)
	@cp -r ./data/* $(WWW_ROOT)/

.PHONY: clean
clean:
	@$(foreach proj, $(CLIENT_PROJS), dotnet clean $(proj);)
	@dotnet clean
	@dotnet fable clean --yes
	@rm -rf wwwroot/*
	@$(foreach dir, $(CLIENTS), rm -rf $(BUILD_DIR)/$(dir);)

.PHONY: remove
remove: clean
	@$(foreach dir,                                                       \
		$(wildcard $(SOURCE_DIR)/*/bin/) $(wildcard $(SOURCE_DIR)/*/obj/), \
		(rm -rf $(dir));)
	@rm -rf ./bin ./obj
	@rm -rf ./node_modules
	@rm -f  ./*-lock.*
	@rm -rf $(shell grep path .gitmodules | sed 's/.*= //')

.PHONY: cloc
cloc:
	@cloc --vcs=git
