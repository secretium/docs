# Configure Secretium with Traefik

This section will show you the minimum steps to configure **Secretium** to work with the [Traefik][proxy_traefik_url] proxy server.

<!--@include: ../parts/block_proxy_container_run.md-->

## What is Traefik?

**Traefik** is a modern HTTP reverse proxy and load balancer written in Go. Simplify networking complexity while designing, deploying, and operating applications.

<img width='200px' src='https://traefik.io/static/traefik-proxy-logo--white-82153be41e0ce620a921b4bce974f6d8.svg' alt='Traefik logo'/>

## Run Secretium container

To run the **Secretium** container with Traefik, you need to edit your `docker-compose.yaml` file with the following content:

```yaml
version: '3.8'

services:

  traefik-proxy: // [!code ++]
    image: 'traefik:v2' // [!code ++]
    restart: unless-stopped // [!code ++]
    ports: // [!code ++]
      - '80:80' // [!code ++]
      - '8080:8080' // [!code ++]
    command: // [!code ++]
      - '--api.insecure=true' // [!code ++]
      - '--providers.docker' // [!code ++]
      - '--providers.docker.exposedbydefault=false' // [!code ++]
      - '--entrypoints.web.address=:80' // [!code ++]
    volumes: // [!code ++]
      - /var/run/docker.sock:/var/run/docker.sock // [!code ++]

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
    volumes:
      - ./secretium-data:/secretium-data
      - /etc/ssl/certs:/etc/ssl/certs:ro
    labels: // [!code ++]
      - 'traefik.enable=true' // [!code ++]
      - 'traefik.http.routers.secretium.rule=Host(`example.com`)' // [!code ++]
      - 'traefik.http.routers.secretium.entrypoints=web' // [!code ++]
    depends_on: // [!code ++]
      - traefik-proxy // [!code ++]

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
The `traefik.http.routers.secretium.rule` label value must be the same value as the `DOMAIN` environment variable.
:::

After editing the `docker-compose.yaml` file, run the **Secretium** container with Traefik:

```bash
docker-compose up -d
```

The Traefik dashboard will be available at `http://<IP>:8080` and your **Secretium** container will be available at `http://<DOMAIN>`.

## Get Let's Encrypt SSL certificate

Edit your `docker-compose.yaml` file with the following content:

```yaml
version: '3.8'

services:

  traefik-proxy:
    image: 'traefik:v2'
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443' // [!code ++]
      - '8080:8080'
    command:
      - '--api.insecure=true'
      - '--providers.docker'
      - '--providers.docker.exposedbydefault=false'
      - '--entrypoints.web.address=:80'
      - '--entrypoints.websecure.address=:443' // [!code ++]
      - '--certificatesresolvers.myresolver.acme.httpchallenge=true' // [!code ++]
      - '--certificatesresolvers.myresolver.acme.httpchallenge.entrypoint=web' // [!code ++]
      - '--certificatesresolvers.myresolver.acme.email=mail@example.com' // [!code ++]
      - '--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json' // [!code ++]
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./letsencrypt:/letsencrypt // [!code ++]

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
    volumes:
      - ./secretium-data:/secretium-data
      - /etc/ssl/certs:/etc/ssl/certs:ro
    labels:
      - 'traefik.enable=true'
      - 'traefik.http.routers.secretium.rule=Host(`example.com`)'
      - 'traefik.http.routers.secretium.entrypoints=web' // [!code --]
      - 'traefik.http.routers.secretium.entrypoints=websecure' // [!code ++]
      - 'traefik.http.routers.blog.tls.certresolver=myresolver' // [!code ++]
    depends_on:
      - traefik-proxy

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
The `traefik.http.routers.secretium.rule` label value must be the same value as the `DOMAIN` environment variable. And don't forget to change `mail@example.com` value of the `certificatesresolvers.myresolver.acme.email` label to your real email address.
:::

Next, just re-build to apply the changes:

```bash
docker-compose up -d --build --force-recreate
```

Now, your **Secretium** container is up, running, and accessible over HTTPS.

<!--@include: ../parts/links.md-->