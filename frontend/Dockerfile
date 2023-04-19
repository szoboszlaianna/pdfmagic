# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container at /app
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Build the app for production
RUN npm run build

# Expose port 3000 for the React app
EXPOSE 3000

# Define the command to run the React app
CMD ["npm", "start"]
