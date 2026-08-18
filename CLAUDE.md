# RITA Beverage — Quy tắc code Frontend

Static site, không build tool, không templating engine. Mọi trang là 1 file `.html` độc lập, dùng chung `css/style.css` và `js/main.js`.

## 1. Đặt tên class (BEM rút gọn)

Format: `.block`, `.block__element`, `.block--modifier`, `.block__element--modifier`.

**Block name viết tắt ngắn khi có thể**, theo đúng độ dài đã dùng trong file — không thêm âm tiết thừa:
- Rất ngắn (section/landmark lặp lại nhiều): `hd` (header), `ft` (footer), `cap`, `why`, `exhi`, `news`, `range`.
- Kebab-case 2 từ khi tên ngắn hơn gây mơ hồ: `sec-head`, `page-banner`, `lead-form`, `banner-cta`, `product-list`, `mobile-sub`, `sidefix`.
- Không dùng type dài dòng kiểu `.homepage-hero-banner-section`. Nếu ngồi gõ tên class thấy dài hơn nội dung nó style thì tên sai.

**Modifier đặt ở block hay ở element — chọn theo bản chất, không tuỳ hứng:**
- Đặt **trên element** (`__el--mod`) khi đó là 1 biến thể có nhiều giá trị loại-trừ-nhau của riêng element đó (màu/kiểu). Ví dụ có sẵn: `.banner-cta__can--glossy/--matte/--direct`, `.service-block--oem/--odm`, `.lead-form__row--2`.
- Đặt **trên block** (`.block--mod`, style qua descendant selector `.block--mod .block__el`) khi đó là 1 cờ bật/tắt do người viết HTML tự thêm/gỡ, ảnh hưởng tới layout/behaviour của cả component hoặc nhiều con bên trong. Ví dụ có sẵn: `.sec-head--split` (đổi layout của `__title` + `__desc` cùng lúc), `.page-banner--capped` (ép `__img` theo max-height).
- Lý do tách: cờ bật/tắt gắn trên block chỉ cần gõ 1 class ngắn ở gốc component, không phải lặp lại `block__element--modifier` dài trên từng thẻ con.
- Đặt tên modifier theo **cái gì thay đổi**, không theo cách implement. Ví dụ: `--capped` (ảnh bị giới hạn chiều cao) rõ nghĩa hơn `--fixed` (fixed có thể hiểu nhầm là `position: fixed`).

**Utility class** (không theo BEM, dùng lặp lại xuyên site): `.t-16`…`.t-48` (font-size), `.ss-pd` (section padding chuẩn), `.pd-top-0`, `.pd-bot-0`, `.pd-top-full` (main padding-top = full header height, xem mục 3). Utility luôn ngắn, không prefix block.

## 2. Container & spacing

- `.container` = `max-width: var(--container-fluid)` (144.6rem), padding `0 1.5rem`. Banner/ảnh full-bleed thì **không** bọc `.container`; chỉ phần content (text, breadcrumb...) mới bọc.
- `.ss-pd` cho padding-top/bottom chuẩn 1 section; `.pd-bot-0`/`.pd-top-0` khi cần bỏ 1 phía (2 section liền kề dùng chung khoảng cách).
- Breakpoint dùng xuyên site: `max-width: 1200px` (tablet) và `max-width: 600px` (mobile). Không tự chế breakpoint khác trừ khi bắt buộc.

## 3. Header trên trang con (không phải trang chủ)

Trang chủ có `.hero` nên header cần trong suốt ở đầu trang rồi mới đổi nền trắng khi cuộn — xử lý qua class `hd-transparent` (JS toggle tự động).

Trang con (không có hero, ví dụ `products.html`) **luôn** cần:
- `<header class="hd default">` — class `default` tắt hẳn cơ chế `hd-transparent` (xem `HeaderModule.js`), header luôn nền trắng.
- `<main class="main pd-top-full">` thay vì `pd-top` — `pd-top` chỉ chừa đúng chiều cao `hd-top` (thanh đỏ trên cùng) vì trang chủ để `.hero` tự che phần `hd-bar` trong suốt. `pd-top-full` chừa **toàn bộ** chiều cao header (`hd-top` + `hd-bar`) vì trang con không có gì che bên dưới.
- Ở `≤1200px`, header chuyển `position: sticky` (chiếm chỗ tự nhiên trong flow) nên cả `pd-top` và `pd-top-full` đều `padding-top: 0` tại breakpoint đó — không cộng dồn thêm padding kẻo bị 2 lần khoảng trắng.

## 4. Component tái sử dụng nhiều trang

Ví dụ chuẩn: `.page-banner` (nền cream + breadcrumb + title + desc trong `.container`, banner ảnh full-width KHÔNG bọc container, biến thể `--capped` để ép max-height khi ảnh không nên quá cao).

Khi thêm 1 trang mới:
1. Copy nguyên khối `<header>`, footer (`.ft`), `.lead-form`, `.sidefix`, script tags từ `index.html` — **không** copy `.preloader` (chỉ trang chủ mới có preloader).
2. Cập nhật menu active state: item tương ứng trong `.menu-list` (desktop) và `.mobile-sub` (mobile) đổi thành `current-menu-item` / `menu-link active`.
3. `<header class="hd default">`, `<main class="main pd-top-full">` (trừ khi trang đó có hero riêng như trang chủ).
4. Section đầu tiên luôn là `.page-banner` trừ khi có yêu cầu khác.

## 5. Không viết comment trong CSS/HTML/JS

Tên class/biến phải tự giải thích. Không thêm `/* ... */` hay `//` giải thích ý nghĩa, trừ khi ghi lại 1 ràng buộc/workaround không hiển nhiên (ví dụ: lý do 1 thư viện thiếu tính năng buộc phải làm cách khác).

## 6. Giới hạn kỹ thuật cần nhớ

- **Swiper bundle KHÔNG có module Grid** (`typeof Swiper.Grid === 'undefined'`). Không dùng `grid: { rows: N }`. Muốn layout dạng lưới nhiều trang: gom thủ công vào wrapper `.block__page` rồi dùng `display: contents` ở desktop/tablet, chuyển thành flex/grid scroll-snap thật ở mobile.
- Component nào dùng biến CSS cục bộ (`--size`, `--i`, `--pd`, `--cg`, `--rg`...) phải định nghĩa lại biến đó ngay trên chính block nếu block không nằm trong 1 ancestor đã có sẵn biến — không giả định biến "tự nhiên có".
