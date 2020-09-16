The installation tool kit, provided here, include:

- MariaDB/MySQL used for Wordpress database
- Adminer database management system to connect to your MariaDB database
- WP-Cli: Wordpress Command Line Interface
- Makefile directives for automatization.

You can automatically deploy a local docker wordpress site in 5 minutes
using the following commands:

```bash
# Download a wordpress docker-compose example
git clone https://github.com/jeffmlazo/docker-wordpress
cd docker-wordpress
# Build and start installation
docker-compose up -d --build
# Run wpcli as a service in terminal
docker-compose run --rm wpcli bash
```

Visit your site at <http://localhost> and your database via Adminer
at <http://localhost:8080>.

Default identification for your wordpress website admin:

- `Username: wordpress` and
- `Password: wordpress`

Default identification for the phpMyAdmin interface:

- `Username: user` and
- `Password: password`

**Useful set of commands to know**:

#### Docker-compose

```bash
# Stop and remove containers
docker-compose down
# Build, and start the wordpress website
docker-compose up -d --build
# Reset everything
docker-compose down
rm -rf certs/* certs-data/* logs/nginx/* mysql/* wordpress/*
```

#### Makefile

**NOTE:** You can use these makefile commands as an alternative for docker-compose commands. This will use the setup for wpcli options and you don't use the browser for installing wordpress.

```bash
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
	docker-compose -f docker-compose.yml -f wp-auto-config.yml run --rm wp-auto-config

# Clean/Delete all installed wordpress & database setup
clean: down
	@echo "💥 Removing related folders/files..."
	@rm -rf  mysql/* wordpress/* wordpress/.htaccess

# Run wpcli in the terminal
start-wpcli:
	docker-compose run --rm wpcli bash

```

## References

- [Github Fork From: KASSAMBARA](https://github.com/kassambara/wordpress-docker-compose)
