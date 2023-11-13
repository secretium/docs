# Create files with sensitive data

For the security reasons, create the TXT files with the sensitive data.

::: info Using the container manager
If you are using [Portainer][docker_portainer_url] (or another) to manage containers, you can skip this step. Set all the environment variables required for **Secretium** using the built-in mechanisms.
:::

**Secretium** will use these files in the [Docker Secrets][docker_secrets_url] service when creating the container. This is a good practice when you need to keep the credentials in a secure location, but have access to them inside the container.

::: tip Naming of the TXT files
You can use any name for the TXT files. Don't forget to change it in the `docker-compose.yml` file.
:::

## File with the secret key

Create a TXT file for the **secret key** to encrypt data:

``` bash
echo "this-is-my-secret-key-123" > secretium_key.txt
```

::: danger
Please treat it with due consideration! Specify a really complex sequence of numbers, letters and special characters. The length must **not** be less than **16** characters.
:::

## File with the master username

Create a TXT file for the **master username** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-username" > secretium_master_username.txt
```

::: danger
Please treat it with due consideration! The minimum length is **4** and the maximum is **16** characters.
:::

## File with the master password

Create a TXT file for the **master password** to login to the dashboard as admin:

``` bash
echo "this-is-my-master-password-123" > secretium_master_password.txt
```

::: danger
Please treat it with due consideration! Specify a really complex sequence of numbers, letters and special characters. The minimum length is **8** and the maximum is **16** characters.
:::

## File with the domain name

Create a TXT file for the **domain name** of the project to share links:

``` bash
echo "example.com" > secretium_domain.txt
```

<!--@include: ../parts/links.md-->