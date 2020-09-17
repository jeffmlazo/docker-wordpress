The installation tool kit, provided here, include:

- MariaDB/MySQL used for Wordpress database
- Adminer database management system to connect to your MariaDB database
- WP-Cli: Wordpress Command Line Interface
- Makefile directives for automatization.

### Requirements

---

- MinGW = for installing GNU Make in Windows machine
- Docker
- GNU Make

### Installing GNU Make (Windows)

---

1. Goto http://www.mingw.org/ & download the **mingw-get-setup.exe** to install it.

2. Add the following **Environment Variable** in the **Advanced system settings** or by running it in the command line.

   **(Option #1)** Using the Advanced system settings just add it in the path variable.

   c:\MinGW\bin

   **(Option #2)** Using the command line and make sure you run the cmd as an **Administrator** then close it after you've enter the commands.

   ```cmd
   setx /M PATH "%PATH%;c:\MinGW\bin"
   ```

3. Open cmd or terminal & goto **c:\MinGW\bin** directory

   ```cmd
   cd c:\MinGW\bin
   ```

4. Install the gnu make by running the command

   ```cmd
   mingw-get install mingw32-make
   ```

5. Run the command to copy the **mingw32-make.exe** to **make.exe** inside c:\MinGW\bin directory

   **Windows Command**

   ```cmd
   copy c:\MinGW\bin\mingw32-make.exe c:\MinGW\bin\make.exe
   ```

   **Cmdr or Bash**

   ```bash
   cp mingw32-make.exe make.exe
   ```

6. Done!. You can now use make globally.

&nbsp;
&nbsp;

#### You can automatically deploy a local docker wordpress site in 5 minutes using the following commands:

```bash
# Download a wordpress docker-compose example
git clone https://github.com/jeffmlazo/docker-wordpress
cd docker-wordpress
# Build and start installation
docker-compose up -d --build

```

Visit your site at <http://localhost> and your database via Adminer
at <http://localhost:8080>.

Default identification for your wordpress website admin:

- `Username: wordpress` and
- `Password: wordpress`

Default identification for the phpMyAdmin interface:

- `Username: user` and
- `Password: password`

## **Useful set of commands to know**:

---

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
start-wpcli:
	docker-compose run --rm wpcli bash

```

## References

---

- [Github Fork From: KASSAMBARA](https://github.com/kassambara/wordpress-docker-compose)
