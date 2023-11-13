# Install on your server

The basics for installing the **Secretium** project on your remote server are covered in this section.

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