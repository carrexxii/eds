SOURCE_DIR = ./src
WWW_ROOT   = ./wwwroot
CLIENTS    = $(filter-out ./src/shared/, $(wildcard ./src/*/))

all: run

.PHONY: run
run: build
	dotnet run

.PHONY: build
build: css js
	npx webpack
	dotnet build

.PHONY: watch
watch: js
	# Need CLIENTS count + 2 for tailwind and webpack
	trap '$(foreach COUNT, 1 2 3 4 5, kill %$(COUNT);)' SIGINT
	npx tailwindcss -i $(SOURCE_DIR)/styles.css -o $(WWW_ROOT)/styles.css --watch=always &
	$(foreach DIR, $(CLIENTS), (dotnet fable watch $(DIR) -o $(DIR)js &);)
	npx webpack --watch &
	dotnet watch

.PHONY: js
js:
	$(foreach DIR, $(CLIENTS), dotnet fable $(DIR) -o $(DIR)js;)

.PHONY: css
css:
	npx tailwindcss -i $(SOURCE_DIR)/styles.css -o $(WWW_ROOT)/styles.css

.PHONY: restore
restore:
	dotnet tool restore &
	dotnet restore
	$(foreach DIR, $(CLIENTS), (dotnet femto $(DIR) &);)
	$(foreach DIR, $(CLIENTS), (dotnet restore $(DIR) &);)
	cp ./data/* $(WWW_ROOT)/

.PHONY: clean
clean:
	dotnet clean
	$(foreach DIR, $(CLIENTS), dotnet clean $(DIR);)
	dotnet fable clean --yes
	$(foreach DIR, $(CLIENTS), rm -rf $(DIR)js/*;)
	rm -rf wwwroot/*

.PHONY: remove
remove: clean
	rm -rf ./bin ./obj
	$(foreach DIR, $(CLIENTS), rm -rf $(DIR)bin $(DIR)obj;)
	rm -rf ./node_modules
	rm -f  ./*-lock.*

.PHONY: cloc
cloc:
	cloc --vcs=git
