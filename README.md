# HeLx Search Client

This is a stand-alone client to use [DUG](https://github.com/helxplatform/dug)This is a [React](https://reactjs.org/) app containerized for development and production with [Docker Compose](https://docs.docker.com/compose/).

## Prerequisites

Define the API URL for DUG as the environment variable `REACT_APP_HELX_PATH` in `./.env`. use `./.env.sample` as a guide. For the development server, you will need to specify the port with the variable `CLIENT_PORT` on which to serve the application.

## Development

The devlopment build details are defined in `./docker-compose.yaml` and `./Dockerfile`. This compose file is used by default when executing the following command.

```bash
$ docker-compose up --build
```

Omit the `--build` directive if a build is unecessary. Visit `http://localhost:<CLIENT_PORT>` in a web browser to view the application. Note that one can safely within this containerized environment with hot module reloading.

## Production

The production build details are defined in `./docker-compose.prod.yaml` and `./Dockerfile-prod`. Be sure to specify this compose file when building for production with the following command.

```bash
$ docker-compose -f docker-compose.prod.yaml up --build
```

For production, this deployment uses a multi-stage build (Node to build, Nginx to deploy), thus we make use of the Nginx configuration file `./nginx.conf`. This deploys to the host machine's port 80.
