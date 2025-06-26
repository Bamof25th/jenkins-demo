# Use official Node.js image for build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Use a lightweight image to serve the app
FROM node:20-alpine AS serve
WORKDIR /app
RUN npm install -g http-server
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8080"]
