FROM vuejs/ci:latest AS build
WORKDIR /workdir
COPY . .
RUN yarn build

FROM nginx:1.18.0-alpine AS prod
COPY --from=build /workdir/dist/ /usr/share/nginx/html/
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

