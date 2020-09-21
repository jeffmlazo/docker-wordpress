FROM wordpress:cli

# Install make tool
USER root
RUN apk add --no-cache make

# Make docker-compose wait for container dependencies be ready
# Add the wait script to the image
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

# Add Makefile to scripts dir
ADD Makefile entrypoint.sh /scripts/
RUN chmod +x /scripts/entrypoint.sh

# Create folder & add access write permission for wpcli cache folder
RUN mkdir /.wp-cli/ &&
    mkdir /.wp-cli/cache/
RUN chmod 777 -R /.wp-cli/

ENTRYPOINT [ "/scripts/entrypoint.sh" ]
USER 33:33
CMD ["wp", "shell"]
