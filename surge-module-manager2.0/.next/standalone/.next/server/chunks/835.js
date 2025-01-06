"use strict";
exports.id = 835;
exports.ids = [835];
exports.modules = {

/***/ 7835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LocalEditor)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useTranslation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4485);



function LocalEditor() {
    const [scripts, setScripts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [selectedFile, setSelectedFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [moduleName, setModuleName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [moduleDesc, setModuleDesc] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const fileInputRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const { t  } = (0,_hooks_useTranslation__WEBPACK_IMPORTED_MODULE_2__/* .useTranslation */ .$)();
    // 预添加脚本区域的状态
    const [scriptName, setScriptName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [scriptType, setScriptType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("http-request");
    const [httpPattern, setHttpPattern] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [mitmDomain, setMitmDomain] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [mitmMode, setMitmMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("insert");
    const [cronPattern, setCronPattern] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [wakeSystem, setWakeSystem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [timeout, setTimeout] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [scriptPath, setScriptPath] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handleDrop = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    }, []);
    const handleFileSelect = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((e)=>{
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    }, []);
    const addScript = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        const newScript = {
            name: scriptName,
            type: scriptType,
            pattern: scriptType === "http-request" ? httpPattern : cronPattern,
            mitmDomain: scriptType === "http-request" ? mitmDomain : undefined,
            mitmMode: scriptType === "http-request" ? mitmMode : undefined,
            timeout: scriptType === "cron" ? timeout : undefined,
            scriptPath
        };
        setScripts((prev)=>[
                ...prev,
                newScript
            ]);
        // 重置表单
        setScriptName("");
        setHttpPattern("");
        setMitmDomain("");
        setMitmMode("insert");
        setCronPattern("");
        setWakeSystem(false);
        setTimeout("");
        setScriptPath("");
    }, [
        scriptName,
        scriptType,
        httpPattern,
        mitmDomain,
        mitmMode,
        cronPattern,
        wakeSystem,
        timeout,
        scriptPath
    ]);
    const deleteScript = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((index)=>{
        setScripts((prev)=>prev.filter((_, i)=>i !== index));
    }, []);
    const saveConfig = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        try {
            // 实现保存逻辑
            alert("保存成功！");
        } catch (error) {
            alert(t("saveFailed"));
        }
    }, [
        scripts,
        moduleName,
        moduleDesc,
        t
    ]);
    const handleImportClick = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        fileInputRef.current?.click();
    }, []);
    // 添加保存事件监听器
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const handleSaveConfig = ()=>{
            saveConfig();
        };
        window.addEventListener("save-config", handleSaveConfig);
        return ()=>{
            window.removeEventListener("save-config", handleSaveConfig);
        };
    }, [
        saveConfig
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "min-h-[calc(100vh-4rem)] bg-gray-50/70 pt-20",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "file",
                ref: fileInputRef,
                onChange: handleFileSelect,
                className: "hidden"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                onDrop: handleDrop,
                onDragOver: (e)=>e.preventDefault(),
                className: "min-h-full",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "container mx-auto p-8",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-12 gap-8",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-span-7",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "bg-white/70 backdrop-blur-sm shadow-lg rounded-lg p-8 sticky top-24",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                            className: "text-2xl font-semibold mb-8 flex items-center gap-2 text-gray-800",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                    className: "ti ti-plus-circle"
                                                }),
                                                " ",
                                                t("addScriptSection")
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "space-y-8",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            className: "block text-lg font-medium text-gray-700 mb-3",
                                                            children: t("scriptName")
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "text",
                                                            value: scriptName,
                                                            onChange: (e)=>setScriptName(e.target.value),
                                                            placeholder: t("scriptNamePlaceholder"),
                                                            className: "w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            className: "block text-lg font-medium text-gray-700 mb-3",
                                                            children: t("type")
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                            value: scriptType,
                                                            onChange: (e)=>setScriptType(e.target.value),
                                                            className: "w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                    value: "http-request",
                                                                    children: "HTTP Request"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                    value: "http-response",
                                                                    children: "HTTP Response"
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                    value: "cron",
                                                                    children: "Cron"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                scriptType.includes("http") && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    className: "block text-lg font-medium text-gray-700 mb-3",
                                                                    children: t("httpPattern")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                    type: "text",
                                                                    value: httpPattern,
                                                                    onChange: (e)=>setHttpPattern(e.target.value),
                                                                    placeholder: t("httpPatternPlaceholder"),
                                                                    className: "w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    className: "block text-lg font-medium text-gray-700 mb-3",
                                                                    children: t("mitmDomain")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                    type: "text",
                                                                    value: mitmDomain,
                                                                    onChange: (e)=>setMitmDomain(e.target.value),
                                                                    placeholder: t("mitmDomainPlaceholder"),
                                                                    className: "w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    className: "block text-lg font-medium text-gray-700 mb-3",
                                                                    children: t("mitmMode")
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                                    value: mitmMode,
                                                                    onChange: (e)=>setMitmMode(e.target.value),
                                                                    className: "w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                            value: "insert",
                                                                            children: t("mitmInsert")
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                                            value: "append",
                                                                            children: t("mitmAppend")
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                scriptType === "cron" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    className: "block text-lg font-medium text-gray-700 mb-3",
                                                                    children: t("cronPattern")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                    type: "text",
                                                                    value: cronPattern,
                                                                    onChange: (e)=>setCronPattern(e.target.value),
                                                                    placeholder: t("cronPatternPlaceholder"),
                                                                    className: "w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "space-y-6",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "flex items-center",
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                            type: "checkbox",
                                                                            checked: wakeSystem,
                                                                            onChange: (e)=>setWakeSystem(e.target.checked),
                                                                            className: "w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                            className: "ml-3 text-lg text-gray-700",
                                                                            children: t("wakeSystem")
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                            className: "block text-lg font-medium text-gray-700 mb-3",
                                                                            children: t("timeout")
                                                                        }),
                                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                            type: "number",
                                                                            value: timeout,
                                                                            onChange: (e)=>setTimeout(e.target.value),
                                                                            className: "w-48 px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            className: "block text-lg font-medium text-gray-700 mb-3",
                                                            children: t("scriptPath")
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "text",
                                                            value: scriptPath,
                                                            onChange: (e)=>setScriptPath(e.target.value),
                                                            placeholder: t("scriptPathPlaceholder"),
                                                            className: "w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "mt-8",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                onClick: addScript,
                                                className: "w-full bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg transition-all text-xl font-semibold flex items-center justify-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "ti ti-plus"
                                                    }),
                                                    " ",
                                                    t("addScript")
                                                ]
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col-span-5",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "grid grid-rows-2 gap-8 h-[calc(100vh-8rem)] sticky top-24",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "bg-white/70 backdrop-blur-sm shadow-lg rounded-lg p-6 overflow-auto",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                                    className: "text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 sticky top-0 bg-white/70 backdrop-blur-sm py-2",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "ti ti-list"
                                                        }),
                                                        " ",
                                                        t("existingScriptsSection")
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "space-y-4",
                                                    children: scripts.length > 0 ? scripts.map((script, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            className: "bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow",
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                                                    className: "text-lg font-semibold mb-2",
                                                                    children: script.name
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "grid gap-2 text-sm text-gray-600",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                    className: "font-medium",
                                                                                    children: [
                                                                                        t("type"),
                                                                                        ":"
                                                                                    ]
                                                                                }),
                                                                                " ",
                                                                                script.type
                                                                            ]
                                                                        }),
                                                                        script.type === "http-request" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                            className: "font-medium",
                                                                                            children: [
                                                                                                t("httpPattern"),
                                                                                                ":"
                                                                                            ]
                                                                                        }),
                                                                                        " ",
                                                                                        script.pattern
                                                                                    ]
                                                                                }),
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                            className: "font-medium",
                                                                                            children: [
                                                                                                t("mitmDomain"),
                                                                                                ":"
                                                                                            ]
                                                                                        }),
                                                                                        " ",
                                                                                        script.mitmDomain
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                                            children: [
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                            className: "font-medium",
                                                                                            children: [
                                                                                                t("cronPattern"),
                                                                                                ":"
                                                                                            ]
                                                                                        }),
                                                                                        " ",
                                                                                        script.pattern
                                                                                    ]
                                                                                }),
                                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                                                            className: "font-medium",
                                                                                            children: [
                                                                                                t("timeout"),
                                                                                                ":"
                                                                                            ]
                                                                                        }),
                                                                                        " ",
                                                                                        script.timeout,
                                                                                        "ms"
                                                                                    ]
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                                    className: "mt-4 flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                            onClick: ()=>{},
                                                                            className: "flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-all text-sm",
                                                                            children: [
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                                    className: "ti ti-edit"
                                                                                }),
                                                                                " ",
                                                                                t("edit")
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                                                            onClick: ()=>deleteScript(index),
                                                                            className: "flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition-all text-sm",
                                                                            children: [
                                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                                                    className: "ti ti-trash"
                                                                                }),
                                                                                " ",
                                                                                t("delete")
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        }, index)) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "text-center text-gray-500 py-8",
                                                        children: t("noScriptsMessage")
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "bg-white/70 backdrop-blur-sm shadow-lg rounded-lg p-6",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                                    className: "text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                            className: "ti ti-edit"
                                                        }),
                                                        " ",
                                                        t("editDetailsSection")
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                                    children: t("moduleName")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                    type: "text",
                                                                    value: moduleName,
                                                                    onChange: (e)=>setModuleName(e.target.value),
                                                                    className: "w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                            children: [
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                                    className: "block text-sm font-medium text-gray-700 mb-1",
                                                                    children: t("moduleDesc")
                                                                }),
                                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                                                    value: moduleDesc,
                                                                    onChange: (e)=>setModuleDesc(e.target.value),
                                                                    rows: 2,
                                                                    className: "w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}


/***/ })

};
;