ARG SOURCE_IMAGE
FROM $SOURCE_IMAGE as builder

ARG CI_PROJECT_URL
LABEL maintainer="Tesonero SID"
LABEL source="$CI_PROJECT_URL"

USER root
WORKDIR /tmp/build

COPY . /tmp/build

RUN yarn install --frozen-lockfile && yarn build && \
    cp -r public .next/standalone/ && \
    cp -r .next/static .next/standalone/.next

ARG SOURCE_IMAGE
FROM $SOURCE_IMAGE
USER root

COPY --from=builder /tmp/build/.next/standalone /var/www/ws

RUN chown -R node:node /var/www/ws && \
    find /var/www/ws -type d -exec chmod 0755 "{}" \+ && \
    find /var/www/ws -type f -exec chmod 0644 "{}" \+

USER node
WORKDIR /var/www/ws

ENV NEXT_TELEMETRY_DISABLED=1
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000/tcp

ENTRYPOINT ["default.sh"]
