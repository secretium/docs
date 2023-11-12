# Install on your server

The basics for installing the **Secretium** project on your remote server are covered in this section.

## Create files for the sensitive data

For the security reasons, create the TXT files with the sensitive data to use them with the [Docker Secrets][docker_secrets_url].

For the **secret key** to encrypt data:

``` bash
echo "this-is-my-secret-key-123" > secretium_key.txt
```

For the **master username** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-username" > secretium_master_username.txt
```

For the **master password** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-password-123" > secretium_master_password.txt
```

For the **domain name** of the project to share links:

``` bash
echo "example.com" > secretium_domain.txt
```

::: tip Naming of the TXT files

You can use any name for the TXT files, but don't forget to change it in the `docker-compose.yml` file.

:::

## Run automatic installation script

Run the official [`install.sh`][repo_sh_install_url] installation script from the **Secretium** website:

``` bash
wget -O - https://secretium.org/scripts/install | bash
```

This script will automatically:

- Create a `docker-compose.yml` file with the all of the required parameters.
- Create a `./secretium-data` folder for the SQLite database.

## Docker Compose

Edit the downloaded `docker-compose.yml` file with your parameters:

``` yaml{6,9,15,16,17,18,19,21,22,26,28,30,32}
version: '3.8'

services:

  secretium:
    image: 'secretium/secretium:latest'
    restart: unless-stopped
    ports:
      - '8787:8787'
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

1. Using the official **Secretium** Docker image.
2. Forward the exposed port `8787` on the container to port `8787` on the host machine.
3. Set the HTTP scheme for your domain name.
4. Set the server port number. It must be the same port as the exposed container port (`8787`).
5. Set the server time zone.
6. Set the server read timeout.
7. Set the server write timeout.
8. Set Docker volume for the container with SQLite data.
9.  Set Docker volume for the root SSL certificates.
10. Path to the TXT file with your **secret key**, used in environment variables as Docker Secret.
11. Path to the TXT file with your **master username**, used in environment variables as Docker Secret.
12. Path to the TXT file with your **master password**, used in environment variables as Docker Secret.
13. Path to the TXT file with your **domain name**, used in environment variables as Docker Secret.

<!--@include ./parts/block_more-info-configuration -->

## Run container

Run the **Secretium** container:

``` bash
docker-compose up -d
```

You can check the logs of the container with the following command:

``` bash
docker-compose logs
```

If the container was started correctly, you can go to `http://<IP>:<SERVER_PORT>` to make sure everything is working. Login to the admin dashboard with your master **username** and **password**, which you set in the previous steps.

That's it! :fire: Your smart self-hosted personal **Secretium** instance is ready to use!

### Next steps

- [Get SSL certificate for your domain to be accessible via HTTPS][docs_get_ssl_certificate_url]
- [Configure web/proxy server to make it available at your domain name][docs_configure_web_proxy_url]

## Manual installation

You can also install the **Secretium** project manually.

### Build from the source

Clone the repository and go to the `./secretium` folder:

``` bash
git clone https://github.com/secretium/secretium && cd secretium
```

Edit everything you need and build the Docker image:

``` bash
docker build -t secretium:latest .
```

You can now use your own Docker image to run a container with **Secretium**.

### A ready-made packages for GNU/Linux distros

Download ready-made `deb` (for Debian, Ubuntu) and `rpm` (for CentOS, Fedora) packages from the [Releases][repo_releases_url] page.

<!--@include: ../parts/links.md-->