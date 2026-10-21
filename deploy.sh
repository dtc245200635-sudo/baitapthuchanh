#!/bin/bash
# ==============================================================================
# Script Tự Động Hóa Triển Khai Website Portfolio
# Môn: Triển khai và Quản trị Hệ thống Phần mềm
# Sinh viên: Bàn Đức Duy - MSV: dtc245200635
# ==============================================================================

set -e

echo "🚀 [1/5] Bắt đầu quy trình triển khai Portfolio..."

# 1. Cập nhật mã nguồn mới nhất từ Git (nếu đang chạy trên server)
if [ -d ".git" ]; then
    echo "📥 [2/5] Kéo mã nguồn mới nhất từ repository Git..."
    git pull origin main
else
    echo "ℹ️ Bỏ qua git pull (không tìm thấy thư mục .git)"
fi

# 2. Dừng và dọn dẹp container cũ
echo "🛑 [3/5] Dừng container đang chạy (nếu có)..."
docker-compose down || true

# 3. Build lại image mới với cache tối ưu
echo "🔨 [4/5] Tiến hành đóng gói Docker Image mới..."
docker-compose build --no-cache

# 4. Khởi động hệ thống mới
echo "🟢 [5/5] Khởi động container ở chế độ nền (Detached mode)..."
docker-compose up -d

# 5. Kiểm tra trạng thái hoạt động (Healthcheck)
echo "⏳ Đang kiểm tra trạng thái sức khỏe hệ thống..."
sleep 3

if docker ps | grep -q "duy_portfolio_app"; then
    echo "=========================================================="
    echo "✅ TRIỂN KHAI THÀNH CÔNG!"
    echo "🌐 Truy cập website tại: http://localhost:8080"
    echo "📊 Endpoint kiểm tra sức khỏe: http://localhost:8080/health"
    echo "=========================================================="
else
    echo "❌ Có lỗi xảy ra trong quá trình khởi động container!"
    docker-compose logs
    exit 1
fi
