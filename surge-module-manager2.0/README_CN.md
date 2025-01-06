# Surge Module Manager

基于 Next.js 的现代化 Surge 模块管理器，可部署到 Vercel。

## 功能特性

- GitHub OAuth 认证
- 支持编辑 GitHub/Gist 中的模块文件
- 支持 HTTP 和 Cron 类型的脚本
- 现代化响应式用户界面
- 支持本地和远程模式
- 双语支持（中文/英文）

## 开始使用

### 部署到 Vercel

1. Fork 这个仓库到你的 GitHub 账号

2. 在 GitHub 创建一个新的 OAuth 应用：
   - 访问 Settings > Developer settings > OAuth Apps > New OAuth App
   - 设置 Homepage URL 为你的 Vercel 域名
   - 设置 Authorization callback URL 为 `https://你的域名/api/auth/callback/github`

3. 在 Vercel 中导入项目：
   - 连接你的 GitHub 仓库
   - 设置环境变量：
     | 变量名 | 说明 | 示例 |
     |--------|------|------|
     | `NEXTAUTH_URL` | 应用部署的 URL | `https://你的域名` |
     | `NEXTAUTH_SECRET` | NextAuth.js 加密密钥 | 使用 `openssl rand -base64 32` 生成或者访问: https://generate-secret.vercel.app/32 |
     | `GITHUB_ID` | GitHub OAuth App 的客户端 ID | 从 GitHub 开发者设置获取 |
     | `GITHUB_SECRET` | GitHub OAuth App 的客户端密钥 | 从 GitHub 开发者设置获取 |

4. 部署完成后，访问你的 Vercel 域名即可使用

### 远程存储选项

在远程模式下，你可以选择将模块文件存储在：

1. **GitHub 仓库**
   - 将模块作为文件存储在仓库中
   - 支持私有仓库
   - 更适合版本控制和协作
   - 在设置中配置仓库名称

2. **GitHub Gist**
   - 将每个模块存储为一个 Gist
   - 支持私有 Gist
   - 更适合单个模块管理
   - 可通过 Gist URL 快速分享

你可以在应用设置中切换这些存储选项。应用会记住你的偏好设置，用于后续的保存操作。

### 本地开发

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
复制 `.env.local.example` 为 `.env.local` 并填写配置

3. 运行开发服务器：
```bash
npm run dev
```

## 使用指南

1. **认证**
   - 使用 GitHub 账号登录（远程模式需要）
   - 本地模式无需认证即可使用

2. **模块管理**
   - 导入现有模块或创建新模块
   - 编辑模块配置
   - 添加 HTTP 请求或 Cron 类型的脚本
   - 保存更改（远程模式下自动同步到 GitHub/Gist）

3. **脚本类型**
   - HTTP 请求：配置匹配模式和 MITM 域名
   - Cron：设置定时模式和超时时间

## 注意事项

- GitHub OAuth App 需要适当的权限范围（repo, gist）
- 确保环境变量正确配置
- 建议使用自定义域名
- 本地模式下所有数据存储在浏览器中

## 贡献

欢迎提交 Pull Request 来帮助改进这个项目！

## 许可证

本项目基于 MIT 许可证开源 - 详见 LICENSE 文件。

---

[English Documentation](./README.md)
