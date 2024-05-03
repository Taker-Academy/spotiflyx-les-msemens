# Use a specific version of node:16-alpine for more consistent builds
FROM node:16.13.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Set environment to production (this can be overridden)
ENV NODE_ENV production

# Command to run your app using npm start script
CMD ["npm", "run", "serve"]