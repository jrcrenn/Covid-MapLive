FROM node:13

WORKDIR /usr/app

COPY package.json .

RUN npm install --quiet
RUN npm audit fix

COPY . .

EXPOSE 3000

CMD ["npm", "start"]