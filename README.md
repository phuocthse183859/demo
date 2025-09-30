# EV Station-based Rental System

Hệ thống thuê xe điện tại điểm thuê - Phần mềm quản lý thuê xe điện thông minh với 3 vai trò chính: Người thuê xe (EV Renter), Nhân viên trạm (Station Staff), và Quản trị viên (Admin).

## 🚗 Tính năng chính
| Mã | Danh mục | Quy tắc |
|---|---|---|
| BR-01 | Đăng ký & Xác thực | Người thuê phải đủ tuổi hợp pháp (theo luật Việt Nam – thường ≥18 tuổi) |
| BR-02 | Đăng ký & Xác thực | Người thuê phải sở hữu giấy phép lái xe hợp lệ (còn hạn, đúng loại xe) |
| BR-03 | Đăng ký & Xác thực | CMND/CCCD và giấy phép lái xe phải trùng khớp thông tin cá nhân |
| BR-04 | Đăng ký & Xác thực | Mỗi số điện thoại/email chỉ được đăng ký một tài khoản thuê xe |
| BR-05 | Đăng ký & Xác thực | Tài khoản chỉ được kích hoạt sau khi xác thực giấy tờ thành công (qua nhân viên hoặc hệ thống) |
| BR-06 | Đặt xe | Chỉ tài khoản đã xác thực mới được phép đặt xe |
| BR-07 | Đặt xe | Người thuê chỉ được đặt tối đa X lượt/ngày (giới hạn nhằm tránh spam hoặc gian lận, X do admin quy định) |
| BR-08 | Đặt xe | Đặt xe chỉ thành công nếu tại thời điểm chọn còn xe phù hợp (loại xe, pin, thời gian) |
| BR-09 | Đặt xe | Nếu đặt trước, người thuê phải đến điểm thuê trong khoảng thời gian giữ chỗ (ví dụ 15 phút sau giờ đặt) |
| BR-10 | Đặt xe | Đặt xe trực tiếp tại điểm chỉ áp dụng cho các xe còn trống chưa được đặt trước |
| BR-11 | Nhận xe | Người thuê phải xuất trình giấy tờ gốc và/hoặc xác thực bằng app tại quầy để nhận xe |
| BR-12 | Nhận xe | Không giao xe nếu giấy tờ không hợp lệ hoặc có dấu hiệu giả mạo |
| BR-13 | Nhận xe | Trước khi giao xe, nhân viên và người thuê phải cùng kiểm tra, chụp ảnh tình trạng xe (ngoại thất, nội thất, đồng hồ km, mức pin) |
| BR-14 | Nhận xe | Hợp đồng thuê xe phải được ký bởi cả hai bên (điện tử hoặc giấy tờ) |
| BR-15 | Nhận xe | Không được phép nhận xe thay cho người khác (trừ khi có giấy ủy quyền hợp pháp) |
| BR-16 | Trả xe | Xe chỉ được trả tại đúng điểm thuê đã đăng ký, trừ các trường hợp đặc biệt được hệ thống/phí cho phép |
| BR-17 | Trả xe | Nhân viên phải kiểm tra, chụp ảnh tình trạng xe khi trả (so sánh với lúc nhận) |
| BR-18 | Trả xe | Phát sinh phí bổ sung nếu có hư hỏng, thiếu phụ kiện, xe bẩn, hoặc vượt quá km/thời gian cho phép |
| BR-19 | Trả xe | Người thuê chỉ được hoàn cọc (nếu có) sau khi hoàn tất kiểm tra và thanh toán phí phát sinh |
| BR-20 | Trả xe | Nếu xảy ra tranh chấp về tình trạng xe, phải lưu lại ảnh/video và lập biên bản xác nhận |
### 👤 Cho Người thuê xe (EV Renter)
- **Đăng ký & xác thực**: Tạo tài khoản, upload giấy phép lái xe, CMND/CCCD
- **Đặt xe**: Tìm điểm thuê trên bản đồ, xem danh sách xe có sẵn, đặt xe trước hoặc đến trực tiếp
- **Nhận xe**: Check-in tại quầy/ứng dụng, ký hợp đồng điện tử, xác nhận bàn giao cùng nhân viên
- **Trả xe**: Trả xe đúng điểm thuê, nhân viên kiểm tra tình trạng, thanh toán chi phí phát sinh
- **Lịch sử & phân tích**: Xem các chuyến thuê trước đây, thống kê thời điểm thuê

### 👨‍💼 Cho Nhân viên trạm (Station Staff)
- **Quản lý giao – nhận xe**: Xem danh sách xe, thực hiện thủ tục giao nhận, xác nhận chữ ký điện tử
- **Xác thực khách hàng**: Kiểm tra giấy phép lái xe và CMND, đối chiếu với hồ sơ
- **Thanh toán tại điểm**: Ghi nhận thanh toán phí thuê, xử lý tiền cọc và hoàn cọc
- **Quản lý xe tại điểm**: Cập nhật tình trạng pin và kỹ thuật xe, báo cáo sự cố

### 👑 Cho Quản trị viên (Admin)
- **Quản lý đội xe & điểm thuê**: Theo dõi số lượng xe tại mỗi trạm, lịch sử giao nhận
- **Quản lý khách hàng**: Quản lý hồ sơ khách hàng, lịch sử thuê, xử lý khiếu nại
- **Quản lý nhân viên**: Xem danh sách nhân viên, theo dõi hiệu suất làm việc
- **Báo cáo & phân tích**: Báo cáo doanh thu theo trạm, phân tích tỷ lệ sử dụng xe, dự báo nhu cầu

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS với responsive design
- **Icons**: Font Awesome 6.0
- **Storage**: LocalStorage (demo purposes)
- **Architecture**: Single Page Application (SPA) approach

## 📁 Cấu trúc dự án

```
EV-Rental-System/
├── index.html              # Trang chủ
├── renter-dashboard.html   # Dashboard người thuê xe
├── staff-dashboard.html    # Dashboard nhân viên trạm
├── admin-dashboard.html    # Dashboard quản trị viên
├── renter-booking.html     # Trang đặt xe
├── css/
│   ├── style.css          # CSS chính
│   └── dashboard.css      # CSS cho dashboard
├── js/
│   ├── script.js          # JavaScript chính
│   ├── dashboard.js       # JavaScript cho dashboard
│   └── booking.js         # JavaScript cho đặt xe
└── README.md              # Tài liệu dự án
```

## 🚀 Cách sử dụng

### 1. Mở ứng dụng
- Mở file `index.html` trong trình duyệt web
- Hoặc sử dụng live server để chạy local server

### 2. Đăng ký tài khoản
- Click "Đăng ký" trên trang chủ
- Chọn loại tài khoản: Người thuê xe, Nhân viên trạm, hoặc Quản trị viên
- Điền đầy đủ thông tin và đồng ý điều khoản

### 3. Đăng nhập
- Click "Đăng nhập" trên trang chủ
- Nhập email, mật khẩu và chọn loại tài khoản
- Hệ thống sẽ chuyển hướng đến dashboard tương ứng

### 4. Sử dụng các tính năng
- **Người thuê xe**: Đặt xe, xem lịch sử, quản lý hồ sơ
- **Nhân viên trạm**: Quản lý giao nhận xe, xử lý thanh toán
- **Quản trị viên**: Quản lý hệ thống, xem báo cáo, phân tích dữ liệu

## 🎨 Giao diện

- **Responsive Design**: Tương thích với mọi thiết bị (desktop, tablet, mobile)
- **Modern UI**: Giao diện hiện đại với gradient colors và animations
- **User-friendly**: Dễ sử dụng với navigation rõ ràng và intuitive
- **Vietnamese Language**: Hoàn toàn bằng tiếng Việt

## 🔧 Tính năng kỹ thuật

- **Authentication System**: Hệ thống đăng nhập/đăng ký với localStorage
- **Form Validation**: Validation real-time cho tất cả form
- **Modal System**: Hệ thống modal cho các popup và dialog
- **Notification System**: Thông báo real-time cho user actions
- **Data Management**: Quản lý dữ liệu với mock data và localStorage
- **Error Handling**: Xử lý lỗi và validation một cách graceful

## 📱 Responsive Design

- **Mobile First**: Thiết kế ưu tiên mobile
- **Breakpoints**: 
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Touch Friendly**: Tối ưu cho touch interface

## 🔮 Tính năng tương lai

- **Real-time Updates**: WebSocket cho cập nhật real-time
- **GPS Integration**: Tích hợp GPS cho tracking xe
- **Payment Gateway**: Tích hợp thanh toán online
- **Mobile App**: Ứng dụng mobile native
- **AI Analytics**: Phân tích dữ liệu với AI
- **IoT Integration**: Tích hợp với hệ thống IoT của xe

## 🤝 Đóng góp

Dự án này được phát triển như một demo system cho môn học. Nếu bạn muốn đóng góp:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

Dự án này được phát triển cho mục đích học tập và demo.

## 👥 Tác giả

- **Developer**: EV Rental System Team
- **Purpose**: Educational Demo Project
- **Version**: 1.0.0

---

**Lưu ý**: Đây là phiên bản demo với dữ liệu mock. Trong production, cần tích hợp với backend API và database thực tế.
