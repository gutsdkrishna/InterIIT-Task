# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the Node.js app
CMD ["node", "server.js"]
