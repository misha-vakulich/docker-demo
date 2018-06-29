FROM node:carbon

WORKDIR /usr/src

COPY /server ./
RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start" ]