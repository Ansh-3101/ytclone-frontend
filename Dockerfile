FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update -y
RUN apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY README.md README.md
COPY next.config.js next.config.js
COPY jsconfig.json jsconfig.json
COPY public public
COPY redux redux
COPY pages pages
COPY components components
COPY services services
COPY styles styles
COPY .env .env


RUN npm run build

ENTRYPOINT [ "npm", "start" ]
