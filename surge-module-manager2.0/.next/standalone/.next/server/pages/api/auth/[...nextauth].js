"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 3123:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "authOptions": () => (/* binding */ authOptions),
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/github"
const github_namespaceObject = require("next-auth/providers/github");
var github_default = /*#__PURE__*/__webpack_require__.n(github_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].ts


const authOptions = {
    providers: [
        github_default()({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: "gist"
                }
            }
        })
    ],
    callbacks: {
        async jwt ({ token , account  }) {
            // 保存访问令牌到 JWT
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session ({ session , token  }) {
            // 将访问令牌添加到会话中
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: "/",
        error: "/"
    },
    // 添加额外的安全配置
    secret: process.env.NEXTAUTH_SECRET,
    cookies: {
        sessionToken: {
            name:  true ? "__Secure-next-auth.session-token" : 0,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: "production" === "production"
            }
        }
    }
};
/* harmony default export */ const _nextauth_ = (external_next_auth_default()(authOptions));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3123));
module.exports = __webpack_exports__;

})();