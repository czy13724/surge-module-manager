"use strict";
(() => {
var exports = {};
exports.id = 690;
exports.ids = [690];
exports.modules = {

/***/ 649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 89:
/***/ ((module) => {

module.exports = import("@octokit/rest");;

/***/ }),

/***/ 104:
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
    if (!session) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    const octokit = new _octokit_rest__WEBPACK_IMPORTED_MODULE_1__.Octokit({
        auth: session.accessToken
    });
    if (req.method === "PUT") {
        try {
            const { gistId , filename , content  } = req.body;
            await octokit.gists.update({
                gist_id: gistId,
                files: {
                    [filename]: {
                        content
                    }
                }
            });
            return res.status(200).json({
                success: true
            });
        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
    return res.status(405).json({
        error: "Method not allowed"
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
var __webpack_exports__ = (__webpack_exec__(104));
module.exports = __webpack_exports__;

})();