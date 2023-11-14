# Configure Secretium with Nginx via Docker

This section will show you the minimum steps to configure **Secretium** to work with the Nginx web/proxy server via the [nginx-proxy][proxy_nginx_proxy_docker_url] Docker image.

<!--@include: ../parts/block_proxy_container_run.md-->

## What is nginx-proxy?

The **nginx-proxy** project sets up a container running Nginx and [docker-gen][other_docker_gen_url], which generates reverse proxy configs for Nginx and reloads web/proxy server when containers are started and stopped.

## Run Secretium container

To run the **Secretium** container with nginx-proxy, you need to edit your `docker-compose.yaml` file with the following content:

```yaml
version: '3.8'

services:

  nginx-proxy: // [!code ++]
    image: 'nginxproxy/nginx-proxy:alpine' // [!code ++]
    restart: unless-stopped // [!code ++]
    ports: // [!code ++]
      - '80:80' // [!code ++]
      - '443:443' // [!code ++]
    volumes: // [!code ++]
      - /var/run/docker.sock:/tmp/docker.sock:ro // [!code ++]
      - /etc/ssl/certs:/etc/nginx/certs // [!code ++]

  secretium:
    image: 'secretium/secretium:latest'
    restart: unless-stopped
    expose:
      - '8787'
    environment:
      SECRET_KEY: /run/secrets/secretium_key
      MASTER_USERNAME: /run/secrets/secretium_master_username
      MASTER_PASSWORD: /run/secrets/secretium_master_password
      DOMAIN: /run/secrets/secretium_domain
      DOMAIN_SCHEMA: https
      SERVER_PORT: 8787
      SERVER_TIMEZONE: Europe/Moscow
      SERVER_READ_TIMEOUT: 5
      SERVER_WRITE_TIMEOUT: 10
      VIRTUAL_HOST: /run/secrets/secretium_domain // [!code ++]
      VIRTUAL_PORT: 8787 // [!code ++]
    volumes:
      - ./secretium-data:/secretium-data
      - /etc/ssl/certs:/etc/ssl/certs:ro
    depends_on: // [!code ++]
      - nginx-proxy // [!code ++]

secrets:
  secretium_key:
    file: secretium_key.txt
  secretium_master_username:
    file: secretium_master_username.txt
  secretium_master_password:
    file: secretium_master_password.txt
  secretium_domain:
    file: secretium_domain.txt
```

::: danger
The `VIRTUAL_HOST` environment variable must be the same as the `DOMAIN` and the `VIRTUAL_PORT` must be the same as the `SERVER_PORT`.
:::

After editing the `docker-compose.yaml` file, run the **Secretium** container with nginx-proxy:

```bash
docker-compose up -d
```

And now your **Secretium** container is up, running, and accessible over HTTPS.

### Support IPv6

You can activate the IPv6 support for the nginx-proxy container by passing the value `true` to the `ENABLE_IPV6` environment variable:

```yaml
services:
  nginx-proxy:
    environment:
      ENABLE_IPV6: true
```

<!--@include: ../parts/links.md-->