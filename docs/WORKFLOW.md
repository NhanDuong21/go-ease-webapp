# Quy trình GitHub

[Project GoEase — Phát triển MVP](https://github.com/users/NhanDuong21/projects/10) là nơi theo dõi trạng thái. [Sprint 0](https://github.com/users/NhanDuong21/projects/10/views/2) lọc đúng repo + milestone M0 + iteration. [Milestone M0](https://github.com/NhanDuong21/go-ease-webapp/milestone/1) chưa có due date.

Sprint 0 cấu hình ban đầu 7 ngày, **08–14/10/2026**, theo Asia/Ho_Chi_Minh. Đây là khung theo dõi tạm, không cam kết hoàn thành toàn bộ M0 trong một tuần. Không kéo dài/ghi đè lịch đã được nhóm chốt.

## Trạng thái và ưu tiên

| Status | Khi dùng |
| --- | --- |
| Chưa lên lịch | Còn phụ thuộc hoặc thiếu điều kiện bắt đầu |
| Sẵn sàng làm | Đủ điều kiện và có thể nhận |
| Đang làm | Đã nhận issue và đang thực hiện |
| Chờ kiểm tra | PR sẵn sàng review, kiểm tra bắt buộc đã đạt |
| Hoàn tất | Đầu ra nghiệm thu và issue đóng do hoàn thành |

Priority: P0 — Cần làm trước; P1 — Cần cho M0; P2 — Chưa ưu tiên. Issue thiếu key/quyền/tài khoản có label **đang bị chặn** và mô tả điều kiện còn thiếu. Label không thay thế Status.

Issue mới tự vào Project/Chưa lên lịch. UI automation đóng issue không phân biệt completed/not planned, nên workflow đó tắt; cập nhật Hoàn tất thủ công sau nghiệm thu. Mở/link/merge PR không tự đánh dấu Hoàn tất, không bật auto-archive.

## Nhận việc đến merge

1. Kiểm tra issue thật không trùng, acceptance criteria, assignee, milestone, Sprint, Priority. Mọi issue M0 trong lần setup này assign **NhanDuong21**; không tự chia sang người khác.
2. Chuyển Đang làm, comment phạm vi và cách kiểm tra. Sau đó kiểm tra working tree/origin, fetch main và tạo branch từ origin/main sạch. Bootstrap dùng `chore/issue-<số GitHub thật>-project-bootstrap`; việc sau dùng tên mô tả gắn số issue.
3. Triển khai trong phạm vi issue, kiểm tra theo AGENTS.md. Đọc lỗi CI thật và sửa trước bàn giao.
4. PR vào main, tiêu đề/mô tả tiếng Việt, `Closes #<số thật>`, kết quả kiểm tra, ảnh không chứa thông tin nhạy cảm và rủi ro. Nếu còn lỗi/blocker để draft và không báo pass khi CI pending.
5. Chuyển Chờ kiểm tra khi đủ điều kiện. Cần **1 approving review của collaborator có quyền phù hợp**, resolve trao đổi và required check **Quality Gate**. Tác giả PR không tự approve. Chủ repo quyết định merge sau review; không bật auto-merge.
6. Chỉ khi nghiệm thu/đóng do hoàn thành mới chuyển Hoàn tất. Issue phụ thuộc được nhận sau khi nền liên quan đã merge.

Main được ruleset Active bảo vệ PR/review, dismiss stale review, resolve trao đổi, chặn force-push/xóa; không có bypass cho Codex/admin. Ngoại lệ bootstrap: required CI chờ lần chạy đầu, sau đó chọn đúng check Quality Gate với nguồn GitHub Actions qua browser và xác minh trên PR. Không bỏ bảo vệ để merge.

Issue/PR templates và workflow của PR bootstrap chỉ có hiệu lực trên default branch **sau khi merge**. Không coi file ở branch là đã áp dụng trên main.
