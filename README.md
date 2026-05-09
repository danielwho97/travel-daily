# 文旅行业日报网页

这是一个静态网页项目，入口是 `index.html`。日报数据保存在 `data/reports.js`，每日自动化会把最新日报插入数据数组首位。

## 本地预览

```bash
python3 -m http.server 4173
```

打开：

```text
http://127.0.0.1:4173/
```

## 分享给别人

本地地址只能在你的电脑上访问。要让所有人都能看到，需要发布到公网，例如：

- GitHub Pages：适合长期免费托管静态网页。
- Netlify / Vercel：适合快速生成公开链接。
- 公司内网服务器：适合只给组织内部访问。

发布到公网后，网页右上角“分享”按钮会分享或复制公开链接。

## GitHub Pages

项目已包含 `.github/workflows/pages.yml`。推送到 GitHub 仓库的 `main` 分支后，GitHub Actions 会自动部署静态网页。
