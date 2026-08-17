<?php
/**
 * getfile.php — Bảng điều hướng các trang FE tĩnh của RITA.
 * Tự quét mọi file .html trong cùng thư mục và liệt kê thành link (mở tab mới).
 * Thêm trang mới -> tự hiện, không cần sửa file này.
 */

// Lấy tất cả .html trong thư mục hiện tại
$dir   = __DIR__;
$files = glob($dir . DIRECTORY_SEPARATOR . '*.html');
if ($files === false) { $files = []; }

// Sắp: index.html lên đầu, còn lại theo alphabet
usort($files, function ($a, $b) {
    $ba = strtolower(basename($a));
    $bb = strtolower(basename($b));
    if ($ba === 'index.html') return -1;
    if ($bb === 'index.html') return 1;
    return strcmp($ba, $bb);
});

// Đọc <title> của từng file
function page_title($path) {
    $html = @file_get_contents($path, false, null, 0, 4096); // đọc 4KB đầu là đủ
    if ($html !== false && preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m)) {
        $t = trim(html_entity_decode($m[1], ENT_QUOTES, 'UTF-8'));
        if ($t !== '') return $t;
    }
    return '(no title)';
}

$pages = [];
foreach ($files as $f) {
    $name = basename($f);
    $pages[] = [
        'file'  => $name,
        'title' => page_title($f),
        'size'  => filesize($f),
        'mtime' => filemtime($f),
    ];
}

function human_size($bytes) {
    if ($bytes < 1024) return $bytes . ' B';
    if ($bytes < 1048576) return round($bytes / 1024, 1) . ' KB';
    return round($bytes / 1048576, 2) . ' MB';
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>RITA FE — Danh sách trang</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      background: #f4f5f7; color: #222; line-height: 1.5;
      padding: 32px 16px; min-height: 100vh;
    }
    .wrap { max-width: 760px; margin: 0 auto; }
    .head { display: flex; align-items: baseline; gap: 12px; margin-bottom: 4px; }
    h1 { font-size: 22px; color: #D92B2B; letter-spacing: .5px; }
    .count { font-size: 13px; color: #888; }
    .sub { font-size: 13px; color: #888; margin-bottom: 22px; }
    .sub code { background: #e9ebef; padding: 1px 6px; border-radius: 4px; font-size: 12px; }
    ul { list-style: none; display: grid; gap: 10px; }
    li a {
      display: flex; align-items: center; gap: 14px;
      background: #fff; border: 1px solid #e3e5e9; border-radius: 10px;
      padding: 14px 16px; text-decoration: none; color: inherit;
      transition: border-color .15s, box-shadow .15s, transform .05s;
    }
    li a:hover { border-color: #D92B2B; box-shadow: 0 4px 14px rgba(217,43,43,.10); }
    li a:active { transform: translateY(1px); }
    .ic {
      flex: 0 0 40px; height: 40px; border-radius: 8px;
      background: #fdecec; color: #D92B2B; font-weight: 700; font-size: 15px;
      display: flex; align-items: center; justify-content: center;
    }
    .meta { flex: 1; min-width: 0; }
    .fname { font-weight: 600; font-size: 15px; word-break: break-all; }
    .ptitle { font-size: 12.5px; color: #6b7280; margin-top: 2px;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .info { flex: 0 0 auto; text-align: right; font-size: 11.5px; color: #9aa0a8; }
    .open { flex: 0 0 auto; font-size: 12px; color: #D92B2B; font-weight: 600; }
    .empty { background:#fff; border:1px dashed #d0d3d8; border-radius:10px;
      padding: 28px; text-align: center; color:#888; }
    footer { margin-top: 24px; font-size: 12px; color: #aab; text-align: center; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="head">
      <h1>RITA · FrontEnd</h1>
      <span class="count"><?= count($pages) ?> trang</span>
    </div>
    <p class="sub">Click để mở trong tab mới · thư mục <code><?= htmlspecialchars(basename($dir)) ?>/</code></p>

    <?php if (empty($pages)): ?>
      <div class="empty">Chưa có file <b>.html</b> nào trong thư mục này.</div>
    <?php else: ?>
      <ul>
        <?php foreach ($pages as $p): ?>
          <li>
            <a href="./<?= rawurlencode($p['file']) ?>" target="_blank" rel="noopener">
              <span class="ic"><?= strtoupper(substr($p['file'], 0, 1)) ?></span>
              <span class="meta">
                <span class="fname"><?= htmlspecialchars($p['file']) ?></span>
                <span class="ptitle"><?= htmlspecialchars($p['title']) ?></span>
              </span>
              <span class="info">
                <?= human_size($p['size']) ?><br>
                <?= date('d/m H:i', $p['mtime']) ?>
              </span>
              <span class="open">Mở ↗</span>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <footer>getfile.php — tự quét lại mỗi lần tải trang</footer>
  </div>
</body>
</html>
