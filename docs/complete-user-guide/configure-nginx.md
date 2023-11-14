# Configure Secretium to work with Nginx

This section will show you the minimum steps to configure **Secretium** to work with the [Nginx][proxy_nginx_url] web/proxy server, that was already installed.

<!--@include: ../parts/block_proxy_container_run.md-->

## What is Nginx?

**Nginx** is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. Nginx is free and open-source software, released under the terms of the 2-clause BSD license.

<img width="100px" src="https://github.com/nginxinc.png" alt="Nginx logo"/>

## Create Nginx config file for your domain

Create a config file for your domain name:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

::: danger Domain name
Don't forget to change the domain name from `example.com` to your own.
:::

Add the following content:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name example.com www.example.com;

    location / {
        resolver 127.0.0.11;
        proxy_pass http://secretium:8787;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real_IP $remote_addr;
    }
}
```

Verify the config file and reload Nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Get Let's Encrypt SSL certificate

Let's Encrypt is a certificate authority that issues free SSL certificates. With its help, you can easily and quickly secure your website with HTTPS protocol. Its simplicity lies in the fact that a special [Certbot][ssl_certbot_url] client is responsible for almost all steps, which automates all actions with the certificate.

### Install Certbot

The first thing to do is to update the package index:

::: code-group

```bash [Debian/Ubuntu]
sudo apt update && sudo apt upgrade
```

```bash [CentOS]
sudo yum update
```

:::

Next, Cerbot can be installed:

::: code-group

```bash [Debian/Ubuntu]
sudo apt install certbot python3-certbot-nginx
```

```bash [CentOS]
sudo yum install certbot python3-certbot-nginx
```

:::

With the Nginx plugin, Certbot will automatically change the configuration of your web server and reboot it when needed.

### Allow HTTPS traffic

If you have [ufw][other_ufw_firewall_url] firewall configured on your server, you need to additionally allow HTTPS traffic:


```bash
sudo ufw allow 'Nginx Full' && sudo ufw delete allow 'Nginx HTTP'
```

### Install certificate

To install a certificate using the plugin, enter the following command:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

::: info Explaining flags
The `--nginx` flag is responsible for using the Nginx plugin, and the domains for which SSL is installed are specified using the `-d` flag.
:::

When you first start Certbot, it will prompt you to accept the terms of service and ask for an email address. It will then contact the Let's Encrypt server to obtain a certificate and send a request to confirm that you are in control of the domain.

### Automatic certificate renewal

Certbot installs certificates that are only valid for 90 days. This is done for security. However, Certbot itself renews certificates that expire in less than 30 days. This is accomplished using the `systemd` timer.

You can find out the status of the timer using `systemctl` command:

```bash
sudo systemctl status certbot.timer
```

<!--@include: ../parts/links.md-->