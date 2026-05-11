# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app



COPY package*.json ./
RUN npm install

COPY . .

# Now Vite will see the variable and replace it in your code
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]