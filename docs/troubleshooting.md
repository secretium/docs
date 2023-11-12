# Troubleshooting

The most common malfunctions that may come up when using the **Secretium**.

<!--@include: ./parts/block_cant-find-answer.md-->

## The requested image's platform does not match the detected host platform

The **Secretium** project aims to deploy the instance in the cloud (or any remote server), therefore the official [Docker image][docker_secretium_image_url] is available for GNU/Linux only:

- `linux/amd64`
- `linux/arm64`

Other architectures and operating systems are **not** supported.

::: tip Windows Subsystem for Linux

Yes, **Secretium** perfectly works on the [Windows Subsystem for Linux][other_wsl_url] (WSL) too, because it uses the regular GNU/Linux distro Ubuntu.

:::

## Port X is taken by OS

Some operating systems may take up ports that you want to use to develop and deploy your application. You can check if a port is taken by OS by running the command:

::: code-group

``` bash [GNU/Linux]
lsof -iTCP -sTCP:LISTEN -P
```

``` bash [macOS]
lsof -iTCP -sTCP:LISTEN -P
```

``` bash [Windows]
netstat -aon
```

:::

To change the port number, edit the `docker-compose.yml` file:

1. Replace `<HOST_PORT>` with the port number of your host, and `<CONTAINER_PORT>` with the port number you want to use for the container.
2. Replace `<SERVER_PORT>` with the same port number as the exposed container port (`<CONTAINER_PORT>`).

``` yaml{5,8}
services:
  secretium:
    # ...
    ports:
      - '<HOST_PORT>:<CONTAINER_PORT>'
    environment:
      # ...
      SERVER_PORT: <SERVER_PORT>

# ...
```

Next, just re-build the **Secretium** container to apply the changes:

``` bash
docker-compose up -d --build --force-recreate
```

And now, define the new container port in your proxy/web server.

<!--@include: ./parts/links.md-->