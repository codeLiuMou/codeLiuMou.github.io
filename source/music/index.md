---
title: 音乐馆
date: 2026-06-17 14:50:00
aside: false
top_img: false
type: "page"
comments: false
---

> 写代码时听什么？

要启用音乐胶囊播放器，请在 `_config.solitude.yml` 里：

```yaml
capsule:
  enable: true
  id: 你的歌单 ID
  server: netease   # netease / qq / xiami / kugou / baidu
  type: playlist    # playlist / song
  volume: 0.8
```

或在 `music` 模块下配置独立音乐页。
