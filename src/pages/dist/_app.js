"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var client_1 = require("next-auth/client");
var api_1 = require("~/utils/api");
require("~/styles/globals.css");
require("../styles/initial.css");
require("../styles/register.css");
require("../styles/login.css");
require("../styles/resetpwd.css");
var head_1 = require("next/head");
var MyApp = function (_a) {
    var Component = _a.Component, _b = _a.pageProps, session = _b.session, pageProps = __rest(_b, ["session"]);
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "HelenK"),
            React.createElement("meta", { name: "description", content: "HelenK" })),
        React.createElement(client_1.Provider, { session: session },
            React.createElement(Component, __assign({}, pageProps)))));
};
exports["default"] = api_1.api.withTRPC(MyApp);
