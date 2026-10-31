# Thư mục Tài liệu Tham chiếu Tarot (`data/`)

## 1. Vị trí đặt file PDF
Hãy đặt file sách/tài liệu ý nghĩa 78 lá bài Tarot của bạn vào đúng đường dẫn sau:

```
c:\Users\ADMIN\Downloads\hp\data\tarot_reference.pdf
```

## 2. Cơ chế hoạt động với Google Files API (`src/lib/tarotFileManager.ts`)
- Khi có lượt giải bài đầu tiên, hệ thống sẽ tự động upload `data/tarot_reference.pdf` lên **Google Files API** thông qua SDK `@google/genai` (`client.files.upload`).
- Thông tin `file_name`, `file_uri`, `created_at` cùng kích thước/thời gian sửa đổi của file sẽ được lưu vào `data/.tarot_file_cache.json`.
- Trong vòng **40 giờ tiếp theo** (Google lưu trữ file 48 giờ), mọi lượt xem bài đều tái sử dụng trực tiếp file đã upload qua `client.files.get({ name: fileName })`, **tuyệt đối không upload lại** ở mỗi lần click.
- Nếu bạn thay thế `data/tarot_reference.pdf` bằng một file PDF mới, hệ thống sẽ tự động nhận diện sự thay đổi kích thước/thời gian sửa đổi và upload bản mới lên Google Files API.
