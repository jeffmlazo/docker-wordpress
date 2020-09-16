# Include the .env local file
include .env

# Start the wordpress website
start:
	docker-compose up -d

# Build and start the wordpress website
build:
	docker-compose up -d --build

# Run healthcheck
healthcheck:
	docker-compose run --rm healthcheck

# Reset everything
down:
	docker-compose down

# Run the build & healthcheck
install: build healthcheck

# Build and start the wordpress website using wpcli configurations
configure:
	docker-compose -f docker-compose.yml -f wp-auto-config.yml run --rm wp-auto-config

# Build and start the wordpress website using wpcli configurations
autoinstall: build
	@echo "⚙️ Creating Theme & Plugin folders in the host Home directory..."
	-mkdir ~/${WORDPRESS_THEME_FOLDER} ~/${WORDPRESS_THEME_PLUGIN_FOLDER}

	@echo "⚙️ Installing wordpress using wpcli..."
	docker-compose -f docker-compose.yml -f wp-auto-config.yml run --rm wp-auto-config

# Clean/Delete all installed wordpress & database setup
clean: down
	@echo "💥 Removing related folders/files..."
	@rm -rf  mysql/* wordpress/* wordpress/.htaccess

# Run wpcli in the terminal
start-wpcli:
	docker-compose run --rm wpcli bash
