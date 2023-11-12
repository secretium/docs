# Configuration

A complete list of parameters for the `docker-compose.yml` file.

## Secret key

Set your secret key to the encrypt data on the backend.

| Environment variable   | Description                                                           | Default value     |
| ---------------------- | --------------------------------------------------------------------- | ----------------- |
| `SECRET_KEY`           | Set your secret key to the encrypt data on the backend                | `""`              |
| `MASTER_USERNAME`      | Set your master username to login to the backend's dashboard as admin | `""`              |
| `MASTER_PASSWORD`      | Set your master password to login to the backend's dashboard as admin | `""`              |
| `DOMAIN`               | Set your domain name for sharing links to the secrets                 | `""`              |
| `DOMAIN_SCHEMA`        | Set the HTTP scheme for your domain name                              | `"https"`         |
| `SERVER_PORT`          | Set the server port for the backend                                   | `8787`            |
| `SERVER_TIMEZONE`      | Set the [Timezone][other_timezone_url] to the backend                 | `"Europe/Moscow"` |
| `SERVER_READ_TIMEOUT`  | Set the server read timeout to the backend                            | `5`               |
| `SERVER_WRITE_TIMEOUT` | Set the server write timeout to the backend                           | `10`              |

<!--@include: ../parts/links.md-->