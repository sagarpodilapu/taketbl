FROM node:10
RUN mkdir -p /usr/src/app
ADD ./package.json ./usr/src/app
ADD ./src ./usr/src/app/src
ADD ./public ./usr/src/app/public
RUN npm install
RUN npm build
RUN npm install react-scripts -g
WORKDIR /usr/src/app
CMD [ "npm", "start" ]
