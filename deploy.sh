#!/bin/bash
# 一键部署到 GitHub Pages
# 用法: bash deploy.sh

echo "=== 清理旧文件 ==="
npx hexo clean

echo "=== 生成静态文件 ==="
npx hexo generate

echo "=== 部署到 GitHub ==="
npx hexo deploy

echo "=== 部署完成 ==="
