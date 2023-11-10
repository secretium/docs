# Troubleshooting

The most common malfunctions and problems that may come up when using the **Secretium** are collected in this section.

!!! tip "Can't find the answer?"
    If you can't find the answer to your question here, feel free to create an [issue][repo_issues_url] or send a [PR][repo_pull_request_url] to the **Secretium** project repository.

## The requested image's platform does not match the detected host platform

The **Secretium** project aims to deploy the instance in the cloud (or any remote server), therefore the official [Docker image][docker_image_url] is available for GNU/Linux only:

- [x] `linux/amd64`
- [x] `linux/arm64`

Other architectures and operating systems are **not** supported.

!!! success "Windows Subsystem for Linux"
    Yes, **Secretium** perfectly works on the [Windows Subsystem for Linux][wsl_url] (WSL) too, because it uses the regular GNU/Linux distro Ubuntu.

## Port X is taken by OS

Some operating systems may take up ports that you want to use to develop and deploy your application. You can check if a port is taken by OS by running the command:

=== ":material-linux: GNU/Linux"

    ``` bash
    lsof -iTCP -sTCP:LISTEN -P
    ```

=== ":material-apple: macOS"

    ``` bash
    lsof -iTCP -sTCP:LISTEN -P
    ```

=== ":material-microsoft-windows: Windows"

    ``` bash
    netstat -aon
    ```

To change the port number, edit the `docker-compose.yml` file:

``` yaml title="docker-compose.yml" hl_lines="5 8"
services:
  secretium:
    # ...
    ports:
      - '<HOST_PORT>:<CONTAINER_PORT>' #(1)!
    environment:
      # ...
      SERVER_PORT: <SERVER_PORT> #(2)!

# ...
```

1. Replace `<HOST_PORT>` with the port number of your host, and `<CONTAINER_PORT>` with the port number you want to use for the container.
2. Replace `<SERVER_PORT>` with the same port number as the exposed container port (`<CONTAINER_PORT>`).

Next, just re-build the **Secretium** container to apply the changes:

``` bash
docker-compose up -d --build --force-recreate
```

And now, define the new container port in your proxy/web server.

<!-- Repository links -->

[repo_pull_request_url]: https://github.com/secretium/docs/pulls
[repo_issues_url]: https://github.com/secretium/secretium/issues

<!-- Docker links -->

[docker_image_url]: https://hub.docker.com/repository/docker/secretium/secretium

<!-- Other links -->

[wsl_url]: https://learn.microsoft.com/en-us/windows/wsl/