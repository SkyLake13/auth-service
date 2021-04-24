# Stage 1
FROM node:14-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM node:14-alpine
COPY --from=build-stage /app/dist ./app
WORKDIR /app
RUN ls
EXPOSE 8080
CMD [ "node", "index.js" ]
