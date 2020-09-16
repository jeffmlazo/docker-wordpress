install: configure

configure:

	@echo "⚙️ Configuring Wordpress parameters..."
	wp core install \
		--url="${WORDPRESS_WEBSITE_URL_WITHOUT_HTTP}" \
		--title="${WORDPRESS_WEBSITE_TITLE}" \
		--admin_user="${WORDPRESS_ADMIN_USER}" \
		--admin_password="${WORDPRESS_ADMIN_PASSWORD}" \
		--admin_email="${WORDPRESS_ADMIN_EMAIL}"
		
	@echo "⚙️ Update default site url..."
	wp option update siteurl "${WORDPRESS_WEBSITE_URL}"
	wp rewrite structure "${WORDPRESS_WEBSITE_POST_URL_STRUCTURE}"
	
	@echo "⚙️ Install & activate main theme ..."
	-wp theme install --activate ${WORDRESS_MAIN_THEME}

	@echo "⚙️ Install & activate plugins..."
	-wp plugin install --activate ${WORDRESS_MAIN_THEME_PLUGINS}

	@echo "⚙️ Removing Wordpress default themes..."
	-wp theme delete ${WORDPRESS_DEFAULT_THEMES}

	@echo "⚙️ Removing Wordpress default plugins..."
	-wp plugin delete ${WORDPRESS_DEFAULT_PLUGINS}

	@echo "⚙️ Removing Wordpress default posts & pages..."
	-wp post delete --force ${WORDPRESS_DEFAULT_POSTS_PAGES}
