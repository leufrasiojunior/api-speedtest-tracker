# Use the official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application files into the container
COPY . .

# Run npm run build to bundle the application
RUN npm run build

# Expose port 8000
EXPOSE 8000

# Start the application
CMD ["npm", "start"]