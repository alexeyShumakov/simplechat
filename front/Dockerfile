FROM node:10.16.3
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm i
EXPOSE 8080
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "8080"]
