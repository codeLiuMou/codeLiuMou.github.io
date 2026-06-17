/* ============================================
 * enhance.js
 * 顶部阅读进度条 + 几个小增强
 * 依赖：#reading-progress 元素（由本脚本注入）
 * ============================================ */
(function () {
  function injectProgressBar() {
    if (document.getElementById('reading-progress')) return;
    var bar = document.createElement('div');
    bar.id = 'reading-progress';
    document.body.appendChild(bar);
  }

  function updateProgress() {
    var bar = document.getElementById('reading-progress');
    if (!bar) return;
    var doc = document.documentElement;
    var scrollTop = window.pageYOffset || doc.scrollTop || 0;
    var scrollHeight = doc.scrollHeight;
    var clientHeight = doc.clientHeight;
    var max = scrollHeight - clientHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
    bar.style.width = pct + '%';
  }

  function init() {
    injectProgressBar();
    updateProgress();

    var ticking = false;
    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);

    // 兜底：图片/字体加载后可能改变文档高度
    if (window.addEventListener) {
      window.addEventListener('load', updateProgress);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // PJAX 切页后重置
  document.addEventListener('pjax:complete', function () {
    setTimeout(function () {
      injectProgressBar();
      updateProgress();
    }, 50);
  });
})();
