# Dockerfile for Frontend

# Use official Node.js image as the base
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the frontend for production
RUN npm run build

# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

# Copy the production build from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
