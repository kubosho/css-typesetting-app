NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN_DIR := $(NPM_MOD_DIR)/.bin

SRC_DIR := $(CURDIR)/src
PUBLIC_DIR := $(CURDIR)/public

####################################
# Self-documentize utility
####################################
.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####################################
# Clean
####################################
.PHONY: clean
clean: clean_src ## Clean up before building the code.

.PHONY: clean_src
clean_src:
	$(NPM_BIN_DIR)/rimraf $(SRC_DIR)/*.js

####################################
# Copy
####################################
.PHONY: copy
copy: copy_public ## Copy some files to dist/.

.PHONY: copy_public
copy_public:
	$(NPM_BIN_DIR)/cpx "$(PUBLIC_DIR)/*.*" dist/

####################################
# Build
####################################
.PHONY: build
build: ENV ?= dev ## Building some sources.
build: copy build_scripts build_styles

.PHONY: build_scripts
build_scripts:
	$(NPM_BIN_DIR)/tsc
ifeq ($(ENV),prd)
	RELEASE_CHANNEL=production
	$(NPM_BIN_DIR)/webpack --mode production
else
	RELEASE_CHANNEL=development
	$(NPM_BIN_DIR)/webpack --mode development
endif

.PHONY: build_styles
build_styles:
	$(NPM_BIN_DIR)/postcss assets/styles/index.pcss --config postcss.config.js --output dist/main.css

####################################
# Preview server
####################################
.PHONY: serve
serve: serve_with_bs ## Launch preview server with browser-sync.

.PHONY: serve_with_bs
serve_with_bs:
	$(NPM_BIN_DIR)/browser-sync start --config bs-config.js
