/* ============================================
 * cover-fallback.js
 * 兜底缺失/失效的封面图（针对 Solitude 主题）
 * 触发场景：文章 frontmatter 没有 cover 字段时，
 * 模板输出 <img src="/">，浏览器请求根路径失败
 * ============================================ */
(function () {
  var DEFAULT_COVER = '/img/default.avif';
  var DEFAULT_AVATAR = '/img/default_avatar.avif';

  function isDefaultUrl(url) {
    if (!url) return false;
    return url.indexOf('default.avif') !== -1 || url.indexOf('default_avatar.avif') !== -1;
  }

  function isBadSrc(src) {
    if (!src) return true;
    if (src === '/') return true;
    if (src === window.location.origin + '/') return true;
    // 类似 "/2025/03/25/hello-world/" 路径末尾是 / 且不是文件
    if (src.length > 1 && src.charAt(src.length - 1) === '/') {
      var lastSeg = src.split('/').slice(-2, -1)[0] || '';
      if (lastSeg.indexOf('.') === -1) return true;
    }
    return false;
  }

  function fixImage(img) {
    if (img.dataset.coverFixed) return;
    img.dataset.coverFixed = '1';

    var raw = img.getAttribute('src') || '';
    if (isBadSrc(raw)) {
      img.src = DEFAULT_COVER;
    }

    img.addEventListener('error', function () {
      if (isDefaultUrl(img.src)) {
        // 默认图也加载失败，淡出避免显示裂图占位
        img.style.opacity = '0';
        return;
      }
      // 头像类用 avatar 默认图，否则用文章默认图
      var isAvatar =
        img.classList.contains('avatar-img') ||
        (img.alt && img.alt.indexOf('头像') !== -1);
      img.src = isAvatar ? DEFAULT_AVATAR : DEFAULT_COVER;
    });
  }

  function fixAll() {
    var sels =
      '.article-sort-item-img img,' +
      '.post_bg,' +
      '#post-cover,' +
      '.aside-list-item img,' +
      '.card-info .avatar img';
    var nodes = document.querySelectorAll(sels);
    for (var i = 0; i < nodes.length; i++) fixImage(nodes[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixAll);
  } else {
    fixAll();
  }

  // PJAX 切页后再次执行
  document.addEventListener('pjax:complete', fixAll);
})();
