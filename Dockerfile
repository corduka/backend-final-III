
# 1. Base Image: Use a lightweight Node.js image
FROM node:20-slim

# 2. Set Working Directory: This is the main folder inside the container
WORKDIR /usr/src/app

# 3. Copy Dependencies: Copy package files first to cache the install step
COPY package*.json ./

# 4. Install Dependencies: Install all packages
RUN npm install

# 5. Copy Source Code: Copy the rest of your project files
COPY . .

# 6. Expose Port: Inform Docker which port the app runs on (must match your PORT in .env)
EXPOSE 8080

# 7. Start Command: The instruction to run when the container starts
# Assuming your package.json has "start": "node app.js" or similar
CMD ["npm", "start"]