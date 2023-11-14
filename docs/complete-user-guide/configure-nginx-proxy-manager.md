# Configure Secretium with Nginx Proxy Manager

This section will show you the minimum steps to configure **Secretium** to work with the [Nginx Proxy Manager][proxy_nginx_proxy_manager_url] Docker image.

<!--@include: ../parts/block_proxy_container_run.md-->

## What is Nginx Proxy Manager?

**Nginx Proxy Manager** comes as a pre-built docker image that enables you to easily forward to your websites running at home or otherwise, including free SSL, without having to know too much about Nginx or Let's Encrypt.

<img width="200px" src="https://nginxproxymanager.com/logo.png" alt="Nginx Proxy Manager logo"/>

## Run Secretium container

To run the **Secretium** container with Nginx Proxy Manager, you need to edit your `docker-compose.yaml` file with the following content:

```yaml
version: '3.8'

services:

  nginx-proxy-manager: // [!code ++]
    image: 'jc21/nginx-proxy-manager:latest' // [!code ++]
    restart: unless-stopped // [!code ++]
    ports: // [!code ++]
      - '80:80' // [!code ++]
      - '81:81' // [!code ++]
      - '443:443' // [!code ++]
    volumes: // [!code ++]
      - ./data:/data // [!code ++]
      - ./letsencrypt:/etc/letsencrypt // [!code ++]

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
    depends_on: // [!code ++]
      - nginx-proxy-manager // [!code ++]

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

After editing the `docker-compose.yaml` file, run the **Secretium** container with Nginx Proxy Manager:

```bash
docker-compose up -d
```

## Add Secretium proxy host

Open your browser and go to Nginx Proxy Manager dashboard at `http://<IP>:81`. To login, use the following credentials:

- Username: `admin@example.com`
- Password: `changeme`

::: danger Change credentials
Don't forget to change this credentials after your first login to the dashboard!
:::

To add **Secretium** container to your Nginx Proxy Manager:

1. Click to the **Add Proxy Host** button and fill the required fields:
   - **Domain Names** with the purchased domain names.
   - **Scheme** with the HTTP scheme (by default, `http`).
   - **Forward Hostname / IP** with the IP address of your remote server.
   - **Forward Port** with the same port as the **Secretium** container (by default, `8787`).
   - Check the **Cache assets** and **Block Common Exploits** checkboxes.
2. Then, click to the **Save** button and wait for the process to complete.

Your **Secretium** container will be available at `http://<DOMAIN>`.

## Get Let's Encrypt SSL certificate

On your Nginx Proxy Manager dashboard (`http://<IP>:81`):

1. Open settings of the **Secretium** proxy host.
2. Go to the **SSL** section:
   - In the **SSL Certificate** field select the **Request a new SSL certificate** option.
   - Check the **Force SSL**, **HTTP/2 Support**, **HSTS Enabled** and **HSTS Subdomains** checkboxes.
   - **Email Address for Let's Encrypt** with your real email address.
   - Check the **I Agree to the Let's Encrypt Terms of Service** checkbox.
3. Then, click to the **Save** button and wait for the process to complete.

Now, your **Secretium** container is up, running, and accessible over HTTPS.

<!--@include: ../parts/links.md-->