# Edit Docker Compose file

Edit the downloaded `docker-compose.yml` file with your parameters.

The default configuration is:

``` yaml{6,9,11-19,21,22,26,28,30,32}
version: '3.8'

services:

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

In the following, we will look at all the required settings.

## Docker image

Use the official **Secretium** [Docker image][docker_secretium_image_url].

```yaml
services:
  secretium:
    image: 'secretium/secretium:latest'
```

## Exposed container port

Forward the exposed port `8787` on the container to the host machine.

```yaml
services:
  secretium:
    expose:
      - '8787'
```

The default value is `8787`.

## Environment variables

Set environment variables for the container.

### `SECRET_KEY`

Set the secret key. This key will be used to encrypt the data using the [AES algorithm][backend_aes_url].

```yaml
services:
  secretium:
    environment:
      SECRET_KEY: /run/secrets/secretium_key
```

Since we are using Docker Secrets, the internal Docker address will be used to set it.

### `MASTER_USERNAME`

Set the master username. This value will be used to login to the administration dashboard.

```yaml
services:
  secretium:
    environment:
      MASTER_USERNAME: /run/secrets/secretium_master_username
```

Since we are using Docker Secrets, the internal Docker address will be used to set it.

### `MASTER_PASSWORD`

Set the master password. This value will be used to login to the administration dashboard.

```yaml
services:
  secretium:
    environment:
      MASTER_PASSWORD: /run/secrets/secretium_master_password
```

Since we are using Docker Secrets, the internal Docker address will be used to set it.

### `DOMAIN`

Set the domain name. The domain will be used to generate links for secret sharing.

```yaml
services:
  secretium:
    environment:
      DOMAIN: /run/secrets/secretium_domain
```

Since we are using Docker Secrets, the internal Docker address will be used to set it.

The default value is `localhost`.

### `DOMAIN_SCHEMA`

Set the HTTP scheme for your domain name. The scheme will be used to generate links for secret sharing.

The default value is `http`.

### `SERVER_PORT`

Set the server port number. It must be the same port as the exposed container port.

The default value is `8787`.

### `SERVER_TIMEZONE`

Set the server [Time zone][other_timezone_url].

The default value is `Europe/Moscow`.

### `SERVER_READ_TIMEOUT`

Set the server read timeout.

::: tip Recommended timeout value for reading
We recommend keeping this value equal to `5`. For more information, see [Cloudflare blog post][article_cloudflare_timeouts_url].
:::

The default value is `5`.

### `SERVER_WRITE_TIMEOUT`

Set the server write timeout.

::: tip Recommended timeout value for writing
We recommend keeping this value equal to `10`. For more information, see [Cloudflare blog post][article_cloudflare_timeouts_url].
:::

The default value is `10`.

## Docker volumes

Set Docker volume for the SQLite data and for the root SSL certificates (read-only mode).

```yaml
services:
  secretium:
    volumes:
      - ./secretium-data:/secretium-data
      - /etc/ssl/certs:/etc/ssl/certs:ro
```

## Docker secrets

The following settings will be used in the container environment variables.

### `secretium_key`

Set path to the TXT file with your secret key.

```yaml
secrets:
  secretium_key:
    file: secretium_key.txt
```

### `secretium_master_username`

Set path to the TXT file with your master username.

```yaml
secrets:
  secretium_master_username:
    file: secretium_master_username.txt
```

### `secretium_master_password`

Set path to the TXT file with your master password.

```yaml
secrets:
  secretium_master_password:
    file: secretium_master_password.txt
```

### `secretium_domain`

Set path to the TXT file with your domain name.

```yaml
secrets:
  secretium_domain:
    file: secretium_domain.txt
```

<!--@include: ../parts/block_more-info-configuration-->

<!--@include: ../parts/links.md-->