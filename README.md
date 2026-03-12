# Surge Module Manager

这是一个包含应用与文档的单仓库。

## 结构

- `/apps/web`：Next.js 应用源码
- `/docs`：项目文档与截图

## 开发

```bash
cd apps/web
npm install
cp .env.example .env.local
npm run dev
```

## 文档

- 中文：`/docs/README_CN.md`
- English: `/docs/README.md`

## 部署到 Vercel

仓库根目录已包含 `vercel.json`，可直接导入部署。
如 Vercel 未自动识别，请将 Root Directory 指向 `apps/web`。
