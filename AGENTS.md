# Hướng dẫn làm việc với GoEase

Đọc README để chạy dự án, docs/MVP_SCOPE.md để xác định phạm vi và docs/WORKFLOW.md để nhận issue, tạo branch, cập nhật board và bàn giao PR. GitHub Project là nguồn trạng thái công việc; không tạo backlog sao chép trong repo. Thực hiện quy trình trong WORKFLOW, không tự approve, merge hoặc đóng issue thay nhóm.

## Stack và phạm vi

- React + Vite + TypeScript; không thay bằng Next.js. Tailwind + shadcn/ui.
- Một NestJS REST backend theo chức năng. PostgreSQL + Prisma sẽ được thêm sau khi thiết kế dữ liệu được review.
- pnpm workspace; dùng phiên bản trong package.json và .node-version, commit pnpm-lock.yaml. Chỉ thêm dependency có nhu cầu thực.
- Gemini qua backend; Google Maps JavaScript, Places (New), Routes theo các issue riêng. Giữ khách sạn/vé máy bay qua đối tác trong baseline MVP.
- Không triển khai issue phụ thuộc chưa merge, không mở rộng sang mobile, microservices, Kubernetes, Redis/queue, training AI hoặc hệ thống nhiều agent trong M0.

## Sửa và kiểm tra

Giữ thay đổi đang có của người khác. Trước khi sửa, đọc code và acceptance criteria; không reset/clean/force-push. Khi đổi contract, cập nhật cả producer và consumer.

Trước bàn giao chạy từ root: `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`. Test phải xác minh hành vi; không skip/passWithNoTests. Với UI hoặc kết nối, thử browser thật, đọc console/network và phân biệt test doubles với live. Giữ tên check CI `Quality Gate`; tất cả bước bắt buộc phải thành công.

## Cấu hình và secrets

Không commit .env thật, token, cookies, dữ liệu cá nhân, cấu hình máy/skills cá nhân. Chỉ ghi tên biến và tình trạng có/chưa xác minh; không in giá trị secret. Mọi biến VITE_* đi vào bundle công khai, chỉ dùng cho cấu hình công khai. Không tự bật billing, ký hợp đồng, gửi thông tin/đặt booking hoặc tạo dịch vụ trả phí.

Thiếu quyền/key thì mô tả tác động ở issue, không dùng phản hồi giả để báo tích hợp live thành công. Phân biệt mock, sandbox và live trong kiểm chứng.
