# Stage 1: Build React app
FROM node:14 AS build

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app using nginx
FROM nginx:alpine

# Copy the build artifacts from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port that nginx runs on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
