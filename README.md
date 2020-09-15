The installation tool kit, provided here, include:

- MariaDB/MySQL used for Wordpress database
- Adminer database management system to connect to your MariaDB database
- WP-Cli: Wordpress Command Line Interface
- Makefile directives for automatization.

You can automatically deploy a local docker wordpress site in 5 minutes
using the following commands:

```bash
# Download a wordpress docker-compose example
git clone https://github.com/kassambara/wordpress-docker-compose
cd wordpress-docker-compose
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

**Useful set of commands to know**:

```bash
# Stop and remove containers
docker-compose down
# Build, and start the wordpress website
docker-compose up -d --build
# Reset everything
docker-compose down
rm -rf certs/* certs-data/* logs/nginx/* mysql/* wordpress/*
```

## References

- [Github Fork From: KASSAMBARA](https://github.com/kassambara/wordpress-docker-compose)
