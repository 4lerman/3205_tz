# Step 1: Use Node.js as the base image
FROM node:22-alpine

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the TypeScript application
RUN npm run build

# Step 7: Expose the port your app runs on
EXPOSE 3000

# Step 8: Start the application
CMD ["npm", "start"]
