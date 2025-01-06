"use strict";
(() => {
var exports = {};
exports.id = 690;
exports.ids = [690];
exports.modules = {

/***/ 1649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 6089:
/***/ ((module) => {

module.exports = import("@octokit/rest");;

/***/ }),

/***/ 1104:
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
    const session = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.getSession)({
        req
    });
    if (!session?.accessToken) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    const octokit = new _octokit_rest__WEBPACK_IMPORTED_MODULE_1__.Octokit({
        auth: session.accessToken
    });
    if (req.method === "PUT" || req.method === "PATCH") {
        try {
            const { gist_id , content  } = req.body;
            if (!gist_id) {
                return res.status(400).json({
                    error: "Missing gist_id"
                });
            }
            // First check if the gist exists and is accessible
            try {
                const gistResponse = await octokit.gists.get({
                    gist_id
                });
                // Check if the gist is accessible and belongs to the user
                if (!gistResponse.data || gistResponse.data.owner?.login !== session.user?.name) {
                    return res.status(403).json({
                        error: "You do not have permission to access this gist"
                    });
                }
            } catch (error) {
                if (error.status === 404) {
                    return res.status(404).json({
                        error: "Gist not found or inaccessible"
                    });
                }
                throw error;
            }
            // Update the gist
            const response = await octokit.gists.update({
                gist_id,
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
                error: error1.message || "Failed to update gist"
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
var __webpack_exports__ = (__webpack_exec__(1104));
module.exports = __webpack_exports__;

})();