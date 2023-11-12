# How does it work?

The **Gowebly** CLI is built on top of the [Go][go_url] programming language.

Therefore, it can run successfully on any supported system and architecture as an executable application. All the templates for the project (both backend and frontend) that it generates as a result of its work are already included in this executable. That is, you do not need any additional files to work with the CLI.

A lot of the processes that the CLI runs under the hood are executed in parallel, thanks to **goroutines**.

## Backend part

The templates for the **backend** part of your project have been thoroughly tested and contain only the features and parameters you need to get started. You can use them as a good start and improve them as your project grows.

To be more efficient, the CLI supports the [Templ][ah_templ_url] templating engine. With its help, you can rapidly create UIs for your project without leaving the traditional Go environment. All templates are regular Go functions, without having to create additional HTML templates and deal with the built-in Go templating engine (from the `html/template` package).

## Frontend part

To create a build for the **frontend** part, the quick and easy [Parcel][parcel_url] bundler version `2` was chosen. This allowed us to reduce the unnecessarily stressful moment of frontend build to the maximum. No more need to understand configurations, the CLI has already prepared it for you.

### JavaScript runtime environment

We keep up with the latest updates to **frontend development tools**, so the CLI supports two JavaScript runtime environments: via the standard [Node.js][nodejs_url] and the new and extremely fast [Bun][bun_url] (which is backwards compatible with Node.js). You can choose whichever you like best for your project in the CLI settings.

### htmx

The CLI also includes an HTTP client that allows background downloading of [htmx][htmx_url] JavaScript files from a remote CDN for further use in your project.

## Deploy

To successfully **deploy** your project to a remote server (or in the cloud), the CLI has pre-prepared Docker files (`docker-compose.yml` and `Dockerfile`). They already contain all the settings you need to create an isolated container exactly with your project.

## Conclusion

All of this together gives us the confidence to say that you will enjoy working with the **Gowebly** CLI, whatever your experience in code and web development! :wink:

<!--@include: ../parts/links.md-->