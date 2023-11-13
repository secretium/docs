---
editLink: false
lastUpdated: false
---

# How does it work?

This section will help you understand how **Secretium** works.

<!--@include: ../parts/block_want-to-try.md-->

## Backend part

The **Secretium** project is built on top of the [Go][go_url] programming language.

Therefore, it can run successfully on any supported system and architecture as an executable application. All the static files and templates for the project are embedded to the executable. You can use it as a ready-to-use application.

The whole **backend** part of our project has been thoroughly tested and contains only those libraries, functions, and parameters that are necessary for a successful performance.

To increase efficiency, **Secretium** uses the wonderful [Templ][backend_templ_url] package to create all the UI templates. All templates are regular Go functions, which means compile time and embedding static files are not issues. This reduces the overall development time without leaving the familiar Go environment.

### Storing data

The **Secretium** project uses the [SQLite][docker_secrets_url] database to store your data.

All data is securely stored in a database on your host in encrypted format, through the [AES encryption algorithm][backend_aes_url]. We constantly monitor security updates and regularly update the versions of all project packages.

## Frontend part

The **frontend** part of the project was done using a modern approach to production.

The JavaScript library [htmx][frontend_htmx_url] and the atomic/utility-first CSS framework [Tailwind][frontend_tailwind_url] help us with this. Likewise, we're just excited about the open source fonts [Inter][frontend_inter_url] and [Fira Code][frontend_fira_code_url].

## Deploy

The **Secretium** project is built in such a way that you can quickly and easily run it in an isolated Docker container. The official [Docker image][docker_secretium_image_url] will help you with that.

All steps required for successful deployment on your remote server have already been explained in the [Complete user guide](/complete-user-guide) section.

## Conclusion

All of this together gives us the confidence to say that you will enjoy working with the **Secretium** project, whatever your experience in code and web development! :wink:

<!--@include: ../parts/links.md-->