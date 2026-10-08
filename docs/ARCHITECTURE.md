# Kiến trúc nền

## Phần chạy trong GE-M0-01

`apps/web` là React/Vite SPA: pages bố trí màn hình, components hiển thị, lib chứa fetch và tiện ích. Tailwind v4 dùng Vite plugin; Button từ shadcn/ui Radix new-york được điều chỉnh token GoEase. Không cần dịch vụ ngoài để chạy màn kết nối.

`apps/api` là NestJS ESM trên Node 24. Một backend REST, prefix `/api`; health controller theo chức năng. ConfigModule đọc .env của app và validate lúc khởi động. Filter chung trả `{ error: { code, message, statusCode }, path, timestamp }`; lỗi nội bộ không lộ stack/query. CORS chỉ trả header cho origin cấu hình, không dùng credentials.

`packages/contracts` xuất type và runtime guard health dùng thật ở cả API/web. Phản hồi `GET /api/health`:

```json
{"status":"ok","service":"goease-api","scope":"api-only","timestamp":"2026-10-08T08:00:00.000Z"}
```

Timestamp là thời điểm ISO UTC. Endpoint chỉ chứng minh tiến trình API trả lời; chưa phải readiness của DB/AI/Maps. Web có timeout 8 giây, hủy request khi unmount, không tự gọi lại vô hạn; nút thử lại gửi request mới và bỏ success cũ khi thất bại. Timestamp hiển thị theo Asia/Ho_Chi_Minh.

API local lắng nghe `127.0.0.1`. Cấu hình bind/public hosting, HTTPS và rollback được quyết định ở issue staging; localhost không được gọi là staging.

## Phần sẽ nối theo issue riêng

- PostgreSQL + Prisma thuộc API, không truy cập DB trực tiếp từ web. Thiết kế User/Trip/TripDay/Activity/Place, ownership, ngày nghiệp vụ và tiền VND được review trước migration. Chưa có schema nghiệp vụ trong bootstrap.
- Google OAuth: backend xác minh danh tính, quyền chuyến theo chủ sở hữu; không tin userId do frontend gửi.
- Gemini adapter phía backend: validate đầu vào/đầu ra, timeout và giới hạn retry; key không ra web. Model ID chọn theo tài liệu và quyền tài khoản tại lúc thực hiện.
- Bản đồ hiển thị bằng Google Maps JavaScript API; Places (New)/Routes có trách nhiệm riêng. Phân biệt key browser có giới hạn với key server, giữ attribution và kiểm tra điều kiện dùng ở issue thử nghiệm.
- Booking qua đối tác: phân biệt sandbox, chuyển sang đối tác, gửi yêu cầu và booking đã xác nhận; không giả định đã có hợp đồng/API live.

Kiến trúc giữ một backend chia chức năng, chưa thiết kế toàn bộ bảng hoặc hạ tầng cho các mốc tương lai.
