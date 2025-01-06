"use strict";
(() => {
var exports = {};
exports.id = 112;
exports.ids = [112];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 6089:
/***/ ((module) => {

module.exports = import("@octokit/rest");;

/***/ }),

/***/ 3851:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1649);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _octokit_rest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6089);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_octokit_rest__WEBPACK_IMPORTED_MODULE_1__]);
_octokit_rest__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function handler(req, res) {
    try {
        const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
            req
        });
        if (!session?.accessToken) {
            console.error("Authentication error: No access token found in session");
            return res.status(401).json({
                error: "Unauthorized - Please log in again"
            });
        }
        const octokit = new _octokit_rest__WEBPACK_IMPORTED_MODULE_1__.Octokit({
            auth: session.accessToken
        });
        if (req.method === "GET") {
            try {
                // 获取用户的所有 Gist，包括私有的
                const response = await octokit.gists.list({
                    per_page: 100 // 增加每页数量以确保获取所有 gist
                });
                // 过滤出包含 surge-module.sgmodule 文件的 gist
                const gists = response.data.filter((gist)=>Object.keys(gist.files).some((filename)=>filename.toLowerCase().endsWith(".sgmodule")));
                console.log("Found Surge module gists:", gists.length);
                return res.status(200).json(gists);
            } catch (error) {
                console.error("Error fetching gists:", error);
                return res.status(error.status || 500).json({
                    error: "Failed to fetch gists",
                    details: error.message
                });
            }
        }
        if (req.method === "POST") {
            try {
                const { filename , content , description  } = req.body;
                if (!content) {
                    return res.status(400).json({
                        error: "Content is required"
                    });
                }
                // 创建新的 Gist
                const response1 = await octokit.gists.create({
                    files: {
                        [filename || "surge-module.sgmodule"]: {
                            content
                        }
                    },
                    description: description || "Surge Module",
                    public: false
                });
                console.log("Created new gist:", response1.data.id);
                return res.status(200).json(response1.data);
            } catch (error1) {
                console.error("Error creating gist:", error1);
                return res.status(error1.status || 500).json({
                    error: "Failed to create gist",
                    details: error1.message
                });
            }
        }
        if (req.method === "PUT") {
            try {
                const { gist_id , filename: filename1 , content: content1  } = req.body;
                if (!gist_id || !filename1 || !content1) {
                    return res.status(400).json({
                        error: "Missing required fields"
                    });
                }
                // 更新现有的 Gist
                const response2 = await octokit.gists.update({
                    gist_id,
                    files: {
                        [filename1]: {
                            content: content1
                        }
                    }
                });
                console.log("Updated gist:", gist_id);
                return res.status(200).json(response2.data);
            } catch (error2) {
                console.error("Error updating gist:", error2);
                return res.status(error2.status || 500).json({
                    error: "Failed to update gist",
                    details: error2.message
                });
            }
        }
        return res.status(405).json({
            error: "Method not allowed"
        });
    } catch (error3) {
        console.error("Unexpected error:", error3);
        return res.status(500).json({
            error: "Internal server error",
            details: error3.message
        });
    }
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
var __webpack_exports__ = (__webpack_exec__(3851));
module.exports = __webpack_exports__;

})();