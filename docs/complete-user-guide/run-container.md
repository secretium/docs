# Run container

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

### What's next?

For your convenience, we have prepared minimal instructions on how to connect the **Secretium** container to the most popular web/proxy servers such as **Nginx** (manual installation), **Nginx** (via Docker), **Nginx Proxy Manager** and **Traefik**.

<!--@include: ../parts/links.md-->