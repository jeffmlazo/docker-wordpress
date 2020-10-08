include .env

##############################
#	CONDITIONAL STATEMENTS	
##############################
# Replace all " to empty to remove it using subst
wpCustomThemeDir = $(subst ",,${CUSTOM_THEME_DIR})
wpCustomThemeSrcDir = $(subst ",,${CUSTOM_THEME_SRC_DIR})
wpCustomThemeSrcJsDir = $(subst ",,${CUSTOM_THEME_SRC_JS_DIR})
wpCustomThemeSrcSassDir = $(subst ",,${CUSTOM_THEME_SRC_SASS_DIR})
srcDirs = $(wpCustomThemeDir) $(wpCustomThemeSrcDir) $(wpCustomThemeSrcJsDir) $(wpCustomThemeSrcSassDir)
wpCustomThemeJsFiles = $(subst ",,${CUSTOM_THEME_SRC_JS_FILES})
wpCustomThemeSassFiles = $(subst ",,${CUSTOM_THEME_SRC_SASS_FILES})
# Loop all js files then assign it with the js source path directory
jsFiles := $(foreach jsFile,$(wpCustomThemeJsFiles),$(wpCustomThemeSrcJsDir)/$(jsFile))
# Loop all js files then assign it with the js source path directory
sassFiles := $(foreach sassFile,$(wpCustomThemeSassFiles),$(wpCustomThemeSrcSassDir)/$(sassFile))

#################
#	COMMANDS	
#################
# Start the wordpress website
start:
	docker-compose up -d

# Restart the container
restart: down start

# Build and start the wordpress website
build:
	docker-compose up -d --build

# Run healthcheck
healthcheck:
	docker-compose run --rm healthcheck

# Stop current running containers
down:
	docker-compose down

# Run the build & healthcheck
install: build healthcheck

# Build and start the wordpress website using wpcli configurations
configure:
	docker-compose -f docker-compose.yml -f wp-auto-config.yml run --rm wp-auto-config

# Build and start the wordpress website using wpcli configurations
autoinstall: build
	@echo "⚙️ Installing wordpress using wpcli..."
	docker-compose -f docker-compose.yml -f wp-auto-config.yml run --rm wp-auto-config

# Clean/Delete all installed wordpress & database setup
clean: down
	@echo "💥 Removing related folders/files..."
	@rm -rf  mysql/* wordpress/* wordpress/.htaccess
	@echo "\n⚙️ Related folders/files has been removed..."

# Run wpcli in the terminal
run-wpcli:
	docker-compose run --rm wpcli bash

# Remove all stopped containers
remove-containers:
	docker rm -f $(docker ps -aq) 

# Generate source files for custom theme
gen-src:
	@echo -e "⚙️ Generating source files...\n"
ifdef srcDirs
	@mkdir -pv $(srcDirs)
endif
ifdef jsFiles
	touch $(jsFiles)
endif
ifdef sassFiles
	touch $(sassFiles)
endif
	@echo -e "\n⚙️ Source files have been generated..."
