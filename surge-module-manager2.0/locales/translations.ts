export const translations = {
  zh: {
    // 导航栏
    title: 'Surge Module Manager',
    localMode: '本地模式',
    remoteMode: '远程模式',
    login: 'GitHub 登录',
    logout: '登出',
    back: '返回',
    preview: '预览',
    editMode: '编辑',

    // 预添加脚本区
    addScriptSection: '预添加脚本区',
    scriptName: '脚本名称',
    scriptNamePlaceholder: '给你的脚本起个名字',
    type: '类型',
    httpRequest: 'HTTP 请求',
    httpResponse: 'HTTP 响应',
    cron: '定时任务',
    httpPattern: '正则表达式',
    httpPatternPlaceholder: '例如: https://example.com/api.*',
    mitmDomain: 'MITM 域名',
    mitmDomainPlaceholder: '例如: api.example.com',
    mitmMode: 'MITM 模式',
    mitmInsert: '插入 (%INSERT%)',
    mitmAppend: '追加 (%APPEND%)',
    cronPattern: 'Cron 表达式',
    cronPatternPlaceholder: '例如: 0 8 * * * (每天早上8点)',
    wakeSystem: '唤醒系统',
    timeout: '超时设置',
    scriptPath: '脚本路径',
    scriptPathPlaceholder: '远程URL或本地路径',
    addScript: '添加脚本',

    // 已存在脚本区
    existingScriptsSection: '已存在脚本区',
    editScript: '编辑',
    delete: '删除',

    // 导入模块
    importSection: '导入模块',
    importModule: '导入模块',
    dropFileHint: '拖放模块文件到此处或点击选择',
    selectFile: '选择文件',

    // 编辑模块详情
    editDetailsSection: '编辑模块详情',
    moduleName: '模块名称',
    moduleDesc: '模块描述',
    noScriptsMessage: '还没有添加任何脚本',

    // 保存相关
    saveButton: '保存',
    savingButton: '保存中...',
    saveConfig: '保存配置',
    saveFailed: '保存失败',

    // 登录相关
    loginRequired: '需要登录',
    loginPrompt: '是否登录以使用完整功能？',
    loginFirst: '请先登录',
  },
  en: {
    // Navigation
    title: 'Surge Module Manager',
    localMode: 'Local Mode',
    remoteMode: 'Remote Mode',
    login: 'GitHub Login',
    logout: 'Logout',
    back: 'Back',
    preview: 'Preview',
    editMode: 'Edit',

    // Add Script Section
    addScriptSection: 'Add Script',
    scriptName: 'Script Name',
    scriptNamePlaceholder: 'Name your script',
    type: 'Type',
    httpRequest: 'HTTP Request',
    httpResponse: 'HTTP Response',
    cron: 'Cron',
    httpPattern: 'Pattern',
    httpPatternPlaceholder: 'e.g., https://example.com/api.*',
    mitmDomain: 'MITM Domain',
    mitmDomainPlaceholder: 'e.g., api.example.com',
    mitmMode: 'MITM Mode',
    mitmInsert: 'Insert (%INSERT%)',
    mitmAppend: 'Append (%APPEND%)',
    cronPattern: 'Cron Pattern',
    cronPatternPlaceholder: 'e.g., 0 8 * * * (8 AM daily)',
    wakeSystem: 'Wake System',
    timeout: 'Timeout',
    scriptPath: 'Script Path',
    scriptPathPlaceholder: 'Remote URL or local path',
    addScript: 'Add Script',

    // Existing Scripts Section
    existingScriptsSection: 'Existing Scripts',
    editScript: 'Edit',
    delete: 'Delete',

    // Import Section
    importSection: 'Import Module',
    importModule: 'Import Module',
    dropFileHint: 'Drop module file here or click to select',
    selectFile: 'Select File',

    // Edit Details Section
    editDetailsSection: 'Edit Module Details',
    moduleName: 'Module Name',
    moduleDesc: 'Module Description',
    noScriptsMessage: 'No scripts added yet',

    // Save Related
    saveButton: 'Save',
    savingButton: 'Saving...',
    saveConfig: 'Save Config',
    saveFailed: 'Save Failed',

    // Login Related
    loginRequired: 'Login Required',
    loginPrompt: 'Login to use full features?',
    loginFirst: 'Please login first',
  },
};
