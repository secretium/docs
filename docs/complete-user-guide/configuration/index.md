# Configuration

We recommend creating a config file **before** starting a new project.

You can do this by using the built-in `init` command:

=== ":material-console-line: CLI"

    ``` bash
    gowebly init
    ```

=== "Go"

    ``` bash
    go run github.com/gowebly/gowebly@latest init
    ```

=== "Docker"

    ``` bash
    docker run --rm -it -v ${PWD}:${PWD} -w ${PWD} gowebly/gowebly:latest init
    ```

<img width="720" alt="gowebly init" src="https://raw.githubusercontent.com/gowebly/.github/main/images/gowebly_init.png">

This command create a default config file called [`.gowebly.yml`][repo_default_config] in the current folder with the following settings:

``` yaml title=".gowebly.yml"
backend:
   module_name: project #(1)!
   go_framework: default #(2)!
   template_engine: default #(3)!
   port: 7000 #(4)!
   timeout:
      read: 5 #(5)!
      write: 10 #(6)!

frontend:
   package_name: project #(7)!
   css_framework: default #(8)!
   runtime_environment: default #(9)!
   htmx: latest #(10)!
   hyperscript: latest #(11)!
```

1. (string) option can be any name of your Go module
2. (string) option can be one of the values: `fiber`, `gin`, `echo`, `chi`, `httprouter`, or `default`
3. (string) option can be one of the values: `templ`, or `default`
4. (int) option can be any port that is not taken up on your system
5. (int) option can be any number of seconds, `5` is recommended
6. (int) option can be any number of seconds, `10` is recommended
7. (string) option can be any name of your `package.json`
8. (string) option can be one of the values: `tailwindcss`, `unocss`, or `default`
9. (string) option can be one of the values: `bun`, or `default`
10. (string) option can be any existing version of htmx
11. (string) option can be any existing version of hyperscript

Edit it with your own.

!!! tip "Skipping the `init` command"
    Of course, you can skip this step if you're comfortable with the following default configuration for your new project:

    - Go module (`go.mod`) and `package.json` names are set to **project**;
    - Without any Go framework for the backend part (only built-in **net/http** package);
    - With a default template engine (only built-in **html/template** package);
    - Without any CSS framework for the frontend part (only default styles for the code example);
    - The JavaScript runtime environment for the frontend part is set to **Node.js**;
    - Server port is `7000`, timeout (in seconds): `5` for read, `10` for write;
    - Latest versions of the **htmx** & **hyperscript**.

## Backend

A required block with **backend** settings to be used for your project.

### Module name

The name of the Go module to be used in the `go.mod` file.

``` yaml
backend:
   module_name: project
```

The `#!yaml module_name` option can be any string with a simple module name or URL (for example, `github.com/user/project`).

Default value is `project`.

### Go framework

The name of the Go web framework (or router) to use as the backend.

``` yaml
backend:
   go_framework: default
```

The `#!yaml go_framework` option can be one of the string values:

| Value        | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| `default`    | Don't use any Go framework (only built-in [net/http][net_http_url] package)  |
| `fiber`      | Use the [Fiber][fiber_url] web framework as a Go backend                     |
| `gin`        | Use the [Gin][gin_url] web framework as a Go backend                         |
| `echo`       | Use the [Echo][echo_url] web framework as a Go backend                       |
| `chi`        | Use the [Chi][chi_url] composable router as a Go backend                     |
| `httprouter` | Use the [HttpRouter][httprouter_url] high performance router as a Go backend |

Default value is `default`.

### Template engine

The name of the template engine to use with the Go web framework.

``` yaml
backend:
   template_engine: default
```

The `#!yaml template_engine` option can be one of the string values:

| Value     | Description                                                                               |
| --------- | ----------------------------------------------------------------------------------------- |
| `default` | Don't use any template engines (only built-in [html/template][html_template_url] package) |
| `templ`   | Use the [Templ][ah_templ_url] template engine                                             |

Default value is `default`.

### Server port

The port to be used for the Go backend.

``` yaml
backend:
   port: 7000
```

The `#!yaml port` option can be any positive number.

!!! warning "Be careful!"
    The port you define in the configuration should **not** be taken up on your system.

Default value is `7000`.

### Timeout

The timeout (in seconds) for the read and write operations for the Go backend.

``` yaml
backend:
   timeout:
      read: 5
      write: 10
```

The `#!yaml read` and `#!yaml write` options in the `#!yaml timeout` block can be any positive number.

!!! tip "Read and write timeouts"
    The recommended values are `5` for read and `10` for write. For more information, see [this][cf_blog_timeouts_url] Cloudflare blog post.

Default values are `5` for read and `10` for write.

## Frontend

A required block with **frontend** settings to be used for your project.

### Package name

The name of the Node.js package to be used in the `package.json` file.

``` yaml
frontend:
   package_name: project
```

The `#!yaml package_name` option can be any string with a simple package name (for example, `project`).

Default value is `project`.

### CSS framework

The name of the CSS framework to use for the frontend.

``` yaml
frontend:
   css_framework: default
```

The `#!yaml css_framework` option can be one of the string values:

| Value         | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| `default`     | Don't use any CSS framework (only default styles for the code example) |
| `tailwindcss` | Use the [Tailwind CSS][tailwindcss_url] as a CSS framework             |
| `unocss`      | Use the [UnoCSS][unocss_url] as a CSS framework                        |

Default value is `default`.

### JavaScript runtime environment

The name of the JavaScript runtime environment to use for the frontend.

``` yaml
frontend:
   runtime_environment: default
```

The `#!yaml runtime_environment` option can be one of the string values:

| Value     | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| `default` | Use the [Node.js][nodejs_url] as a JavaScript runtime environment |
| `bun`     | Use the [Bun][bun_url] as a JavaScript runtime environment        |

Default value is `default`.

### Version of htmx

The version of the [htmx][htmx_url] to use for the frontend.

``` yaml
frontend:
   htmx: latest
```

The `#!yaml htmx` option can be a string with any existing version or `latest` (for the latest version).

Default value is `latest`.

### Version of hyperscript

The version of the [hyperscript][hyperscript_url] to use for the frontend.

``` yaml
frontend:
   hyperscript: latest
```

The `#!yaml hyperscript` option can be a string with any existing version or `latest` (for the latest version).

Default value is `latest`.

<!-- Links -->

[repo_default_config]: https://github.com/gowebly/gowebly/blob/main/internal/attachments/configs/default.yml
[net_http_url]: https://pkg.go.dev/net/http
[fiber_url]: https://github.com/gofiber/fiber
[gin_url]: https://github.com/gin-gonic/gin
[echo_url]: https://github.com/labstack/echo
[chi_url]: https://github.com/go-chi/chi
[httprouter_url]: https://github.com/julienschmidt/httprouter
[html_template_url]: https://pkg.go.dev/html/template
[ah_templ_url]: https://github.com/a-h/templ
[cf_blog_timeouts_url]: https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/
[tailwindcss_url]: https://tailwindcss.com
[unocss_url]: https://unocss.dev
[nodejs_url]: https://nodejs.org
[bun_url]: https://bun.sh
[htmx_url]: https://htmx.org
[hyperscript_url]: https://hyperscript.org