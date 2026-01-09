# 📦 Surge 模块管理器 - 部署指南

> 🌐 Looking for the English version? [**点击查看英文文档**](./readme.md)
>
> ![Surge Module Manager 界面预览](shows_cn.png)

## 📢 特别说明 / Updates

本项目新增 Surge 带参数版单一脚本模块生成器：
*   🛠️ **在线生成器**: [线路 1](https://surge-argu.levifree.qzz.io) | [线路 2](https://surge-argu.levifree.dpdns.org) 
*   📚 **使用指南**: [点击查看](https://github.com/czy13724/Surge/blob/main/Tutorials/surge_argu_moduler.md)

> ⚠️ **注意**：本项目因受限于无后端服务器，无法修复部分界面内容 Bug，建议本地运行以获得最佳体验。

---

## 📖 项目简介

**Surge Module Manager** 是一个用于 [Surge](https://nssurge.com) 模块管理的在线界面，用户可以方便地导入、启用、禁用、更新模块。本文档将指导你如何在本地或 Vercel 上部署此项目。

---

## 🚀 部署步骤

### 1. 克隆项目

```bash
git clone https://github.com/czy13724/surge-module-manager.git
cd surge-module-manager
```

### 2. 安装依赖

请确保你已安装 [Node.js](https://nodejs.org/)，然后运行：

```bash
npm install
```

### 3. 本地开发模式启动

```bash
npm run dev
```

默认运行在 `http://localhost:3000`。

### 4. 构建生产环境版本

```bash
npm run build
npm start
```

### 5. 在界面内进行编辑

按照界面提示直接编辑。文件生成后会存储到本地，你可以借助 iCloud 进行同步，也可以将文件托管到 GitHub 或其他平台。

### 6. 拉取订阅

先获取远程链接，然后将其导入 Surge 模块管理器。

---

## ☁️ 部署到 Vercel

本项目支持一键部署到 Vercel。

> ⚠️ **注意**：Vercel 部署仅用于前端展示，功能可能受限，不可用于需要持久化存储的真实用途。

**部署方法：**

1.  访问 [vercel.com](https://vercel.com/)。
2.  新建项目，导入该 GitHub 仓库。
3.  系统会自动检测配置并部署，无需手动干预。

部署完成后，你将获得一个类似 `https://your-project.vercel.app` 的网址。

---

## 🧩 使用指南

*   点击 **“添加模块源”**，输入模块的原始链接（Raw URL）。
*   在模块列表中，你可以启用、禁用、删除、更新模块。

---

## ❓ 常见问题 (FAQ)

**问：模块链接在哪里找？**
答：在 GitHub 上找到 `.sgmodule` 文件，点击 “Raw”，复制地址即可。

**问：模块加载失败怎么办？**
答：确保模块地址正确，且对公网可访问。

## 🐛 已知问题 / 待解决

1.  **无法重新导入**：生成的文件内容难以重新导入项目进行编辑，可能导致数据丢失。
2.  **远程模式限制**：完整远程模式需要服务器后端支持，对无服务器用户不友好。

---

## ☕ Support Levi

Your support keeps the updates coming! ☕

<a href="https://www.buymeacoffee.com/czy13724" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" /></a>

---

## ⚖️ 免责声明

<details>
<summary>点击展开查看完整免责声明</summary>

* 项目内所涉及脚本、LOGO 、工作流仅为资源共享、学习参考之目的，不保证其合法性、正当性、准确性；切勿使用项目做任何商业用途或牟利；
* 遵循避风港原则，若有图片和内容等侵权，请在 Issues 告知，核实后删除，其版权均归原作者及其网站所有；
* 本人不对任何内容承担任何责任，包括但不限于任何内容错误导致的任何损失、损害；
* 其它人通过任何方式登陆本网站或直接、间接使用项目相关资源，均应仔细阅读本声明，一旦使用、转载项目任何相关教程或资源，即被视为您已接受此免责声明。
* 本项目内所有资源文件，禁止任何公众号、自媒体进行任何形式的转载、发布。
* 本项目涉及的数据由使用的个人或组织自行填写，本项目不对数据内容负责，包括但不限于数据的真实性、准确性、合法性。使用本项目所造成的一切后果，与本项目的所有贡献者无关，由使用的个人或组织完全承担。
* 本项目中涉及的第三方硬件、软件等，与本项目没有任何直接或间接的关系。本项目仅对部署和使用过程进行客观描述，不代表支持使用任何第三方硬件、软件。使用任何第三方硬件、软件，所造成的一切后果由使用的个人或组织承担，与本项目无关。
* 本项目中所有内容只供学习和研究使用，不得将本项目中任何内容用于违法行为，包括但不限于建立 VPS 或违反国家/地区/组织等的法律法规或相关规定的其他用途。作者对于由此引起的任何隐私泄漏或其他后果概不负责。
* 所有基于本项目源代码，进行的任何修改，为其他个人或组织的自发行为，与本项目没有任何直接或间接的关系，所造成的一切后果亦与本项目无关。
* 所有直接或间接使用本项目的个人和组织，应24小时内完成学习和研究，并及时删除本项目中的所有内容。如对本项目的功能有需求，应自行开发相关功能。
* 本项目保留随时对免责声明进行补充或更改的权利，直接或间接使用本项目内容的个人或组织，视为接受本项目的特别声明。

</details>

---

© 2025 Surge Module Manager. All rights reserved.
