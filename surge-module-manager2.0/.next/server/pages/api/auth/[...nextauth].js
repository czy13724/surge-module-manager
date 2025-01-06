"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 123:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/github"
const github_namespaceObject = require("next-auth/providers/github");
var github_default = /*#__PURE__*/__webpack_require__.n(github_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].ts


/* harmony default export */ const _nextauth_ = (external_next_auth_default()({
    providers: [
        github_default()({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            authorization: {
                params: {
                    scope: "gist"
                }
            }
        })
    ],
    pages: {
        signIn: "/",
        error: "/"
    },
    callbacks: {
        async jwt ({ token , account  }) {
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session ({ session , token  }) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
}));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(123));
module.exports = __webpack_exports__;

})();