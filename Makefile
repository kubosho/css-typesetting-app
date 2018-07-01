NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN_DIR := $(NPM_MOD_DIR)/.bin

SRC_DIR := $(CURDIR)/src
DIST_DIR := $(CURDIR)/dist
PUBLIC_DIR := $(CURDIR)/public
ASSETS_DIR := $(CURDIR)/assets

####################################
# Self-documentize utility
####################################
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####################################
# Bootstrap
####################################
.PHONY: init
init: ## Install dependencies.
	yarn

####################################
# Clean
####################################
.PHONY: clean
clean: clean_src clean_dist ## Clean up before building the code.

.PHONY: clean_src
clean_src:
	$(NPM_BIN_DIR)/rimraf $(SRC_DIR)/*.{js,jsx}

.PHONY: clean_dist
clean_dist:
	$(NPM_BIN_DIR)/rimraf $(DIST_DIR)/*.*

####################################
# Test
####################################
.PHONY: test
test: ## Execute test cases.
	$(NPM_BIN_DIR)/ava

.PHONY: update_snapshots
update_snapshots:
	$(NPM_BIN_DIR)/ava --update-snapshots

####################################
# Linter
####################################
.PHONY: lint
lint: lint_js lint_ts lint_pcss ## Lint scripts and stylesheets.

.PHONY: lint_js
lint_js:
	$(NPM_BIN_DIR)/eslint --config $(CURDIR)/.eslintrc.js --ext=.js,.jsx,.mjs $(CURDIR)

.PHONY: lint_ts
lint_ts:
	$(NPM_BIN_DIR)/tslint --config $(CURDIR)/tslint.json --project $(CURDIR)/tsconfig.json

.PHONY: lint_pcss
lint_pcss:
	$(NPM_BIN_DIR)/stylelint --config $(CURDIR)/stylelint.config.js $(CURDIR)/assets

####################################
# Formatter
####################################
.PHONY: format
format: format_js format_ts format_pcss ## Format scripts and stylesheets.

.PHONY: format_js
format_js:
	$(NPM_BIN_DIR)/prettier --config $(CURDIR)/.prettierrc.js --write {$(CURDIR)/*.js,$(CURDIR)/**/*.js}

.PHONY: format_ts
format_ts:
	$(NPM_BIN_DIR)/prettier --config $(CURDIR)/.prettierrc.js --write $(SRC_DIR)/**/*.{ts,tsx}

.PHONY: format_pcss
format_pcss:
	$(NPM_BIN_DIR)/prettier --config $(CURDIR)/.prettierrc.js --write $(ASSETS_DIR)/**/*.pcss

.PHONY: check_format
check_format: format
	git diff --exit-code

####################################
# Copy
####################################
.PHONY: copy
copy: copy_public ## Copy files from public/ to dist/.

.PHONY: copy_public
copy_public:
	$(NPM_BIN_DIR)/cpx "$(PUBLIC_DIR)/*.*" dist/

####################################
# Build
####################################
.PHONY: build
build: ENV ?= dev ## Building scripts and stylesheets.
build:
ifeq ($(ENV),prd)
	$(MAKE) _build RELEASE_CHANNEL=production
else
	$(MAKE) _build RELEASE_CHANNEL=development
endif

.PHONY: _build
_build: clean copy build_scripts build_styles

.PHONY: build_scripts
build_scripts:
	$(NPM_BIN_DIR)/tsc
	$(NPM_BIN_DIR)/webpack --config $(CURDIR)/webpack.config.js

.PHONY: build_styles
build_styles:
	$(NPM_BIN_DIR)/postcss assets/styles/index.pcss --config $(CURDIR)/postcss.config.js --output dist/main.css

####################################
# Preview server
####################################
.PHONY: serve
serve: serve_with_bs ## Launch preview server with browser-sync.

.PHONY: serve_with_bs
serve_with_bs:
	$(NPM_BIN_DIR)/browser-sync start --config $(CURDIR)/bs-config.js
