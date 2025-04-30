FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Giai đoạn sản phẩm
FROM node:20-alpine AS production

WORKDIR /app

# Thiết lập biến môi trường production
ENV NODE_ENV=production

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt chỉ các dependencies production
RUN npm ci --only=production

# Sao chép từ builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]