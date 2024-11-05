# docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) -t zach.sexy .
FROM denoland/deno:1.38.3

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .
RUN deno task build

EXPOSE 8000

CMD ["run", "-A", "main.ts"]
