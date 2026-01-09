# 📦 Surge Module Manager - Deployment Guide

> 🌐 Looking for the Chinese version? [**点击查看中文文档**](./readme_cn.md)
>
> ![Surge Module Manager UI Preview](shows_en.png)

## 📖 Introduction

**Surge Module Manager** is a user-friendly online interface for managing [Surge](https://nssurge.com) modules. It helps users import, manage, and update modules efficiently. This guide provides instructions to deploy this project locally or on Vercel.

---

## 🚀 Deployment Steps

### 1. Clone the Repository

```bash
git clone https://github.com/czy13724/surge-module-manager.git
cd surge-module-manager
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
npm install
```

### 3. Start Local Development

```bash
npm run dev
```

By default, the site will run at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
npm start
```

### 5. Edit Within the Interface

Follow the on-screen instructions to edit content directly within the interface. Once the file is generated, it will be saved locally. You can use iCloud for file syncing, or host the files on GitHub or any other hosting platform.

### 6. Fetch Subscriptions

Pull the remote links to get the subscription data. Import the resulting link into the Surge module manager.

---

## ☁️ Deploying to Vercel

This project supports one-click deployment to Vercel.

> ⚠️ **Note**: The Vercel deployment is intended for **frontend display purposes only** and may have limitations compared to local/server deployment.

1.  Go to [vercel.com](https://vercel.com/).
2.  Create a new project and import the GitHub repository.
3.  Vercel will automatically detect the project settings and deploy it.

After deployment, you will get a link like: `https://your-project.vercel.app`

---

## 🧩 Using the Interface

*   Click **Add Module Source** to enter the module's raw URL.
*   You can enable, disable, delete, or update modules from the list.

---

## ❓ FAQ

**Q: Where can I get module URLs?**
A: From GitHub `.sgmodule` files, click "Raw" and copy the link.

**Q: Why can't a module load?**
A: Ensure the URL is correct and publicly accessible.

## 🐛 Known Issues / Limitations

1.  **Re-importing**: The generated file content cannot be easily re-imported into the project, which may cause data loss or inconvenience.
2.  **Remote Mode**: Requires a backend server, which is not user-friendly for users without server resources.

---

## ☕ Support Levi

Your support keeps the testing going! ☕

<a href="https://www.buymeacoffee.com/czy13724" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" /></a>

---

## ⚖️ Disclaimer

<details>
<summary>Click to view full disclaimer</summary>

* The scripts, logos, and workflows involved in this project are for resource sharing and learning purposes only. Their legitimacy, accuracy, and propriety are not guaranteed. Do not use this project for any commercial purposes or profit.
* Following the Safe Harbor Principle, if there is any infringement of images or content, please inform us in the Issues section. After verification, it will be deleted. The copyright belongs to the original author and their website.
* I assume no responsibility for any content, including but not limited to any losses or damages caused by any content errors.
* Anyone who accesses this website or uses related resources of the project directly or indirectly through any means should read this statement carefully. Once you use or reproduce any related tutorials or resources of the project, you are deemed to have accepted this disclaimer.
* All resource files in this project are prohibited from being reproduced or published by any official account or self-media in any form.
* The data involved in this project is filled in by the individual or organization using it. This project is not responsible for the data content, including but not limited to the authenticity, accuracy, and legitimacy of the data. All consequences caused by using this project have nothing to do with the content contributors of this project and are fully borne by the individual or organization using it.
* The third-party hardware, software, etc. involved in this project have no direct or indirect relationship with this project. This project only objectively describes the deployment and usage process and does not represent support for using any third-party hardware or software. All consequences caused by using any third-party hardware or software are borne by the individual or organization using it and have nothing to do with this project.
* All content in this project is for learning and research use only. Do not use any content in this project for illegal acts, including but not limited to setting up VPS or other uses that violate the laws and regulations of the country/region/organization. The author is not responsible for any privacy leakage or other consequences caused thereby.
* All modifications made based on the source code of this project are spontaneous acts of other individuals or organizations and have no direct or indirect relationship with this project. All consequences caused are also unrelated to this project.
* All individuals and organizations that directly or indirectly use this project should complete learning and research within 24 hours and delete all content in this project in time. If you have a demand for the functions of this project, please develop related functions yourself.
* This project reserves the right to supplement or change the disclaimer at any time. Individuals or organizations that directly or indirectly use the content of this project are deemed to accept the special statement of this project.

</details>

---

© 2025 Surge Module Manager. All rights reserved.
