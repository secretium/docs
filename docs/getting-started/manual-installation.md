# Manual installation

The basics for installing the **Secretium** project on your remote server in manual mode are covered in this section.

## Build from the source

Clone the repository and go to the `./secretium` folder:

``` bash
git clone https://github.com/secretium/secretium && cd secretium
```

::: danger Dockerfile
Since we are using the [GoReleaser][other_goreleaser_url] tool in our pipeline, you need to create your own `Dockerfile` file in the root of the repository to create a Docker image.
:::

Edit everything you need in the source code and build the Docker image:

``` bash
docker build -t my-secretium-image:latest .
```

You can now use your own Docker image to run a container with **Secretium**.

## Use a ready-made packages for GNU/Linux distros

Download ready-made `deb` (for Debian, Ubuntu) and `rpm` (for CentOS, Fedora) packages from the [Releases][repo_releases_url] page. Install it like you normally would.

<!--@include: ../parts/links.md-->