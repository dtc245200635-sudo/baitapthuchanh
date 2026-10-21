# 🚀 Hệ Thống Website Portfolio Cá Nhân - Đóng Gói Docker & CI/CD Pipeline
### Học phần: Triển khai và Quản trị Hệ thống Phần mềm
**Sinh viên thực hiện:** Bàn Đức Duy  
**Mã số sinh viên:** `dtc245200635`  
**Trường:** Đại học Công nghệ Thông tin và Truyền thông (ICTU)  

---

## 📌 Giới Thiệu Đề Tài
Dự án xây dựng trang Portfolio cá nhân hiện đại và triển khai theo chuẩn quy trình DevOps:
- **Web Server:** Nginx 1.25 Alpine tối ưu hóa nén Gzip, Browser Cache, Security Headers.
- **Containerization:** Đóng gói Dockerfile siêu nhẹ (< 25MB) kèm chỉ thị `HEALTHCHECK`.
- **Orchestration:** Điều phối dịch vụ bằng `docker-compose.yml` (Port 8080:80, Quản lý log, Restart Policy).
- **Automation:** Script tự động hóa triển khai `deploy.sh`.
- **CI/CD Pipeline:** Tự động hóa kiểm thử và đóng gói qua GitHub Actions (`.github/workflows/deploy.yml`).

---

## 🛠️ Hướng Dẫn Chạy Nhanh Bằng Docker

```bash
# 1. Kéo mã nguồn về
git clone https://github.com/dtc245200635-sudo/baitapthuchanh.git
cd baitapthuchanh

# 2. Khởi chạy hệ thống bằng Docker Compose
docker-compose up -d --build

# 3. Kiểm tra trang web
curl http://localhost:8080
# Kiểm tra trạng thái giám sát (Healthcheck)
curl http://localhost:8080/health
```

---

## 📂 Cấu Trúc Dự Án
```text
├── .github/workflows/deploy.yml   # Pipeline CI/CD tự động trên GitHub Actions
├── Dockerfile                     # Đóng gói Nginx Alpine Image
├── nginx.conf                     # Cấu hình Web Server Nginx
├── docker-compose.yml             # Điều phối container và mạng nội bộ
├── deploy.sh                      # Shell script tự động hóa 1-click
├── index.html                     # Giao diện Portfolio cá nhân (Light Mode / Dark Mode)
├── BAO_CAO_TRIEN_KHAI.md          # Báo cáo chi tiết thi học phần
└── README.md                      # Hướng dẫn dự án
```
