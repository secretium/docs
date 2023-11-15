# Quick start guide

Here's a minimal version of the steps to run the **Secretium** on your local machine.

<!--@include: ../parts/block_cant-find-answer.md-->

## Prepare your local machine

First of all, install [Docker][docker_install_url] with the [Compose][docker_compose_install_url] plugin on your local machine.

## Create files for the sensitive data

For the security reasons, create the TXT files with the sensitive data to use them in the [Docker Secrets][docker_secrets_url] service.

::: warning Naming of the TXT files
For the current version of the installation ("quick"), it is highly recommended **not** to change the file names. They will be used by the automatic installation script to create required project files and running the **Secretium** container.
:::

For the **secret key** to encrypt data:

``` bash
echo "this-is-my-secret-key-123" > secretium_key.txt
```

::: danger
Please treat it with due consideration! Specify a really complex sequence of numbers, letters and special characters. The length must **not** be less than **16** characters.
:::

For the **master username** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-username" > secretium_master_username.txt
```

::: danger
Please treat it with due consideration! The minimum length is **4** and the maximum is **16** characters.
:::

For the **master password** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-password-123" > secretium_master_password.txt
```

::: danger
Please treat it with due consideration! Specify a really complex sequence of numbers, letters and special characters. The minimum length is **8** and the maximum is **16** characters.
:::

## Run automatic installation script

Run the official [`quick-start.sh`][repo_sh_quick_start_url] installation script from the **Secretium** website:

``` bash
wget -O - https://secretium.org/scripts/quick-start | bash
```

This script will automatically:

- Create a minimal `docker-compose.yml` file.
- Create a folder for the SQLite database.
- Run the `docker-compose up -d` command to start the container on port `8787`.
- Remove the TXT files with the sensitive data after running container.

## Start using Secretium

Open your browser, visit `http://localhost:8787` and login to the admin dashboard with your master **username** and master **password**, which you set in the previous steps.

That's it! :fire: Your **Secretium** container is up and running!

<!--@include: ../parts/links.md-->