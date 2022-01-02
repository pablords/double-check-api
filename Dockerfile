FROM node:14-slim


SHELL ["/bin/bash","-c"]

WORKDIR /app

ARG ENVIRONMENT=PRODUCTION

COPY ./package.json .

RUN npm install

COPY . .


RUN chmod +x entrypoint.sh
RUN /bin/bash entrypoint.sh

EXPOSE 3333


CMD ["npm","start"]



