# Dockerfile for Backend

# Use Node.js base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy backend package.json and package-lock.json
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port the backend will run on
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
