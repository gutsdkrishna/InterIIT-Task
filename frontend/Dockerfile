# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files to the container
COPY . .

# Build the frontend
RUN npm run build

# Install a simple web server to serve the built frontend
RUN npm install -g serve

# Expose port 5000 (or whichever port you want to serve the frontend on)
EXPOSE 5000

# Command to run the frontend in production mode
CMD ["serve", "-s", "build"]
