# Phạm vi sản phẩm

GoEase giúp lập và chỉnh lịch trình du lịch trong Việt Nam, xem bản đồ ngay trong web, theo dõi ngân sách **cả nhóm**, tìm trải nghiệm địa phương, kết nối khách sạn/vé máy bay qua đối tác và có quản trị tối thiểu.

MVP dự kiến mở thử **một điểm đến**, chuyến **1–5 ngày**. Điểm đến thật chưa chốt. Địa điểm trong dữ liệu thử sau này chỉ là ví dụ, không phải quyết định kinh doanh. Khách sạn/vé máy bay vẫn thuộc MVP; việc chưa đặt được dịch vụ ở M0 không loại chúng khỏi baseline.

## M0 — Dựng nền và kiểm chứng tích hợp

Đích nghiệm thu: web/API/DB hoạt động; đăng nhập và quyền sở hữu dữ liệu; tạo, lưu và mở lại chuyến mẫu; kết quả thử AI/bản đồ; staging được kiểm tra; phương án booking qua đối tác nêu rõ quyền thực có và phần còn thiếu.

GE-M0-01 chỉ dựng web/API, health thật, test, CI và tài liệu. Các đầu ra còn lại theo issue trên [Project](https://github.com/users/NhanDuong21/projects/10), không nằm trong bootstrap này.

Nghiên cứu đối tác có thể kết luận chưa có quyền API/hợp đồng. Kết luận đó là đầu ra nghiên cứu, không xác nhận booking live đã sẵn sàng. Thiếu key/quyền cho kiểm chứng AI/Maps/deploy phải được ghi rõ, không thay bằng ảnh, login giả hoặc mock để nghiệm thu live.

## M1 và các mốc sau

Engine lịch trình AI hoàn chỉnh, tối ưu tuyến và các module booking đầy đủ được phân bổ sau nền M0. Mốc cụ thể và cam kết bàn giao cần nhóm xác nhận. Luồng nhận booking/thu tiền/phát hành vé chỉ triển khai khi đã xác minh quyền và vận hành đối tác.

M0 chưa hoàn thành chỉ vì PR bootstrap có CI xanh. Nghiệm thu M0 cần các đầu ra bắt buộc ở milestone, đặc biệt lưu bền, quyền sở hữu, browser và staging.
