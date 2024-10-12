# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend files to the container
COPY . .

# Expose port 3000 (or whichever port your backend runs on)
EXPOSE 3000

# Command to run the backend
CMD ["node", "server.js"]
