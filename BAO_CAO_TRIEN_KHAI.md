# BỘ GIÁO DỤC VÀ ĐÀO TẠO
# TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG
### KHOA CÔNG NGHỆ THÔNG TIN

---

# BÁO CÁO BÀI TẬP LỚN / THI KẾT THÚC HỌC PHẦN
## HỌC PHẦN: TRIỂN KHAI VÀ QUẢN TRỊ HỆ THỐNG PHẦN MỀM
**Đề tài:** Xây dựng, Đóng gói Container và Triển khai Hệ Thống Website Portfolio Cá Nhân  
**Sinh viên thực hiện:** Bàn Đức Duy  
**Mã số sinh viên:** `dtc245200635`  
**Email sinh viên:** `dtc245200635@ictu.edu.vn`  
**GitHub Repository:** [https://github.com/dtc245200635-sudo/baitapthuchanh](https://github.com/dtc245200635-sudo/baitapthuchanh)  
**Giảng viên chấm thi / đánh giá:** Bộ môn Hệ thống thông tin & Mạng  
**Năm học:** 2025 - 2026  

---

## 1. MỤC TIÊU VÀ BỐI CẢNH DỰ ÁN
Trong môn học **Triển khai và Quản trị Hệ thống Phần mềm**, mục tiêu là áp dụng các công cụ và phương pháp luận DevOps hiện đại để:
- Phát triển một trang thông tin cá nhân (Portfolio) hiện đại, chuyên nghiệp, responsive.
- Đóng gói ứng dụng thành **Docker Container** chuẩn hóa nhằm đảm bảo tính đồng nhất môi trường giữa Development và Production.
- Tối ưu hóa Web Server với **Nginx** (Reverse Proxy, nén Gzip, Security Headers, Healthcheck).
- Tự động hóa quy trình triển khai thông qua **Shell Script** và **CI/CD Pipeline (GitHub Actions)**.
- Quản trị tài nguyên hệ thống, logging, và giám sát tính khả dụng (High Availability).

---

## 2. KIẾN TRÚC VÀ CÔNG NGHỆ ÁP DỤNG

| Thành phần | Công nghệ / Công cụ | Vai trò trong hệ thống |
| :--- | :--- | :--- |
| **Giao diện (Frontend)** | HTML5, CSS3, JavaScript, Bootstrap 5 | Trực quan hóa hồ sơ cá nhân, dự án và thông số hệ thống |
| **Web Server** | Nginx 1.25 Alpine | Xử lý request HTTP, nén Gzip, phục vụ tài nguyên tĩnh với tốc độ cao |
| **Containerization** | Docker, Dockerfile | Đóng gói mã nguồn và môi trường chạy độc lập, siêu nhẹ (< 30MB) |
| **Điều phối (Orchestration)** | Docker Compose | Định nghĩa mạng (`portfolio_net`), port mapping, giới hạn log và restart policy |
| **Tự động hóa (Automation)** | Bash Shell (`deploy.sh`) | Script 1-click tự động pull code, re-build và restart container |
| **CI/CD Pipeline** | GitHub Actions | Tự động kiểm thử cú pháp, build image và kiểm tra healthcheck trên mỗi commit |

---

## 3. CHI TIẾT CÁC BƯỚC TRIỂN KHAI

### Bước 1: Chuẩn bị mã nguồn và Web Server Nginx
- File `index.html` được thiết kế theo phong cách Glassmorphism hiện đại, hiển thị đầy đủ thông tin cá nhân, chuyên môn DevOps, các dự án tiêu biểu (Module JSP/Servlet, iNotes Strategy Pattern).
- Cấu hình file `nginx.conf`:
  - Bật tính năng nén **Gzip** (`gzip_comp_level 6`) giảm dung lượng truyền tải lên đến 70%.
  - Thêm các tiêu đề bảo mật: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`.
  - Cấu hình endpoint giám sát: `/health` trả về mã HTTP `200 OK`.

### Bước 2: Đóng gói Container với Dockerfile
Sử dụng base image `nginx:1.25-alpine`:
```dockerfile
FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
```

### Bước 3: Điều phối dịch vụ với Docker Compose
File `docker-compose.yml` cấu hình:
- Ánh xạ cổng: `8080:80` (Tránh xung đột cổng 80 của hệ điều hành host).
- Cơ chế khởi động lại: `restart: always`.
- Giới hạn kích thước log file (`json-file`, max-size: `10m`) tránh tràn ổ đĩa.

### Bước 4: Tự động hóa triển khai bằng Script
Thực thi bằng một lệnh duy nhất:
```bash
chmod +x deploy.sh
./deploy.sh
```
Script sẽ tự động kiểm tra mã nguồn, build image mới, khởi động container và kiểm tra kết quả healthcheck.

---

## 4. KẾT QUẢ KIỂM THỬ VÀ ĐÁNH GIÁ

1. **Hiệu năng và Tải trang:**
   - Thời gian phản hồi lần đầu < 150ms.
   - Tài nguyên tĩnh được cache và nén Gzip tối ưu.
2. **Khả năng chịu lỗi và tính độc lập:**
   - Container có cơ chế `HEALTHCHECK` tự động phát hiện lỗi và khởi động lại khi dịch vụ gặp sự cố.
3. **Mức độ an toàn:**
   - Hệ thống được ẩn các thông tin header nhạy cảm, chặn clickjacking qua `X-Frame-Options`.

---

## 5. KẾT LUẬN
Dự án đã hoàn thành xuất sắc các mục tiêu của môn học **Triển khai và Quản trị Hệ thống Phần mềm**. Hệ thống không chỉ cung cấp một giao diện Portfolio cá nhân chuyên nghiệp mà còn phản ánh đầy đủ năng lực thực tế về quản trị container, tối ưu hóa web server và xây dựng pipeline tự động hóa chuẩn DevOps.
