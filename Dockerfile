FROM node:20.18.0-alpine
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Command to start the application
CMD ["npm", "run", "start:prod"]
