# syntax=docker/dockerfile:1
FROM node:lts

WORKDIR /app

COPY ./ui .

EXPOSE 8000

RUN npm install
RUN npm install -g @angular/cli

ENTRYPOINT ["ng serve"]