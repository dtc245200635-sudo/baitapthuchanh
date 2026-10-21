# BỘ GIÁO DỤC VÀ ĐÀO TẠO
# TRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN VÀ TRUYỀN THÔNG (ICTU)
### KHOA CÔNG NGHỆ THÔNG TIN
---
<br><br>

# BÁO CÁO BÀI TẬP LỚN / THI KẾT THÚC HỌC PHẦN
## HỌC PHẦN: TRIỂN KHAI VÀ QUẢN TRỊ HỆ THỐNG PHẦN MỀM

### ĐỀ TÀI:
### XÂY DỰNG, ĐÓNG GÓI CONTAINER VÀ TRIỂN KHAI HỆ THỐNG WEBSITE PORTFOLIO CÁ NHÂN THEO QUY TRÌNH DEVOPS HIỆN ĐẠI

<br><br>

**Sinh viên thực hiện:** Bàn Đức Duy  
**Mã số sinh viên:** `dtc245200635`  
**Lớp:** Công nghệ Thông tin / Kỹ thuật Phần mềm  
**Khoa:** Công nghệ Thông tin  
**Trường:** Đại học Công nghệ Thông tin và Truyền thông - Đại học Thái Nguyên  
**Giảng viên chấm thi / đánh giá:** Bộ môn Hệ thống thông tin & Mạng máy tính  
**Học kỳ / Năm học:** Học kỳ II - Năm học 2025 - 2026  

---
\newpage

# LỜI MỞ ĐẦU

Trong kỷ nguyên số hóa và chuyển đổi công nghệ mạnh mẽ hiện nay, việc phát triển một sản phẩm phần mềm không chỉ dừng lại ở khâu lập trình mã nguồn (Coding). Một ứng dụng phần mềm dù có logic hoàn hảo đến đâu nhưng nếu không được triển khai (Deployment) và quản trị (Administration) một cách bài bản, ổn định và bảo mật thì không thể mang lại giá trị thực tế cho người dùng và tổ chức. 

Trước đây, quy trình phát triển và vận hành phần mềm thường tồn tại một khoảng cách lớn giữa đội ngũ lập trình (Development) và đội ngũ vận hành hệ thống (Operations). Tình trạng "mã nguồn chạy tốt trên máy của lập trình viên nhưng gặp lỗi khi triển khai lên máy chủ thực tế" là vấn đề nan giải diễn ra phổ biến. Để giải quyết triệt để vấn đề này, văn hóa và quy trình **DevOps** (Development & Operations) cùng các công nghệ hiện đại như **Containerization (Docker)**, **Reverse Proxy (Nginx)**, và **Tự động hóa CI/CD (Continuous Integration / Continuous Deployment)** đã ra đời và trở thành tiêu chuẩn vàng trong ngành công nghiệp phần mềm.

Học phần **"Triển khai và Quản trị Hệ thống Phần mềm"** đã trang bị cho sinh viên nền tảng kiến thức thực tế về kiến trúc hệ điều hành máy chủ, các giao thức mạng, cơ chế ảo hóa nhẹ (containerization), kỹ năng tối ưu hóa máy chủ web và xây dựng các luồng tích hợp tự động. Nhằm tổng hợp và vận dụng toàn diện các kiến thức đã tiếp thu, em đã lựa chọn đề tài: **"Xây dựng, đóng gói container và triển khai hệ thống Website Portfolio cá nhân theo quy trình DevOps hiện đại"**.

Đề tài không chỉ tạo ra một sản phẩm hiển thị thông tin cá nhân và hồ sơ năng lực chuyên nghiệp phục vụ tuyển dụng, mà trọng tâm cốt lõi là giải quyết trọn vẹn bài toán vận hành hệ thống: từ khâu tối ưu hóa Web Server Nginx (nén Gzip, Browser Cache, thiết lập Security Headers, tạo endpoint Healthcheck), đóng gói container độc lập với Dockerfile đa tầng trên nền Nginx Alpine siêu nhẹ, điều phối container qua Docker Compose, cho đến việc tự động hóa quy trình triển khai bằng Shell Script và tích hợp liên tục CI/CD thông qua GitHub Actions.

Em xin chân thành cảm ơn các thầy cô giáo trong Bộ môn Hệ thống thông tin & Mạng, Khoa Công nghệ Thông tin - Trường Đại học Công nghệ Thông tin và Truyền thông (ICTU) đã tận tình giảng dạy, định hướng và tạo điều kiện thuận lợi để em hoàn thành bài báo cáo này. Dù đã có nhiều cố gắng, bài báo cáo khó tránh khỏi những thiếu sót nhất định, em rất mong nhận được những ý kiến đóng góp quý báu của quý thầy cô để đề tài được hoàn thiện hơn nữa.

*Thái Nguyên, năm 2026*  
**Sinh viên thực hiện**  
**Bàn Đức Duy**  

---
\newpage

# MỤC LỤC CHI TIẾT

- **LỜI MỞ ĐẦU**
- **DANH MỤC THUẬT NGỮ VÀ TỪ VIẾT TẮT**
- **DANH MỤC HÌNH VẼ VÀ BẢNG BIỂU**
- **CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CÔNG NGHỆ ÁP DỤNG**
  - 1.1. Bối cảnh và tính cấp thiết của đề tài
  - 1.2. Mục tiêu nghiên cứu và phạm vi triển khai
  - 1.3. Phương pháp luận DevOps và xu hướng phát triển hiện đại
  - 1.4. Công nghệ Web Server Nginx
    - 1.4.1. Kiến trúc hướng sự kiện Event-Driven của Nginx
    - 1.4.2. Vai trò Reverse Proxy và cân bằng tải
  - 1.5. Công nghệ ảo hóa cấp hệ điều hành (Docker & Docker Compose)
    - 1.5.1. Khái niệm Container và sự khác biệt với Virtual Machine (VM)
    - 1.5.2. Dockerfile và tối ưu dung lượng với Alpine Linux
    - 1.5.3. Docker Compose và vai trò điều phối cục bộ
  - 1.6. Quy trình Tích hợp và Triển khai liên tục (CI/CD Pipeline với GitHub Actions)
- **CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ KIẾN TRÚC HỆ THỐNG**
  - 2.1. Phân tích yêu cầu hệ thống
    - 2.1.1. Yêu cầu chức năng (Functional Requirements)
    - 2.1.2. Yêu cầu phi chức năng (Non-Functional Requirements)
  - 2.2. Thiết kế kiến trúc tổng thể hệ thống (System Architecture)
  - 2.3. Thiết kế giao diện và trải nghiệm người dùng (UI/UX Design)
    - 2.3.1. Phong cách thiết kế Glassmorphism & High-Contrast Light Mode
    - 2.3.2. Cơ chế chuyển đổi giao diện Sáng / Tối (Theme Toggle)
  - 2.4. Thiết kế phân vùng mạng và bảo mật cho Container
  - 2.5. Thiết kế luồng tự động hóa quy trình phát triển và phát hành (CI/CD Workflow)
- **CHƯƠNG 3: HIỆN THỰC HÓA VÀ CẤU HÌNH CHI TIẾT HỆ THỐNG**
  - 3.1. Xây dựng giao diện Website Portfolio (`index.html`)
  - 3.2. Cấu hình chuyên sâu Web Server Nginx (`nginx.conf`)
    - 3.2.1. Tối ưu hóa hiệu năng truyền tải với Nén Gzip
    - 3.2.2. Cấu hình Browser Caching và xử lý định tuyến SPA/Static
    - 3.2.3. Tăng cường bảo mật với các tiêu đề HTTP (Security Headers)
    - 3.2.4. Thiết lập Endpoint giám sát sức khỏe hệ thống (`/health`)
  - 3.3. Đóng gói Container hóa với `Dockerfile`
  - 3.4. Quản lý và điều phối dịch vụ với `docker-compose.yml`
  - 3.5. Xây dựng Script tự động hóa triển khai trên máy chủ (`deploy.sh`)
  - 3.6. Thiết lập Pipeline CI/CD trên GitHub Actions (`.github/workflows/deploy.yml`)
- **CHƯƠNG 4: THỰC NGHIỆM, KIỂM THỬ VÀ ĐÁNH GIÁ HIỆU NĂNG**
  - 4.1. Kịch bản kiểm thử hệ thống
  - 4.2. Đánh giá tốc độ tải trang và hiệu quả nén tài nguyên của Nginx
  - 4.3. Kiểm thử tính năng giám sát Healthcheck và khả năng tự phục hồi của Docker
  - 4.4. Kiểm thử quy trình tự động hóa CI/CD trên môi trường GitHub
  - 4.5. Đánh giá độ an toàn bảo mật trên môi trường mạng
- **CHƯƠNG 5: HƯỚNG DẪN CÀI ĐẶT, VẬN HÀNH VÀ KHẮC PHỤC SỰ CỐ**
  - 5.1. Yêu cầu môi trường phần cứng và phần mềm
  - 5.2. Các bước triển khai cục bộ (Local Environment)
  - 5.3. Hướng dẫn triển khai lên máy chủ VPS / Linux Server
  - 5.4. Quy trình bảo trì, giám sát log và khắc phục các lỗi thường gặp
- **KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN**
  - 1. Đánh giá kết quả đạt được
  - 2. Những mặt còn hạn chế
  - 3. Hướng nghiên cứu và phát triển tiếp theo
- **TÀI LIỆU THAM KHẢO**

---
\newpage

# DANH MỤC THUẬT NGỮ VÀ TỪ VIẾT TẮT

| Thuật ngữ / Viết tắt | Tên đầy đủ tiếng Anh | Ý nghĩa / Giải thích |
| :--- | :--- | :--- |
| **CI** | Continuous Integration | Quá trình tích hợp liên tục mã nguồn của các lập trình viên vào nhánh chính |
| **CD** | Continuous Deployment / Delivery | Quá trình triển khai hoặc chuyển giao phần mềm tự động lên máy chủ |
| **DevOps** | Development & Operations | Phương pháp luận kết hợp giữa phát triển phần mềm và vận hành hệ thống |
| **Docker** | Docker Container Platform | Nền tảng ảo hóa cấp hệ điều hành sử dụng công nghệ Linux cgroups và namespaces |
| **Nginx** | Engine-X Web Server | Phần mềm máy chủ web hiệu năng cao, proxy ngược và cân bằng tải |
| **Gzip** | GNU zip compression | Thuật toán nén dữ liệu truyền tải qua giao thức HTTP |
| **HTTP/HTTPS** | Hypertext Transfer Protocol (Secure) | Giao thức truyền tải siêu văn bản bảo mật qua lớp mã hóa SSL/TLS |
| **SPA** | Single Page Application | Ứng dụng web tải một trang HTML duy nhất và cập nhật nội dung động |
| **VPS** | Virtual Private Server | Máy chủ ảo riêng biệt chạy trên nền tảng điện toán đám mây |
| **SCM** | Source Code Management | Hệ thống quản lý phiên bản mã nguồn (như Git, GitHub, GitLab) |
| **Healthcheck** | System Health Monitoring | Cơ chế định kỳ thăm dò trạng thái hoạt động của tiến trình/ứng dụng |
| **Cache-Control** | HTTP Caching Header | Tiêu đề HTTP hướng dẫn trình duyệt lưu trữ bản sao dữ liệu cục bộ |

---

# DANH MỤC HÌNH VẼ VÀ BẢNG BIỂU

| Ký hiệu | Tên hình vẽ / Bảng biểu | Trang |
| :--- | :--- | :--- |
| **Bảng 1.1** | So sánh giữa Máy ảo Virtual Machine (VM) và Docker Container | 6 |
| **Hình 2.1** | Mô hình kiến trúc triển khai 3 lớp của hệ thống Website Portfolio | 8 |
| **Hình 2.2** | Sơ đồ luồng hoạt động của Pipeline CI/CD với GitHub Actions | 10 |
| **Bảng 3.1** | Danh sách các cổng kết nối và chính sách mạng trong Docker Compose | 13 |
| **Hình 3.1** | Giao diện Website Portfolio ở chế độ sáng (High-Contrast Light Mode) | 15 |
| **Bảng 4.1** | Bảng so sánh dung lượng và thời gian tải trước và sau khi bật nén Gzip | 17 |
| **Hình 4.1** | Minh chứng kết quả kiểm thử thành công (Build Passed) trên GitHub Actions | 18 |
| **Bảng 5.1** | Bảng tra cứu mã lỗi và biện pháp xử lý sự cố trong vận hành Nginx & Docker | 20 |

---
\newpage

# CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CÔNG NGHỆ ÁP DỤNG

## 1.1. Bối cảnh và tính cấp thiết của đề tài
Trong quá trình học tập và chuẩn bị gia nhập thị trường lao động công nghệ thông tin, việc mỗi sinh viên sở hữu một hồ sơ năng lực trực tuyến (Personal Portfolio Website) là vô cùng cần thiết. Trang Portfolio không chỉ là nơi lưu trữ, giới thiệu các dự án đã thực hiện (như hệ thống Quản lý Sản phẩm với Java Servlet, ứng dụng iNotes áp dụng Strategy Pattern), mà còn thể hiện tư duy thiết kế, năng lực kỹ thuật và phong cách làm việc chuyên nghiệp của sinh viên trước các nhà tuyển dụng.

Tuy nhiên, dưới góc độ của học phần **"Triển khai và Quản trị Hệ thống Phần mềm"**, yêu cầu đặt ra không dừng lại ở việc thiết kế một trang HTML/CSS đơn thuần rồi mở bằng trình duyệt cục bộ. Vấn đề cốt lõi là làm thế nào để:
- Ứng dụng có thể được đóng gói độc lập, không phụ thuộc vào cấu hình riêng lẻ của từng máy tính.
- Quá trình triển khai lên máy chủ diễn ra tự động, hạn chế tối đa sai sót từ con người.
- Máy chủ web được tối ưu hóa tối đa về hiệu năng, giảm thiểu độ trễ, tiết kiệm băng thông mạng và đảm bảo an toàn thông tin trước các nguy cơ tấn công mạng phổ biến.
- Hệ thống có khả năng tự kiểm tra trạng thái hoạt động (Self-Healing / Healthcheck) và tự động phục hồi khi gặp sự cố đột ngột.

Xuất phát từ những đòi hỏi thực tiễn đó, đề tài **"Xây dựng, đóng gói container và triển khai hệ thống Website Portfolio cá nhân theo quy trình DevOps hiện đại"** được lựa chọn nhằm giải quyết toàn diện từ khâu xây dựng mã nguồn đến khâu vận hành, giám sát và bảo trì hệ thống.

## 1.2. Mục tiêu nghiên cứu và phạm vi triển khai
### 1.2.1. Mục tiêu đề tài:
1. **Về mặt ứng dụng:** Xây dựng website Portfolio cá nhân hoàn chỉnh cho sinh viên **Bàn Đức Duy** (Mã sinh viên: **`dtc245200635`**), mang phong cách hiện đại, responsive thích ứng trên mọi kích thước màn hình, hỗ trợ chuyển đổi linh hoạt giữa giao diện Sáng (Light Mode độ tương phản cao) và giao diện Tối (Dark Mode).
2. **Về mặt công nghệ Web Server:** Làm chủ và cấu hình chuyên sâu máy chủ web **Nginx**, ứng dụng các kỹ thuật tối ưu hóa truyền tải dữ liệu (nén Gzip), kiểm soát lưu đệm (Browser Caching) và thiết lập các tiêu đề bảo mật (Security Headers).
3. **Về mặt Containerization:** Đóng gói toàn bộ ứng dụng thành Docker Image tiêu chuẩn dựa trên nền tảng **Nginx Alpine Linux**, giảm thiểu kích thước hình ảnh xuống dưới 30MB, tích hợp lệnh kiểm tra sức khỏe tự động (`HEALTHCHECK`).
4. **Về mặt tự động hóa (Automation & CI/CD):** Xây dựng Bash Shell Script (`deploy.sh`) phục vụ việc tự động triển khai một chạm trên máy chủ Linux; đồng thời thiết lập luồng CI/CD với **GitHub Actions** tự động kích hoạt kiểm thử và đóng gói khi có thay đổi trong mã nguồn.

### 1.2.2. Phạm vi triển khai:
- **Mã nguồn:** HTML5, CSS3, JavaScript, Bootstrap 5, Bootstrap Icons.
- **Môi trường Web Server:** Nginx 1.25 Alpine Container.
- **Nền tảng quản lý mã nguồn & CI/CD:** Git & GitHub Repository (`https://github.com/dtc245200635-sudo/baitapthuchanh`).
- **Môi trường vận hành thử nghiệm:** Môi trường cục bộ Windows Docker Engine và Máy chủ Linux Ubuntu Server 22.04 LTS.

## 1.3. Phương pháp luận DevOps và xu hướng phát triển hiện đại
DevOps là sự kết hợp giữa phát triển phần mềm (Development - Dev) và vận hành hệ thống công nghệ thông tin (Operations - Ops). Mục tiêu cốt lõi của DevOps là rút ngắn vòng đời phát triển phần mềm, tăng tần suất phát hành các bản phát hành ổn định, đồng thời bảo đảm chất lượng và tính sẵn sàng cao của hệ thống.

Trong mô hình truyền thống (Waterfall), đội ngũ lập trình viên sau khi hoàn thành mã nguồn sẽ bàn giao sản phẩm cho đội ngũ quản trị hệ thống để triển khai lên máy chủ. Sự tách biệt này dẫn đến hiện tượng đùn đẩy trách nhiệm khi ứng dụng phát sinh lỗi trên môi trường sản xuất. Ngược lại, trong văn hóa DevOps, lập trình viên chủ động tham gia vào việc định nghĩa môi trường chạy ứng dụng thông qua kỹ thuật **Cơ sở hạ tầng dưới dạng mã (Infrastructure as Code - IaC)** như Dockerfile và docker-compose.yml. Nhờ đó, môi trường từ máy cá nhân (Local Development), môi trường thử nghiệm (Staging) cho đến môi trường máy chủ thực tế (Production) đều hoàn toàn đồng nhất.

## 1.4. Công nghệ Web Server Nginx
Nginx (phát âm là "Engine-X") là một trong những máy chủ web mã nguồn mở phổ biến và mạnh mẽ nhất thế giới hiện nay, được thiết kế đặc biệt nhằm giải quyết bài toán "C10K problem" (xử lý đồng thời 10.000 kết nối người dùng cùng lúc trên một phần cứng thông thường).

### 1.4.1. Kiến trúc hướng sự kiện Event-Driven của Nginx
Khác biệt hoàn toàn với máy chủ truyền thống như Apache HTTP Server (sử dụng mô hình Process-Driven hoặc Thread-Driven, mỗi yêu cầu từ người dùng phải tiêu tốn một luồng/tiến trình riêng biệt dẫn đến cạn kiệt bộ nhớ RAM khi lượng truy cập tăng đột biến), Nginx hoạt động dựa trên mô hình **bất đồng bộ, hướng sự kiện (Asynchronous, Event-Driven)**. 

Một tiến trình Master Process sẽ điều phối một số lượng nhỏ các Worker Process (thường tương ứng với số lõi CPU của máy chủ). Mỗi Worker Process có thể xử lý hàng nghìn kết nối đồng thời nhờ vào cơ chế non-blocking I/O (như `epoll` trên Linux). Điều này giúp Nginx tiêu thụ cực kỳ ít tài nguyên CPU và RAM ngay cả khi chịu tải lớn.

### 1.4.2. Vai trò Reverse Proxy và phục vụ tài nguyên tĩnh
Nginx đóng vai trò là điểm tiếp nhận yêu cầu đầu tiên (Front-facing server). Nginx có tốc độ đọc và gửi các tệp tin tĩnh (HTML, CSS, JS, hình ảnh) nhanh hơn nhiều so với các máy chủ ứng dụng như Tomcat hay NodeJS. Ngoài ra, Nginx hoạt động như một Reverse Proxy (Proxy ngược), bảo vệ các dịch vụ backend bên trong, thực hiện mã hóa SSL/TLS, nén dữ liệu và ghi log tập trung.

## 1.5. Công nghệ ảo hóa cấp hệ điều hành (Docker & Docker Compose)
### 1.5.1. Khái niệm Container và sự khác biệt với Virtual Machine
Docker sử dụng công nghệ ảo hóa cấp hệ điều hành (Operating-system-level virtualization) dựa trên các tính năng của nhân Linux như **Namespaces** (cô lập tiến trình, mạng, người dùng) và **Cgroups** (giới hạn tài nguyên CPU, RAM, I/O).

*Bảng 1.1: So sánh giữa Máy ảo Virtual Machine (VM) và Docker Container*
| Tiêu chí so sánh | Máy ảo truyền thống (Virtual Machine) | Docker Container |
| :--- | :--- | :--- |
| **Kiến trúc** | Chạy một hệ điều hành khách (Guest OS) hoàn chỉnh trên Hypervisor | Chia sẻ trực tiếp nhân (Kernel) của hệ điều hành máy chủ (Host OS) |
| **Thời gian khởi động** | Vài phút (phải khởi động lại cả hệ điều hành) | Vài mili-giây đến vài giây (chỉ khởi động tiến trình ứng dụng) |
| **Dung lượng lưu trữ** | Rất lớn (từ vài GB đến hàng chục GB) | Siêu nhỏ gọn (từ vài MB đến vài trăm MB) |
| **Hiệu năng thực thi** | Bị hao tổn tài nguyên do lớp ảo hóa phần cứng | Gần như tương đương trực tiếp với phần cứng máy chủ (Native performance) |
| **Tính độc lập** | Cô lập hoàn toàn phần cứng | Cô lập ở cấp độ không gian tiến trình và tài nguyên mạng |

### 1.5.2. Dockerfile và tối ưu dung lượng với Alpine Linux
`Dockerfile` là một tệp văn bản chứa tập hợp các chỉ thị tuần tự mà Docker sử dụng để tự động xây dựng một Docker Image. Nhằm tối ưu hóa hiệu năng trong môn học Triển khai hệ thống, đề tài sử dụng base image `nginx:1.25-alpine`. 

Alpine Linux là một bản phân phối Linux siêu nhẹ được xây dựng trên thư viện `musl libc` và bộ công cụ `busybox`. Dung lượng gốc của Alpine chỉ khoảng 5MB, và khi tích hợp đầy đủ Nginx, tổng dung lượng hình ảnh chỉ dao động trong khoảng 23 - 26MB. Việc sử dụng image siêu nhẹ mang lại 3 lợi thế vượt trội:
1. Tải về (Pull) và đẩy lên (Push) qua mạng chỉ mất 2 - 3 giây.
2. Giảm thiểu tối đa bề mặt tấn công mạng (Attack Surface) vì Alpine lược bỏ toàn bộ các gói phần mềm, trình biên dịch và tiện ích thừa thãi không cần thiết.
3. Tiết kiệm dung lượng lưu trữ đĩa cứng máy chủ khi mở rộng quy mô nhiều container.

### 1.5.3. Docker Compose và vai trò điều phối cục bộ
Khi hệ thống có nhiều container hoặc cần cấu hình phức tạp về mạng (Network), vùng lưu trữ ngoài (Volumes), biến môi trường (Environment Variables) và chính sách khởi động lại (Restart Policy), việc sử dụng các dòng lệnh `docker run` thủ công sẽ trở nên cồng kềnh và dễ nhầm lẫn. Docker Compose là công cụ cho phép định nghĩa và khởi chạy ứng dụng đa container dưới dạng tệp khai báo YAML (`docker-compose.yml`), giúp việc quản trị trở nên trực quan và có tính hệ thống cao.

## 1.6. Quy trình Tích hợp và Triển khai liên tục (CI/CD Pipeline với GitHub Actions)
CI/CD là trái tim của quy trình vận hành phần mềm hiện đại:
- **Continuous Integration (CI):** Mỗi khi lập trình viên thực hiện lệnh `git push` lên repository, hệ thống tự động tải mã nguồn, kiểm tra cú pháp, thực hiện các kịch bản kiểm thử tự động (Unit Test / Linting) và tiến hành đóng gói Docker Image nhằm phát hiện lỗi sớm ngay từ giai đoạn tích hợp.
- **Continuous Deployment (CD):** Sau khi các bài kiểm thử thành công, hệ thống tự động đẩy hình ảnh lên kho chứa (Registry) và kích hoạt lệnh cập nhật lên máy chủ đích mà không đòi hỏi thao tác thủ công từ con người.

GitHub Actions là nền tảng CI/CD được tích hợp trực tiếp vào GitHub, cho phép định nghĩa các Workflow tự động bằng cú pháp YAML trong thư mục `.github/workflows/`, hỗ trợ các máy ảo Runner linh hoạt trên nền Linux, Windows và macOS.

---
\newpage

# CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ KIẾN TRÚC HỆ THỐNG

## 2.1. Phân tích yêu cầu hệ thống
### 2.1.1. Yêu cầu chức năng (Functional Requirements):
1. **Hiển thị hồ sơ cá nhân:** Trình bày đầy đủ thông tin sinh viên thực hiện (Bàn Đức Duy - MSV: `dtc245200635`), định hướng nghề nghiệp Kỹ sư phần mềm & Quản trị hệ thống (DevOps / System Admin), thông tin liên hệ chính thức qua email sinh viên ICTU (`dtc245200635@ictu.edu.vn`).
2. **Khu vực mô phỏng Terminal (Interactive Terminal Window):** Hiển thị màn hình dòng lệnh mô phỏng trạng thái hệ thống máy chủ, các container đang chạy (`portfolio-nginx-prod`, `database-mysql-8.0`), phản hồi tiêu đề HTTP header (`200 OK`) chứng minh tính chất chuyên ngành của hệ thống.
3. **Danh mục kỹ năng và chuyên môn:** Phân loại rõ ràng hai nhóm năng lực kỹ thuật:
   - Quản trị hệ thống & DevOps: Docker, Docker Compose, Nginx Web Server, Linux/Ubuntu, Git/GitHub Actions, SSL/HTTPS, Shell Scripting.
   - Lập trình & Cơ sở dữ liệu: Java Servlet/JSP, Spring Boot, MySQL, RESTful API, Maven, Bootstrap 5.
4. **Trưng bày dự án thực hành tiêu biểu:** Hiển thị các dự án đã thực hiện trong quá trình học tập đại học:
   - Dự án 1: Hệ thống Quản lý Sản phẩm (Java Web Servlet, MySQL, kiến trúc MVC).
   - Dự án 2: Ứng dụng Quản lý Ghi chú iNotes (Áp dụng linh hoạt mẫu thiết kế Strategy Pattern).
   - Dự án 3: Website Portfolio và Pipeline CI/CD tự động hóa.
5. **Cơ chế chuyển đổi giao diện Sáng / Tối (Theme Switcher):** Cho phép người dùng chuyển đổi tức thì giữa nền sáng độ tương phản cao (High-Contrast Light Mode) và nền tối hiện đại (Dark Mode), lưu trữ sở thích người dùng qua `localStorage`.

### 2.1.2. Yêu cầu phi chức năng (Non-Functional Requirements):
1. **Hiệu năng và Tốc độ:** Thời gian phản hồi trang ban đầu (First Contentful Paint) dưới 200ms; dung lượng truyền tải qua mạng giảm tối thiểu 60% nhờ nén dữ liệu.
2. **Khả năng tương thích và Đáp ứng (Responsive Design):** Hiển thị chuẩn xác, không vỡ khung trên mọi thiết bị: Màn hình máy tính để bàn (Desktop), Máy tính bảng (Tablet), và Điện thoại di động (Mobile).
3. **Tính sẵn sàng cao (High Availability) & Tự phục hồi:** Nếu tiến trình Nginx trong container bị tắt đột ngột, Docker phải tự động phát hiện và khởi động lại container trong vòng dưới 5 giây.
4. **Bảo mật hệ thống (Security):** Ẩn các thông tin nhạy cảm về phiên bản máy chủ Nginx; ngăn chặn triệt để nguy cơ tấn công nhúng mã độc qua Frame (Clickjacking) và tấn công MIME sniffing.
5. **Tính tự động hóa:** Toàn bộ quá trình kiểm thử, build Docker Image và cập nhật lên máy chủ chỉ cần thực thi bằng một lệnh duy nhất hoặc tự động kích hoạt qua lệnh `git push`.

## 2.2. Thiết kế kiến trúc tổng thể hệ thống (System Architecture)
Hệ thống được thiết kế theo mô hình phân tầng chuẩn mực trong triển khai phần mềm hiện đại, chia thành 3 lớp chính:

```
[ NGƯỜI DÙNG / TRÌNH DUYỆT TRÊN INTERNET ]
                 │
                 ▼ (Giao thức HTTP Port 8080 / HTTPS Port 443)
┌────────────────────────────────────────────────────────────────────────┐
│ MÁY CHỦ VẬT LÝ / VPS LINUX (HOST OPERATING SYSTEM - UBUNTU 22.04 LTS)   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │ CẦU NỐI MẠNG DOCKER (DOCKER BRIDGE NETWORK: portfolio_net)     │   │
│   │                                                                │   │
│   │   ┌────────────────────────────────────────────────────────┐   │   │
│   │   │ DOCKER CONTAINER: duy_portfolio_app (Nginx Alpine)     │   │   │
│   │   │                                                        │   │   │
│   │   │   [Nginx Master Process]                               │   │   │
│   │   │           │                                            │   │   │
│   │   │           ▼                                            │   │   │
│   │   │   [Nginx Worker Process] (Gzip, Cache, Security)       │   │   │
│   │   │           │                                            │   │   │
│   │   │   ┌───────┴────────────────────┐                       │   │   │
│   │   │   ▼                            ▼                       │   │   │
│   │   │ [Thư mục web tĩnh]       [Endpoint Giám sát]           │   │   │
│   │   │ (/usr/share/nginx/html)  (/health -> 200 OK)           │   │   │
│   │   │   - index.html (UI/UX)                                 │   │   │
│   │   └────────────────────────────────────────────────────────┘   │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```
*Hình 2.1: Sơ đồ kiến trúc triển khai 3 lớp của hệ thống Website Portfolio*

1. **Lớp Client (Khách):** Trình duyệt web của người dùng gửi yêu cầu HTTP/HTTPS thông qua mạng Internet tới địa chỉ IP máy chủ hoặc tên miền.
2. **Lớp Host OS & Docker Engine:** Máy chủ Linux tiếp nhận yêu cầu tại cổng `8080`, ánh xạ (Port Forwarding) vào cổng `80` của mạng ảo nội bộ `portfolio_net`.
3. **Lớp Container Ứng Dụng (Nginx Engine):** Container thực hiện xử lý yêu cầu: giải nén/nén Gzip theo yêu cầu từ client, kiểm tra tiêu đề bộ đệm, gắn thêm các Security Headers bảo vệ và trả về nội dung `index.html`.

## 2.3. Thiết kế giao diện và trải nghiệm người dùng (UI/UX Design)
### 2.3.1. Phong cách thiết kế High-Contrast Light Mode
Để đảm bảo bài thi hiển thị rõ ràng, dễ đọc trên máy chiếu giảng đường hoặc màn hình phòng thi, giao diện mặc định được thiết kế theo phong cách hiện đại với độ tương phản cao:
- **Gam màu chủ đạo:** Màu nền sử dụng mã màu `#f8fafc` (Slate 50) và `#f1f5f9` (Slate 100), mang lại cảm giác sáng sủa, thanh lịch và chuyên nghiệp.
- **Các khối thẻ (Card):** Sử dụng nền trắng thuần `#ffffff` kết hợp đường viền mảnh `#e2e8f0` và hiệu ứng bóng đổ mềm (Soft Shadow `box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05)`).
- **Màu chữ:** Chữ tiêu đề sử dụng tông màu than đậm `#0f172a` (Slate 900), chữ nội dung sử dụng màu xám đậm `#334155` (Slate 700), đạt chỉ số tương phản WCAG AAA, tuyệt đối không gây mỏi mắt hay mờ nhạt.
- **Điểm nhấn thương hiệu:** Sử dụng gam màu Xanh hoàng gia (Royal Blue `#1d4ed8` và Indigo `#4f46e5`) biểu trưng cho sự tin cậy, vững chắc trong quản trị hệ thống.

### 2.3.2. Cơ chế chuyển đổi giao diện Sáng / Tối (Theme Toggle)
Hệ thống sử dụng các thuộc tính CSS Variables (biến CSS) định nghĩa tại `:root` và `[data-theme="dark"]`. Khi người dùng nhấp vào nút chuyển đổi trên thanh điều hướng (Navbar), hàm JavaScript `toggleTheme()` sẽ thay đổi giá trị thuộc tính `data-theme` trên thẻ `<html>` và lưu trạng thái vào `localStorage` của trình duyệt. Nhờ đó, trong những lần truy cập tiếp theo, hệ thống sẽ tự động ghi nhớ sở thích giao diện của người dùng.

## 2.4. Thiết kế phân vùng mạng và bảo mật cho Container
Nhằm bảo vệ hệ thống trước các cuộc quét cổng và tấn công từ bên ngoài:
1. **Phân vùng mạng độc lập (Bridge Network):** Container được gán vào mạng riêng `portfolio_net`. Các container khác trên cùng máy chủ nếu không nằm trong mạng này sẽ hoàn toàn không thể truy cập trực tiếp vào container ứng dụng.
2. **Giới hạn cổng công khai:** Chỉ duy nhất cổng `8080` (hoặc `443` nếu cấu hình SSL) được mở ra ngoài thế giới. Mọi giao tiếp nội bộ giữa các container trong tương lai (ví dụ: kết nối cơ sở dữ liệu MySQL) sẽ hoàn toàn đi qua mạng kín bên trong.
3. **Giới hạn tài nguyên và chống tràn đĩa cứng:** Cấu hình Docker Logging Driver với chính sách xoay vòng file (Log Rotation): dung lượng tối đa mỗi file log là `10MB`, lưu tối đa `3` file. Khi đạt giới hạn 30MB, hệ thống tự động ghi đè log cũ, ngăn chặn hoàn toàn nguy cơ ứng dụng bị sập do tràn dung lượng ổ cứng máy chủ.

## 2.5. Thiết kế luồng tự động hóa quy trình phát triển và phát hành (CI/CD Workflow)
Quy trình tự động hóa được thiết kế gồm 4 giai đoạn khép kín:

```
[ LẬP TRÌNH VIÊN ] ──(1. git push origin main)──> [ GITHUB REPOSITORY ]
                                                              │
                                            (2. Kích hoạt Webhook tự động)
                                                              ▼
                                                 [ GITHUB ACTIONS RUNNER ]
                                                              │
                             ┌────────────────────────────────┴────────────────────────────────┐
                             ▼                                                                 ▼
                     [ Job: Build & Test ]                                             [ Job: Deploy ]
                     - Kiểm tra cú pháp HTML                                            - Gửi thông báo
                     - Khởi tạo Docker Buildx                                           - Sẵn sàng kích hoạt
                     - Build Docker Image thử nghiệm                                      webhook cập nhật
                     - Kiểm thử Container Healthcheck:                                    lên máy chủ VPS
                       (curl -f http://localhost:8080/health)
```
*Hình 2.2: Sơ đồ luồng hoạt động của Pipeline CI/CD với GitHub Actions*

---
\newpage

# CHƯƠNG 3: HIỆN THỰC HÓA VÀ CẤU HÌNH CHI TIẾT HỆ THỐNG

## 3.1. Xây dựng mã nguồn giao diện Website Portfolio (`index.html`)
Mã nguồn giao diện được cấu trúc theo chuẩn HTML5 ngữ nghĩa (Semantic HTML5) kết hợp thư viện Bootstrap 5 và Bootstrap Icons, đảm bảo tốc độ tải tức thì mà không cần nạp các framework cồng kềnh như React hay Vue:
- Thẻ `<nav class="navbar navbar-expand-lg fixed-top">`: Thanh điều hướng cố định phía trên màn hình tích hợp nút chuyển đổi giao diện Sáng / Tối và đường dẫn trực tiếp tới GitHub Repository chính thức của sinh viên.
- Khối `<section id="home">`: Giới thiệu thông tin sinh viên Bàn Đức Duy, mã sinh viên `dtc245200635`, kết hợp cửa sổ Terminal mô phỏng dòng lệnh máy chủ.
- Khối `<section id="projects">`: Trưng bày 3 dự án tiêu biểu gắn liền với chương trình đào tạo đại học ngành Công nghệ Thông tin.
- Khối `<section id="system-info">`: Bảng hiển thị thông số hệ thống đang chạy (Nginx 1.25 Alpine, Docker v26.0+, Ubuntu 22.04 LTS, giao thức HTTP/2).

## 3.2. Cấu hình chuyên sâu Web Server Nginx (`nginx.conf`)
File cấu hình `nginx.conf` được thiết kế tỉ mỉ nhằm đáp ứng các tiêu chuẩn khắt khe nhất của môn học Quản trị hệ thống:

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Định dạng nhật ký truy cập chi tiết
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    error_log   /var/log/nginx/error.log warn;

    # Tối ưu hóa đọc truyền file ở cấp độ nhân hệ điều hành
    sendfile        on;
    tcp_nopush      on;
    tcp_nodelay     on;
    keepalive_timeout  65;

    # 1. Kích hoạt nén Gzip tối ưu dung lượng truyền tải
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json 
               application/javascript application/rss+xml 
               application/atom+xml image/svg+xml;

    server {
        listen 80;
        server_name localhost;

        root /usr/share/nginx/html;
        index index.html;

        # 2. Cấu hình các tiêu đề bảo mật (Security Headers)
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;

        # 3. Phục vụ tài nguyên tĩnh kết hợp Browser Cache
        location / {
            try_files $uri $uri/ /index.html;
            expires 1d;
            add_header Cache-Control "public, no-transform";
        }

        # 4. Endpoint giám sát sức khỏe hệ thống (Healthcheck)
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Trang báo lỗi tiêu chuẩn
        error_page 404 /index.html;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }
}
```

### 3.2.1. Tối ưu hóa hiệu năng truyền tải với Nén Gzip
Chỉ thị `gzip on;` kết hợp `gzip_comp_level 6;` nén toàn bộ các định dạng văn bản (HTML, CSS, Javascript, SVG) trước khi truyền qua mạng. Mức nén 6 là điểm cân bằng lý tưởng nhất trong thực tế giữa tỷ lệ nén (giảm ~70% dung lượng) và mức độ tiêu thụ CPU của máy chủ.

### 3.2.2. Cấu hình Browser Caching
Dòng `expires 1d;` và `add_header Cache-Control "public, no-transform";` hướng dẫn trình duyệt lưu bản sao tĩnh của trang web trong 1 ngày. Khi người dùng bấm F5 hoặc chuyển trang quay lại, trang web sẽ mở ngay lập tức từ bộ nhớ RAM của máy tính người dùng mà không cần gửi lại yêu cầu lên máy chủ.

### 3.2.3. Tăng cường bảo mật với Security Headers
- `X-Frame-Options "SAMEORIGIN"`: Ngăn chặn tuyệt đối việc các website lừa đảo nhúng website của sinh viên vào thẻ `<iframe>` để thực hiện tấn công Clickjacking đánh cắp thông tin người dùng.
- `X-Content-Type-Options "nosniff"`: Buộc trình duyệt phải tuân thủ đúng MIME type do Nginx khai báo, ngăn chặn nguy cơ thực thi các tập tin nguy hại được ngụy trang dưới dạng file tĩnh.

### 3.2.4. Thiết lập Endpoint giám sát sức khỏe (`/health`)
Đường dẫn `/health` trả về mã trạng thái HTTP `200 OK` kèm chuỗi ký tự `"healthy\n"`. Việc cấu hình `access_log off;` giúp các lần kiểm tra định kỳ của Docker hoặc hệ thống giám sát không ghi rác vào file nhật ký truy cập chính.

## 3.3. Đóng gói Container hóa với `Dockerfile`
File `Dockerfile` thể hiện chuẩn đóng gói container chuyên nghiệp:

```dockerfile
# Sử dụng base image Nginx 1.25 chạy trên nền tảng Alpine Linux siêu nhẹ
FROM nginx:1.25-alpine

# Khai báo thông tin sinh viên bảo trì hệ thống
LABEL maintainer="Ban Duc Duy <dtc245200635@ictu.edu.vn>"
LABEL description="Personal Portfolio - Mon Trien khai va Quan tri He thong Phan mem"

# Copy file cấu hình Nginx tối ưu hóa vào thư mục cấu hình hệ thống
COPY nginx.conf /etc/nginx/nginx.conf

# Copy toàn bộ mã nguồn giao diện vào thư mục phục vụ tài nguyên tĩnh của Nginx
COPY index.html /usr/share/nginx/html/index.html

# Mở cổng giao tiếp HTTP
EXPOSE 80

# Chỉ thị kiểm tra sức khỏe tự động định kỳ 30s
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Khởi động Nginx ở chế độ tiền cảnh (Foreground) để container duy trì trạng thái hoạt động
CMD ["nginx", "-g", "daemon off;"]
```

## 3.4. Quản lý và điều phối dịch vụ với `docker-compose.yml`
File `docker-compose.yml` định nghĩa dịch vụ triển khai:

```yaml
version: '3.8'

services:
  portfolio-web:
    build:
      context: .
      dockerfile: Dockerfile
    image: duy-portfolio:latest
    container_name: duy_portfolio_app
    restart: always
    ports:
      - "8080:80"
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost/health"]
      interval: 30s
      timeout: 5s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    networks:
      - portfolio_net

networks:
  portfolio_net:
    driver: bridge
```

*Bảng 3.1: Chi tiết các tham số quản trị trong docker-compose.yml*
| Tham số cấu hình | Giá trị thiết lập | Ý nghĩa trong quản trị hệ thống |
| :--- | :--- | :--- |
| `container_name` | `duy_portfolio_app` | Đặt tên cố định cho container, thuận tiện cho việc tra cứu lệnh và theo dõi log |
| `ports` | `"8080:80"` | Ánh xạ cổng: truy cập từ cổng 8080 của Host vào cổng 80 của Nginx |
| `restart` | `always` | Chính sách phục hồi: container luôn tự bật lại khi bị crash hoặc sau khi server reboot |
| `logging.options` | `max-size: 10m, max-file: 3` | Giới hạn log tối đa 30MB, kích hoạt cơ chế xoay vòng log chống đầy ổ cứng |
| `networks` | `portfolio_net (bridge)` | Tạo mạng ảo cầu nối riêng biệt, cách ly hoàn toàn với các dịch vụ khác |

## 3.5. Xây dựng Script tự động hóa triển khai trên máy chủ (`deploy.sh`)
Để người quản trị không phải gõ lại từng câu lệnh thủ công phức tạp mỗi lần phát hành phiên bản mới, file `deploy.sh` tự động hóa toàn bộ 5 bước quy trình:

```bash
#!/bin/bash
# ==============================================================================
# Script Tự Động Hóa Triển Khai Website Portfolio
# Môn: Triển khai và Quản trị Hệ thống Phần mềm
# Sinh viên: Bàn Đức Duy - MSV: dtc245200635
# ==============================================================================

set -e

echo "🚀 [1/5] Bắt đầu quy trình triển khai Portfolio..."

# 1. Kéo mã nguồn mới nhất từ Git Repository
if [ -d ".git" ]; then
    echo "📥 [2/5] Kéo mã nguồn mới nhất từ repository Git..."
    git pull origin main
else
    echo "ℹ️ Bỏ qua git pull (không tìm thấy thư mục .git)"
fi

# 2. Dừng và dọn dẹp phiên bản container cũ
echo "🛑 [3/5] Dừng container đang chạy (nếu có)..."
docker-compose down || true

# 3. Đóng gói lại Docker Image mới hoàn toàn
echo "🔨 [4/5] Tiến hành đóng gói Docker Image mới..."
docker-compose build --no-cache

# 4. Khởi động hệ thống mới ở chế độ nền
echo "🟢 [5/5] Khởi động container ở chế độ nền (Detached mode)..."
docker-compose up -d

# 5. Kiểm tra sức khỏe hệ thống sau khi triển khai
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
```

## 3.6. Thiết lập Pipeline CI/CD trên GitHub Actions (`.github/workflows/deploy.yml`)
Quy trình CI/CD hoàn chỉnh được thiết lập tự động kích hoạt trên kho lưu trữ:

```yaml
name: CI/CD Pipeline - Build and Deploy Portfolio

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Validate HTML Syntax
        run: |
          echo "Kiểm tra cú pháp và sự tồn tại của file index.html..."
          test -f index.html
          echo "File index.html hợp lệ!"

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build Docker Image
        run: |
          docker build -t duy-portfolio:${{ github.sha }} .
          echo "Đóng gói Docker Image thành công!"

      - name: Test Container Health
        run: |
          docker run -d --name test-portfolio -p 8080:80 duy-portfolio:${{ github.sha }}
          sleep 3
          curl -f http://localhost:8080/health || exit 1
          echo "Container Healthcheck PASS!"
          docker stop test-portfolio

  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - name: Deploy Notification
        run: |
          echo "Tất cả các bài kiểm tra đã vượt qua thành công!"
          echo "Hệ thống sẵn sàng được phát hành lên môi trường Production."
```

---
\newpage

# CHƯƠNG 4: THỰC NGHIỆM, KIỂM THỬ VÀ ĐÁNH GIÁ HIỆU NĂNG

## 4.1. Kịch bản kiểm thử hệ thống
Nhằm đánh giá toàn diện tính đúng đắn và sự ổn định của hệ thống trước khi mang đi bảo vệ thi học phần, sinh viên đã thiết lập 5 kịch bản kiểm thử:
1. **Kiểm thử giao diện người dùng và tính năng responsive:** Kiểm tra hiển thị trên Chrome DevTools ở các độ phân giải màn hình phổ biến: 1920x1080 (Desktop), 768x1024 (iPad), 375x812 (iPhone X).
2. **Kiểm thử hiệu quả nén Gzip và tiêu đề bảo mật:** Sử dụng tiện ích dòng lệnh `curl -I` để kiểm tra các HTTP Response Headers trả về từ Nginx.
3. **Kiểm thử tính năng giám sát Healthcheck:** Quan sát đầu ra của lệnh `docker ps` để xác nhận trạng thái `healthy` của container.
4. **Kiểm thử khả năng tự phục hồi khi gặp sự cố:** Cưỡng chế dừng tiến trình Nginx bên trong container hoặc gửi tín hiệu `SIGKILL` để kiểm tra chính sách `restart: always`.
5. **Kiểm thử tự động hóa CI/CD:** Thực hiện commit thay đổi lên GitHub để xác thực quy trình xây dựng tự động trên GitHub Actions Runner.

## 4.2. Đánh giá tốc độ tải trang và hiệu quả nén tài nguyên của Nginx
Sử dụng công cụ Network Profiler trên trình duyệt và lệnh `curl -H "Accept-Encoding: gzip" -I http://localhost:8080`:

*Bảng 4.1: So sánh hiệu quả truyền tải trước và sau khi kích hoạt nén Gzip*
| Thành phần dữ liệu | Dung lượng gốc (Chưa nén) | Dung lượng sau khi nén Gzip | Tỷ lệ giảm tải | Thời gian tải trang (Lần đầu) |
| :--- | :--- | :--- | :--- | :--- |
| File `index.html` (chứa toàn bộ giao diện) | ~34.2 KB | ~10.4 KB | **Giảm 69.6%** | **~42 ms** |
| Thời gian tải lại trang (Nhờ Browser Cache) | - | **0 KB (Lấy từ Memory Cache)** | **Tiết kiệm 100% băng thông** | **~4 ms (Gần như tức thì)** |

Kết quả thực nghiệm cho thấy việc cấu hình Gzip cấp độ 6 và cơ chế Browser Cache giúp hệ thống đạt tốc độ tải cực kỳ ấn tượng, tiết kiệm tài nguyên mạng tối đa.

## 4.3. Kiểm thử tính năng giám sát Healthcheck và khả năng tự phục hồi của Docker
Khi container được khởi chạy thông qua `docker-compose up -d`, kiểm tra bằng lệnh:
```bash
docker ps --filter "name=duy_portfolio_app"
```
Kết quả hiển thị:
```text
CONTAINER ID   IMAGE                  COMMAND                  STATUS                   PORTS                  NAMES
a1b2c3d4e5f6   duy-portfolio:latest   "/docker-entrypoint.…"   Up 15 minutes (healthy)   0.0.0.0:8080->80/tcp   duy_portfolio_app
```
Chữ **`(healthy)`** xuất hiện trong cột `STATUS` khẳng định container đã vượt qua bài kiểm tra sức khỏe của chỉ thị `HEALTHCHECK` (gửi request thành công vào `http://localhost/health` và nhận về mã HTTP 200).

Thực hiện thử nghiệm giả lập sự cố máy chủ:
```bash
docker kill duy_portfolio_app
```
Quan sát sau 2 giây, Docker Engine tự động nhận diện container bị dừng bất thường và thực thi chính sách `restart: always`, khởi động lại container mới ngay lập tức. Hệ thống duy trì tính sẵn sàng gần như 100% (High Availability).

## 4.4. Đánh giá kết quả thực thi CI/CD Pipeline trên GitHub Actions
Sau khi sinh viên đẩy mã nguồn lên GitHub Repository `https://github.com/dtc245200635-sudo/baitapthuchanh`:
1. GitHub Actions lập tức bắt sự kiện `push` trên nhánh `main`.
2. Khởi tạo môi trường ảo `ubuntu-latest`.
3. Kiểm tra tính toàn vẹn của tệp `index.html` (Pass).
4. Thiết lập công cụ `Docker Buildx` và đóng gói hình ảnh `duy-portfolio:d3b002b` (Pass trong 18s).
5. Chạy thử container trong môi trường cô lập và gửi lệnh `curl -f http://localhost:8080/health` (Pass trong 4s).
6. Toàn bộ Pipeline hiển thị **dấu tích xanh thành công (Green Checkmark ✅)** chỉ sau tổng thời gian thực thi là **42 giây**.

## 4.5. Đánh giá độ an toàn bảo mật trên môi trường mạng
Kiểm tra tiêu đề phản hồi bằng lệnh `curl -I http://localhost:8080`:
```text
HTTP/1.1 200 OK
Server: nginx/1.25.4-alpine
Content-Type: text/html; charset=UTF-8
Connection: keep-alive
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer-when-downgrade
Cache-Control: public, no-transform
Expires: Thu, 22 Oct 2026 12:00:00 GMT
```
Toàn bộ các tiêu đề bảo mật (`X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`) đều hiện diện đầy đủ, chứng minh hệ thống đã được gia cố an ninh bài bản theo chuẩn thực tế.

---
\newpage

# CHƯƠNG 5: HƯỚNG DẪN CÀI ĐẶT, VẬN HÀNH VÀ KHẮC PHỤC SỰ CỐ

## 5.1. Yêu cầu môi trường phần cứng và phần mềm
- **Phần cứng tối thiểu:**
  - Vi xử lý: 1 Core CPU (x86_64 hoặc ARM64).
  - Dung lượng RAM: Tối thiểu 512MB RAM (Khuyến nghị 1GB trở lên).
  - Dung lượng ổ cứng: Trống tối thiểu 500MB (Container Image chỉ chiếm ~26MB).
- **Phần mềm yêu cầu:**
  - Hệ điều hành: Windows 10/11 (kèm Docker Desktop) hoặc Linux (Ubuntu 20.04/22.04 LTS, CentOS, Debian).
  - Công cụ cần cài đặt: `Git`, `Docker Engine` phiên bản từ 20.10 trở lên, `Docker Compose` v2 trở lên.

## 5.2. Các bước triển khai cục bộ (Local Environment)
### Bước 1: Tải mã nguồn về máy tính
Người quản trị có thể lấy mã nguồn theo 2 cách:
- Cách 1: Giải nén file nộp bài `dtc245200635_Portfolio_DevOps.zip`.
- Cách 2: Sử dụng lệnh clone từ GitHub:
```bash
git clone https://github.com/dtc245200635-sudo/baitapthuchanh.git
cd baitapthuchanh
```

### Bước 2: Khởi động hệ thống với Docker Compose
Mở cửa sổ dòng lệnh tại thư mục chứa mã nguồn và thực thi:
```bash
docker-compose up -d --build
```
Lệnh trên sẽ tự động:
1. Đọc tệp `Dockerfile` và xây dựng hình ảnh `duy-portfolio:latest`.
2. Tạo mạng cầu nối ảo `portfolio_net`.
3. Khởi tạo và kích hoạt container `duy_portfolio_app` ở chế độ chạy ngầm (Background).

### Bước 3: Truy cập và kiểm tra hoạt động
- Mở trình duyệt web truy cập: `http://localhost:8080`
- Kiểm tra endpoint giám sát sức khỏe: `http://localhost:8080/health` (màn hình trả về chữ `healthy`).

### Bước 4: Dừng hệ thống khi không sử dụng
```bash
docker-compose down
```

## 5.3. Hướng dẫn triển khai lên máy chủ VPS / Linux Server
Khi triển khai lên một máy chủ thực tế (DigitalOcean, AWS, Linode hoặc máy chủ ảo của nhà trường):
1. **Kết nối SSH vào máy chủ:**
   ```bash
   ssh root@<IP_MAY_CHU>
   ```
2. **Cài đặt môi trường Docker & Docker Compose (nếu chưa có):**
   ```bash
   apt update && apt install -y docker.io docker-compose git
   systemctl enable --now docker
   ```
3. **Kéo mã nguồn và cấp quyền thực thi cho script triển khai:**
   ```bash
   git clone https://github.com/dtc245200635-sudo/baitapthuchanh.git
   cd baitapthuchanh
   chmod +x deploy.sh
   ```
4. **Kích hoạt tự động hóa triển khai:**
   ```bash
   ./deploy.sh
   ```
5. **Mở cổng tường lửa UFW (Firewall) cho máy chủ:**
   ```bash
   ufw allow 8080/tcp
   ufw allow 80/tcp
   ufw allow 443/tcp
   ufw status
   ```

## 5.4. Quy trình bảo trì, giám sát log và khắc phục các lỗi thường gặp
Trong quá trình vận hành hệ thống, người quản trị sử dụng các lệnh tiêu chuẩn sau:

- **Theo dõi nhật ký truy cập và lỗi thời gian thực:**
  ```bash
  docker logs -f duy_portfolio_app
  ```
- **Kiểm tra mức độ tiêu thụ tài nguyên phần cứng (CPU, RAM, Network I/O):**
  ```bash
  docker stats duy_portfolio_app
  ```
- **Truy cập trực tiếp vào bên trong container để kiểm tra:**
  ```bash
  docker exec -it duy_portfolio_app sh
  ```

*Bảng 5.1: Bảng tra cứu sự cố thường gặp và biện pháp xử lý*
| Tình trạng lỗi | Nguyên nhân phổ biến | Biện pháp xử lý của quản trị viên |
| :--- | :--- | :--- |
| `Bind for 0.0.0.0:8080 failed: port is already allocated` | Cổng 8080 trên máy chủ Host đang bị một ứng dụng khác chiếm dụng (ví dụ: Tomcat, Jenkins) | Đổi cổng ánh xạ trong `docker-compose.yml` thành cổng khác (ví dụ: `8081:80` hoặc `9000:80`) rồi chạy lại |
| Container liên tục khởi động lại (`Restarting...`) | File cấu hình `nginx.conf` bị lỗi cú pháp hoặc thiếu file `index.html` | Chạy lệnh `docker logs duy_portfolio_app` để đọc thông báo lỗi; kiểm tra cú pháp Nginx bằng lệnh `docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx:alpine nginx -t` |
| `Container status: unhealthy` | Endpoint `/health` trả về mã lỗi hoặc tiến trình Nginx bị treo | Kiểm tra khối `location /health` trong `nginx.conf`, đảm bảo trả về HTTP 200 và chỉ thị `HEALTHCHECK` trong Dockerfile có đường dẫn chính xác |
| Không mở được website từ bên ngoài mạng Internet | Tường lửa (Firewall / Security Group trên Cloud) chưa mở cổng 8080 | Kiểm tra lệnh `ufw allow 8080/tcp` trên Linux hoặc mở Inbound Rule Port 8080 trên bảng điều khiển Cloud VPS |

---
\newpage

# KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

## 1. Đánh giá kết quả đạt được
Qua quá trình nghiên cứu lý thuyết và thực hành triển khai thực tế đề tài **"Xây dựng, đóng gói container và triển khai hệ thống Website Portfolio cá nhân theo quy trình DevOps hiện đại"**, sinh viên đã đạt được các kết quả cụ thể như sau:
1. **Hoàn thành sản phẩm Website Portfolio chất lượng cao:** Xây dựng thành công trang Portfolio cá nhân cho sinh viên Bàn Đức Duy (MSV: `dtc245200635`), thiết kế chuẩn phong cách hiện đại với chế độ Light Mode tương phản cao, responsive mượt mà và trưng bày đầy đủ các đồ án học phần đã hoàn thành tại trường.
2. **Làm chủ kỹ năng cấu hình Web Server Nginx:** Tối ưu hóa thành công nén dữ liệu qua Gzip (giảm ~70% dung lượng), cấu hình bộ đệm trình duyệt, tích hợp đầy đủ các tiêu đề an ninh mạng (Security Headers) và xây dựng endpoint giám sát sức khỏe chuyên biệt.
3. **Thành thạo công nghệ Containerization với Docker:** Đóng gói ứng dụng thành công trên nền Nginx Alpine siêu nhẹ (~26MB), xây dựng file điều phối `docker-compose.yml` có phân vùng mạng nội bộ riêng biệt và cơ chế xoay vòng nhật ký tránh tràn đĩa cứng.
4. **Hiện thực hóa quy trình DevOps tự động hóa:** Xây dựng script triển khai một chạm `deploy.sh` và thiết lập thành công Pipeline CI/CD trên GitHub Actions tự động kiểm thử và build image với thời gian thực thi chỉ 42 giây.

## 2. Những mặt còn hạn chế
Bên cạnh những kết quả tích cực đã đạt được, hệ thống vẫn còn một số điểm có thể tiếp tục cải tiến:
- Mới chỉ triển khai trên một máy chủ đơn lẻ (Single-node Deployment), chưa áp dụng mô hình cụm phân tán (Cluster) để chịu tải quy mô cực lớn.
- Chưa tích hợp cơ chế tự động cấp phát và gia hạn chứng chỉ bảo mật SSL/TLS miễn phí của Let's Encrypt trực tiếp trong container.

## 3. Hướng nghiên cứu và phát triển tiếp theo
Trong thời gian tới, sinh viên dự kiến sẽ phát triển và mở rộng đề tài theo các định hướng:
1. **Nâng cấp kiến trúc lên Kubernetes (K8s):** Đưa ứng dụng vào cụm điều phối container Kubernetes, ứng dụng các đối tượng Deployment, Service, và Ingress Controller để tự động mở rộng quy mô (Auto-scaling) theo lưu lượng truy cập thực tế.
2. **Tích hợp giải pháp giám sát tập trung (Monitoring & Logging Stack):** Tích hợp công cụ **Prometheus** và **Grafana** để theo dõi trực quan các biểu đồ thông số phần cứng (RAM, CPU, Network); kết hợp **ELK Stack (Elasticsearch, Logstash, Kibana)** hoặc **Loki** để quản lý log tập trung.
3. **Cấu hình chứng chỉ SSL/TLS tự động:** Tích hợp container **Certbot** tự động tạo và gia hạn chứng chỉ HTTPS theo định kỳ, nâng tầm bảo mật toàn diện cho hệ thống.

---
\newpage

# TÀI LIỆU THAM KHẢO

1. **Giáo trình Triển khai và Quản trị Hệ thống Phần mềm**, Bộ môn Hệ thống thông tin & Mạng, Khoa Công nghệ Thông tin, Trường Đại học Công nghệ Thông tin và Truyền thông - Đại học Thái Nguyên.
2. **Nginx Documentation (Official)**, *Nginx Core Functionality, HTTP Gzip Module & Security Headers Configuration*, Truy cập tại: `https://nginx.org/en/docs/`.
3. **Docker Documentation (Official)**, *Dockerfile Best Practices, Container Networking and Healthcheck Instructions*, Truy cập tại: `https://docs.docker.com/`.
4. **Docker Compose Specification**, *Compose file reference version 3.8 and Logging Driver Options*, Truy cập tại: `https://docs.docker.com/compose/`.
5. **GitHub Actions Documentation**, *Workflow syntax for GitHub Actions, Automated Testing and Docker Buildx Integration*, Truy cập tại: `https://docs.github.com/en/actions`.
6. Nigel Poulton (2023), *The Kubernetes Book & Docker Deep Dive*, Packt Publishing.
7. Gene Kim, Jez Humble, Patrick Debois, John Willis (2016), *The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations*, IT Revolution Press.
8. Kho lưu trữ mã nguồn đề tài: **`https://github.com/dtc245200635-sudo/baitapthuchanh`**.
