---
hide:
    - toc
---

# Quick start

Here's a minimal version of the steps to run the **Secretium** on your remote server.

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
    For the current version of the installation ("quick"), it is highly recommended **not** to change the file names. They will be used by the automatic installation script to create required project files and running the **Secretium** container.

## Run automatic installation script

Run the official [`quick-start.sh`][repo_quick_start_sh_url] installation script from the **Secretium** website:

``` bash
wget -O - https://secretium.org/sh/quick-start | bash
```

This script will automatically:

- [x] Create a minimal `docker-compose.yml` file.
- [x] Create a folder for the SQLite database.
- [x] Run the `docker-compose up -d` command to start the container on port `8787`.
- [x] Remove the TXT files with the sensitive data after running container.

## Configure proxy & get SSL certificate

Link the container to a web/proxy server (via [Nginx Proxy Manager][nginx_proxy_manager_url], for example) and get [Let's Encrypt][lets_encrypt_url] SSL certificate for your domain. Add it to the web/proxy server to make **Secretium** available over HTTPS.

Open your browser, visit `https://example.com` and login to the admin dashboard with your master username and password, which you set in the previous steps.

That's it! :fire: Your smart self-hosted personal **Secretium** instance is ready to use!

<!-- Links -->

[repo_quick_start_sh_url]: https://github.com/secretium/secretium/blob/main/quick-start.sh

<!-- Docker links -->

[docker_install_url]: https://docs.docker.com/engine/install/#server
[docker_compose_install_url]: https://docs.docker.com/compose/install/linux/
[docker_secrets_url]: https://docs.docker.com/engine/swarm/secrets/

<!-- Other links -->

[nginx_proxy_manager_url]: https://nginxproxymanager.org
[lets_encrypt_url]: https://letsencrypt.org