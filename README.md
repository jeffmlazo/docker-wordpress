The installation tool kit, provided here, include:

- MariaDB/MySQL used for Wordpress database
- Adminer database management system to connect to your MariaDB database
- WP-Cli: Wordpress Command Line Interface
- Makefile directives for automatization.

### Requirements

- Chocolatey - for installing GNU Make in Windows machine
- Docker
- GNU Make

### Installing GNU Make (Windows)

1. Open **poweshell.exe** & run as an **administrator**.

2. Goto https://chocolatey.org and check the powershell command in **step 2** or just copy & paste the command below.

   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
   ```

3. Close the poweshell. Open & run it again as an **administrator**.

4. Install the **gnu make** by running the command.

   ```powershell
   choco install make
   ```

5. Done!. You can now use make globally.

&nbsp;
&nbsp;

### Quick Setup

1. Open terminal or commandline to download the source using git.

   ```bash
   # Download a wordpress docker-compose example
   git clone https://github.com/jeffmlazo/docker-wordpress
   ```

2. Change to the directory.
   ```bash
   # Change directory
   cd docker-wordpress
   ```
3. Edit the .env file base in you're configuration.

   > **NOTE:** If you're adding a downloaded **zip file** **theme(s)** or **plugin(s)** for the 1st time of installation in you're local machine. You must manually create a folder that has a name **WordPressThemes** & create another folder inside of it with **plugins** folder in you're home directory and put all you're themes & plugins inside of it. You can modify the default folder names as well if you like.

   ```bash
   # 1/ Project name -------------------------------------------------
   # Must be lower-case, no spaces and no invalid path chars.
   # Will be used also as the WP database name
   COMPOSE_PROJECT_NAME=wordpress

   # 2/ Database user, user password and root password -----------------------------------------
   # Set non-root database user if wanted (optional)
   DB_USER=user
   DB_PASSWORD=password
   DB_ROOT_PASSWORD=root_password
   DB_NAME=wordpress_db

   # 3/ For wordpress auto-install and auto-configuration -------------------
   WORDPRESS_WEBSITE_TITLE="My Personal Blog"
   WORDPRESS_TABLE_PREFIX="wp_"

   # URL
   WORDPRESS_WEBSITE_URL="http://localhost"
   WORDPRESS_WEBSITE_URL_WITHOUT_HTTP=localhost
   WORDPRESS_WEBSITE_POST_URL_STRUCTURE="/blog/%postname%/"

   # Website admin identification. Specify a strong password
   WORDPRESS_ADMIN_USER="wordpress"
   WORDPRESS_ADMIN_PASSWORD="wordpress"
   WORDPRESS_ADMIN_EMAIL="your-email@example.com"

   # 4/ Software versions -----------------------------------------------
   WORDPRESS_VERSION="latest"
   MARIADB_VERSION="latest"
   PHPMYADMIN_VERSION="latest"
   ADMINER_VERSION="latest"

   # 5/ Ports: Can be changed -------------------------------------------
   ADMINER_PORT=8080
   WORDPRESS_PORT=80
   MARIADB_PORT=3306

   # 6/ Volumes on host --------------------------------------------------
   #-------------------- DEFAULT FOLDERS --------------------#
   WORDPRESS_THEME_FOLDER="WordPressThemes"
   WORDPRESS_THEME_PLUGIN_FOLDER="plugins"

   #-------------------- WORDPRESS LOCAL, THEME & PLUGIN DIRECTORY --------------------#
   WORDPRESS_LOCAL_DIR="./wordpress"
   WORDPRESS_THEME_LOCAL_DIR="~/${WORDPRESS_THEME_FOLDER}"
   WORDPRESS_THEME_PLUGIN_LOCAL_DIR="~/${WORDPRESS_THEME_FOLDER}/${WORDPRESS_THEME_PLUGIN_FOLDER}"

   #-------------------- CONTAINER ROOT DIRECTORY --------------------#
   WORDPRESS_CONTAINER_DIR="/var/www/html"
   WORDPRESS_THEME_CONTAINER_ROOT_DIR="/${WORDPRESS_THEME_FOLDER}"
   WORDPRESS_THEME_PLUGIN_CONTAINER_ROOT_DIR="/${WORDPRESS_THEME_FOLDER}/${WORDPRESS_THEME_PLUGIN_FOLDER}"

   # 7/ Healthcheck availability of host services (mysql and woordpress server)
   # Waiting time in second
   WAIT_BEFORE_HOSTS=5
   WAIT_AFTER_HOSTS=5
   WAIT_HOSTS_TIMEOUT=300
   WAIT_SLEEP_INTERVAL=60
   WAIT_HOST_CONNECT_TIMEOUT=5

   # 8/ Used only in online deployment --------------------------------------
   WORDPRESS_WEBSITE_URL_WITHOUT_WWW=example.com
   WEBSITE_URL_WITHOUT_HTTP=sql.example.com

   # 9/ Wordpress Themes, Plugins, Posts & Pages --------------------------------------
   # NOTE: Spaces are case sensitive here 1 space needed per theme or plugin for local or repo and .zip extension is needed for local theme & plugins.
   #-------------------- THEMES & PLUGINS --------------------#
   WORDPRESS_LOCAL_THEMES="unos.2.7.2.zip"
   WORDPRESS_REPO_THEMES="sydney calliope newsberg"
   # WORDPRESS_REPO_THEMES_VERSION="2.7.2 1.0.2 0.7" #TODO: version flag is not yet working
   WORDPRESS_LOCAL_PLUGINS="all-in-one-wp-migration.6.82.zip all-in-one-wp-migration-file-extension.zip carousel-slider.zip"
   WORDPRESS_REPO_PLUGINS="contact-form-7"

   #-------------------- DEFAULT THEMES, PLUGINS, POSTS & PAGES --------------------#
   WORDPRESS_DEFAULT_THEMES="twentytwenty twentynineteen twentyseventeen twentysixteen"
   WORDPRESS_DEFAULT_PLUGINS="hello akismet"
   # Hello world! post & Sample & Privacy Policy page
   WORDPRESS_DEFAULT_POSTS_PAGES="1 2 3"
   ```

4. Run the make command to build and start the installation.

   ```bash
   # Build and start installation
   make autoinstall
   ```

5. Done!

Visit your site at <http://localhost> and your database via Adminer
at <http://localhost:8080>.

Default identification for your wordpress website admin:

- `Username: wordpress` and
- `Password: wordpress`

Default identification for the phpMyAdmin interface:

- `Username: user` and
- `Password: password`

## **Useful set of commands to know**:

### Docker-compose

```bash
# Stop and remove containers
docker-compose down

# Build, and start the wordpress website
docker-compose up -d --build

# Reset everything
docker-compose down
rm -rf certs/* certs-data/* logs/nginx/* mysql/* wordpress/*

# Run wpcli as a service in terminal
docker-compose run --rm wpcli bash
```

### Makefile

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
run-wpcli:
	docker-compose run --rm wpcli bash

```

## References

- [Github Fork From: KASSAMBARA](https://github.com/kassambara/wordpress-docker-compose)
- [Docker Official Website](https://www.docker.com)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Chocolatey Official Website](https://chocolatey.org/)
