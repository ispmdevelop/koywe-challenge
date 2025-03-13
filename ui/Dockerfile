
FROM node:22 AS builder

WORKDIR /app

COPY package.json package-lock.json ./  

RUN npm install --omit=dev

COPY . .

RUN npm run build

FROM node:22 AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 8080

CMD ["npm", "run", "start", "--", "-p", "8080"]
