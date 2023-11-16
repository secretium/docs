# Run installation script

Run the official [`install.sh`][repo_sh_install_url] installation script from the **Secretium** repository:

``` bash
wget -O - https://raw.githubusercontent.com/secretium/secretium/main/install.sh | bash
```

This script will automatically:

- Create a `docker-compose.yml` file with the all of the required parameters.
- Create a `./secretium-data` folder for the SQLite database.

<!--@include: ../parts/links.md-->