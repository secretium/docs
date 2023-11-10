# Installation

The basics for installing the **Secretium** project on your remote server are covered in this section.

## Prepare your remote server

First of all, login to your remote server and install [Docker][docker_install_url] with the [Compose][docker_compose_install_url] plugin.

!!! tip "Pre-configured Docker on your server?"
    Most cloud providers have a pre-configured version of the image containing **Docker** and **Docker Compose** out of the box. Usually, such an image takes care of setting up the Docker environment and all necessary plugins. Check with your cloud support team to find out.

## Create files for the sensitive data

For the security reasons, create the TXT files with the sensitive data to use them with the [Docker Secrets][docker_secrets_url].

- [x] For the **secret key** to encrypt data:

``` bash
echo "this-is-my-secret-key-123" > secretium_key.txt
```

- [x] For the **master username** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-username" > secretium_master_username.txt
```

- [x] For the **master password** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-password-123" > secretium_master_password.txt
```

- [x] For the **domain name** of the project to share links:

``` bash
echo "example.com" > secretium_domain.txt
```

!!! warning "Naming of the TXT files"
    You can use any name for the TXT files, but don't forget to change it in the `docker-compose.yml` file.

## Run automatic installation script

Run the official [`install.sh`][repo_install_sh_url] installation script from the **Secretium** website:

``` bash
wget -O - https://secretium.org/sh/install | bash
```

This script will automatically:

- [x] Create a `docker-compose.yml` file with the all of the required parameters.
- [x] Create a `./secretium-data` folder for the SQLite database.

## Docker Compose

Edit the downloaded `docker-compose.yml` file with your parameters:

``` yaml title="docker-compose.yml"
version: '3.8'

services:

  secretium:
    image: 'secretium/secretium:latest' #(1)!
    restart: unless-stopped #(2)!
    ports:
      - '8787:8787' #(3)!
    environment:
      SECRET_KEY: /run/secrets/secretium_key
      MASTER_USERNAME: /run/secrets/secretium_master_username
      MASTER_PASSWORD: /run/secrets/secretium_master_password
      DOMAIN: /run/secrets/secretium_domain
      DOMAIN_SCHEMA: https #(4)!
      SERVER_PORT: 8787 #(5)!
      SERVER_TIMEZONE: Europe/Moscow #(6)!
      SERVER_READ_TIMEOUT: 5 #(7)!
      SERVER_WRITE_TIMEOUT: 10 #(8)!
    volumes:
      - ./secretium-data:/secretium-data #(9)!
      - /etc/ssl/certs:/etc/ssl/certs:ro #(10)!

secrets:
  secretium_key:
    file: secretium_key.txt #(11)!
  secretium_master_username:
    file: secretium_master_username.txt #(12)!
  secretium_master_password:
    file: secretium_master_password.txt #(13)!
  secretium_domain:
    file: secretium_domain.txt #(14)!
```

1. Using the official **Secretium** Docker image.
2. Set restart rules for the container.
3. Forward the exposed port `8787` on the container to port `8787` on the host machine.
4. Set the HTTP scheme for your domain name.
5. Set the server port number. It must be the same port as the exposed container port (`8787`).
6. Set the server time zone.
7. Set the server read timeout.
8. Set the server write timeout.
9. Set Docker volume for the container with SQLite data.
10. Set Docker volume for the root SSL certificates.
11. Path to the TXT file with your **secret key**, used in environment variables as Docker Secret.
12. Path to the TXT file with your **master username**, used in environment variables as Docker Secret.
13. Path to the TXT file with your **master password**, used in environment variables as Docker Secret.
14. Path to the TXT file with your **domain name**, used in environment variables as Docker Secret.

!!! tip "Docker Compose configuration"
    For more information of the Docker Compose configuration, see the [Configuration][docs_configuration_url] page.

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

- [x] [Get SSL certificate for your domain to be accessible via HTTPS][docs_get_ssl_certificate_url]
- [x] [Configure web/proxy server to make it available at your domain name][docs_configure_web_proxy_url]

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

<!-- Docs links -->

[docs_configuration_url]: https://docs.secretium.org/complete-user-guide/configuration
[docs_get_ssl_certificate_url]: https://docs.secretium.org/complete-user-guide/get-ssl-certificate
[docs_configure_web_proxy_url]: https://docs.secretium.org/complete-user-guide/configure-web-proxy

<!-- Repository links -->

[repo_install_sh_url]: https://github.com/secretium/secretium/main/install.sh
[repo_releases_url]: https://github.com/secretium/secretium/releases

<!-- Docker links -->

[docker_image_url]: https://hub.docker.com/repository/docker/secretium/secretium
[docker_install_url]: https://docs.docker.com/engine/install/#server
[docker_compose_install_url]: https://docs.docker.com/compose/install/linux/
[docker_secrets_url]: https://docs.docker.com/engine/swarm/secrets/