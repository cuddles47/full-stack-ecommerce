FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm ci

# Sao chép toàn bộ code source
COPY . .

# Build ứng dụng
RUN npm run build

# Giai đoạn sản phẩm - Sử dụng image nhẹ hơn
FROM node:20-alpine AS production

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt chỉ các dependencies production
RUN npm ci --only=production

# Sao chép các tệp đã build từ giai đoạn builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Thiết lập biến môi trường
ENV NODE_ENV=production
ENV PORT=3001

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3001

# Chạy ứng dụng
CMD ["node", "dist/server.js"]