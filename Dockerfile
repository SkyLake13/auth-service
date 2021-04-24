# Stage 1
FROM node:14-alpine AS build-stage
WORKDIR /app
COPY package*.json ./app/
RUN npm install
COPY . .
RUN npm run build
RUN npm ci --only=production
RUN ls


# Stage 2
FROM node:14-alpine
COPY --from=build-stage /app/dist ./app
WORKDIR /app
EXPOSE 8080
CMD [ "node", "index.js" ]
RUN ls
