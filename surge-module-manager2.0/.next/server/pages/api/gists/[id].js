"use strict";
(() => {
var exports = {};
exports.id = 506;
exports.ids = [506];
exports.modules = {

/***/ 649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 89:
/***/ ((module) => {

module.exports = import("@octokit/rest");;

/***/ }),

/***/ 79:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _octokit_rest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(89);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_octokit_rest__WEBPACK_IMPORTED_MODULE_1__]);
_octokit_rest__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function handler(req, res) {
    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
        req
    });
    if (!session?.accessToken) {
        return res.status(401).json({
            message: "未授权"
        });
    }
    const octokit = new _octokit_rest__WEBPACK_IMPORTED_MODULE_1__.Octokit({
        auth: session.accessToken
    });
    const { id  } = req.query;
    if (!id || typeof id !== "string") {
        return res.status(400).json({
            message: "无效的 Gist ID"
        });
    }
    if (req.method === "PATCH") {
        try {
            const { content  } = req.body;
            // First check if the gist exists and is accessible
            try {
                await octokit.gists.get({
                    gist_id: id
                });
            } catch (error) {
                if (error.status === 404) {
                    return res.status(404).json({
                        message: "Gist 不存在或无权访问",
                        details: error.message
                    });
                }
                throw error;
            }
            const response = await octokit.gists.update({
                gist_id: id,
                files: {
                    "surge-module.sgmodule": {
                        content
                    }
                }
            });
            return res.status(200).json(response.data);
        } catch (error1) {
            console.error("Error updating gist:", error1);
            return res.status(error1.status || 500).json({
                message: "更新 Gist 失败",
                details: error1.message
            });
        }
    }
    return res.status(405).json({
        message: "不支持的请求方法"
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(79));
module.exports = __webpack_exports__;

})();