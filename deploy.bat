@echo off
REM 一键部署到 GitHub Pages
REM 用法: 双击运行或命令行执行 deploy.bat

echo === 清理旧文件 ===
call npx hexo clean

echo === 生成静态文件 ===
call npx hexo generate

echo === 部署到 GitHub ===
call npx hexo deploy

echo === 部署完成 ===
pause
