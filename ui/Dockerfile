
# 1️⃣ Use official Node.js image as the base
FROM node:22 AS builder

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package.json and lock file to install dependencies
COPY package.json package-lock.json ./  

# 4️⃣ Install dependencies (ignoring devDependencies for production)
RUN npm install --legacy-peer-deps

# 5️⃣ Copy the rest of the app
COPY . .

# 6️⃣ Build the Next.js app
RUN npm run build

# 7️⃣ Use a smaller image for the final container
FROM node:22 AS runner

# 8️⃣ Set environment variable (prevents unnecessary rebuilds)
ENV NODE_ENV=production

# 9️⃣ Set working directory
WORKDIR /app

# 🔟 Copy only the necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/postcss.config.mjs ./

# 1️⃣1️⃣ Expose port 8080 instead of 3000
EXPOSE 8080

# 1️⃣2️⃣ Start Next.js on port 8080
CMD ["npm", "run", "start", "--", "-p", "8080"]
