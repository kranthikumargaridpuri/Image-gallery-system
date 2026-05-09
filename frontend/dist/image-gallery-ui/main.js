(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"site-wrapper\">\n\n  <header class=\"premium-header\">\n\n    <div class=\"header-main\">\n      <a class=\"brand\" routerLink=\"/\">\n        <img src=\"assets/images/logo.png\" class=\"top-logo\" />\n\n        <span class=\"brand-text\">\n          <span>GLOBAL</span>\n          <span>TRADERS</span>\n        </span>\n      </a>\n\n      <nav class=\"menu\">\n        <a routerLink=\"/\">GALLERY</a>\n        <a routerLink=\"/cart\" *ngIf=\"auth.loggedIn()\">CART</a>\n        <a routerLink=\"/admin\" *ngIf=\"auth.isAdmin()\">ADMIN</a>\n        <a routerLink=\"/login\" *ngIf=\"!auth.loggedIn()\">LOGIN</a>\n        <a routerLink=\"/register\" *ngIf=\"!auth.loggedIn()\">REGISTER</a>\n        <a href=\"#\" *ngIf=\"auth.loggedIn()\" (click)=\"auth.logout()\">LOGOUT</a>\n      </nav>\n    </div>\n\n  </header>\n\n  <main class=\"main-body\">\n    <router-outlet></router-outlet>\n  </main>\n\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/forgot-password/forgot-password.component.html":
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/forgot-password/forgot-password.component.html ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container mt-5\" style=\"max-width: 450px;\">\n  <h3>Forgot Password</h3>\n\n  <input\n    class=\"form-control my-3\"\n    type=\"email\"\n    placeholder=\"Enter your email\"\n    [(ngModel)]=\"email\"\n  />\n\n  <button class=\"btn btn-primary w-100\" (click)=\"submit()\">\n    Get Reset Token\n  </button>\n\n  <div class=\"text-danger mt-3\" *ngIf=\"message\">\n    {{ message }}\n  </div>\n\n  <div class=\"alert alert-info mt-3\" *ngIf=\"token\">\n    Your reset token: <b>{{ token }}</b>\n  </div>\n\n  <a routerLink=\"/reset-password\">Go to Reset Password</a>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/image-preview/image-preview.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/image-preview/image-preview.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container mt-4\" *ngIf=\"image\">\n  <!-- TOP BAR -->\n  <div class=\"top-action-bar mb-3\">\n    <button class=\"btn btn-primary back-btn\" (click)=\"goBack()\">← Back</button>\n\n    <div class=\"category-top-bar\">\n      <span class=\"category-label\"> Category </span>\n\n      <span class=\"category-value\">\n        {{ image.categoryName }}\n      </span>\n    </div>\n  </div>\n\n  <!-- MAIN ROW -->\n  <div class=\"row\">\n    <!-- IMAGE -->\n    <div class=\"col-lg-4 col-md-12 mb-3 text-center\">\n      <div class=\"card preview-card p-3 shadow\">\n        <img\n          *ngIf=\"image?.imageUrl\"\n          [src]=\"api.imageUrl(image.imageUrl)\"\n          class=\"preview-img\"\n          style=\"border: 5px solid red\"\n        />\n      </div>\n    </div>\n\n    <!-- IMAGE DETAILS -->\n    <div class=\"col-lg-5 col-md-12 mb-3\">\n      <div class=\"card preview-card p-4 shadow\">\n        <div class=\"description-bar\">DESCRIPTION</div>\n\n        <p class=\"description-text\">\n          {{ image.description }}\n        </p>\n\n        <h2 class=\"image-title\">\n          {{ image.name }}\n        </h2>\n\n        <div class=\"info-box mt-3\">\n          <p><b>Category:</b> {{ image.categoryName }}</p>\n\n          <p><b>Code:</b> {{ image.imageCode }}</p>\n\n          <p><b>ID:</b> {{ image.id }}</p>\n\n          <h4 class=\"price-text\">Cost: ₹{{ image.cost }}</h4>\n        </div>\n      </div>\n    </div>\n\n    <!-- CONTACT + QR -->\n    <div class=\"col-lg-3 col-md-12 mb-3\">\n      <div class=\"card contact-card p-4 shadow\">\n        <div class=\"contact-bar\">CONTACT DETAILS</div>\n\n        <p>\n          <b>WhatsApp:</b><br />\n          9441449636\n        </p>\n\n        <p>\n          <b>Email:</b><br />\n          admin@asprineminds.com\n        </p>\n\n        <p>\n          <b>Location:</b><br />\n          Andhra Pradesh, India\n        </p>\n\n        <h5 class=\"mt-3\">QR Payment</h5>\n\n        <div class=\"qr-box\">QR</div>\n\n        <p class=\"small mt-2 text-muted\">Send payment screenshot to WhatsApp</p>\n      </div>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/admin.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/admin.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"admin-box\">\n  <h3>Admin Dashboard</h3>\n\n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <h5>Add Category</h5>\n\n      <input\n        class=\"form-control my-2\"\n        placeholder=\"Category\"\n        [(ngModel)]=\"catName\"\n      />\n\n      <textarea\n        class=\"form-control my-2\"\n        placeholder=\"Description\"\n        [(ngModel)]=\"catDesc\"\n      ></textarea>\n\n      <button class=\"btn btn-success\" (click)=\"addCat()\">\n        Save Category\n      </button>\n    </div>\n\n    <div class=\"col-md-8\">\n      <h5>Upload Image</h5>\n\n      <input\n        class=\"form-control my-2\"\n        placeholder=\"Image name\"\n        [(ngModel)]=\"name\"\n      />\n      <div class=\"text-danger\" *ngIf=\"nameError\">\n        {{ nameError }}\n      </div>\n\n      \n\n      <textarea\n        class=\"form-control my-2\"\n        placeholder=\"Description\"\n        [(ngModel)]=\"desc\"\n      ></textarea>\n      <div class=\"text-danger\" *ngIf=\"descError\">\n        {{ descError }}\n      </div>\n\n      <input\n        class=\"form-control my-2\"\n        type=\"number\" min=\"0\"\n        placeholder=\"Image Cost\"\n        [(ngModel)]=\"cost\"\n      />\n      <div class=\"text-danger\">{{ costError }}</div>\n      <select class=\"form-control my-2\" [(ngModel)]=\"categoryId\">\n        <option value=\"\">Select Category</option>\n        <option *ngFor=\"let c of categories\" [value]=\"c.id\">\n          {{ c.name }}\n        </option>\n      </select>\n      <div class=\"text-danger\" *ngIf=\"categoryError\">\n        {{ categoryError }}\n      </div>\n\n      <input\n        class=\"form-control my-2\"\n        type=\"file\"\n        (change)=\"file($event)\"\n      />\n      <div class=\"text-danger\" *ngIf=\"fileError\">\n        {{ fileError }}\n      </div>\n\n      <button class=\"btn btn-primary mt-2\" (click)=\"upload()\">\n        Upload\n      </button>\n\n      <div class=\"text-success mt-2\" *ngIf=\"successMessage\">\n        {{ successMessage }}\n      </div>\n    </div>\n  </div>\n</div>\n\n<h4 class=\"mt-4\">Manage Images</h4>\n\n<table class=\"table bg-white\">\n  <tr>\n    <th>Image</th>\n    <th>Name</th>\n    <th>Code</th>\n    <th>Cost</th>\n    <th>Category</th>\n    <th>Action</th>\n  </tr>\n\n  <tr *ngFor=\"let i of images\">\n    <td>\n      <img [src]=\"api.imageUrl(i.imageUrl)\" width=\"80\" />\n    </td>\n    <td>{{ i.name }}</td>\n    <td>{{ i.imageCode }}</td>\n    <td>₹{{ i.cost }}</td>\n    <td>{{ i.categoryName }}</td>\n    <td>\n      <button class=\"btn btn-sm btn-danger\" (click)=\"del(i.id)\">\n        Delete\n      </button>\n    </td>\n  </tr>\n</table>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/cart.component.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/cart.component.html ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h3>My Cart</h3>\n    <div class=\"row\">\n      <div class=\"col-md-4 mb-3\" *ngFor=\"let item of items\">\n        <div class=\"card p-3\">\n          <img class=\"gallery-img\" [src]=\"api.imageUrl(item.image.imageUrl)\" />\n          <h5>{{ item.image.name }}</h5>\n          <button class=\"btn btn-danger\" (click)=\"remove(item.image.id)\">\n            Remove\n          </button>\n        </div>\n      </div>\n    </div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/gallery.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/gallery.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"top-banner\">\n  <div class=\"row align-items-center\">\n\n    <!-- LOGO -->\n    <div class=\"col-lg-3 col-md-12 text-center text-lg-left\">\n\n      <div class=\"logo-box\">\n        <img\n          src=\"assets/images/logo.png\"\n          class=\"main-logo\"\n        />\n      </div>\n\n    </div>\n\n    <!-- COUNTRY TIMES -->\n    <div class=\"col-lg-7 col-md-12\">\n\n      <div class=\"country-time-row\">\n\n        <div class=\"time-box\">\n          <h5>INDIA</h5>\n          <p>{{ indiaTime }}</p>\n          <small>Live & Date</small>\n        </div>\n\n        <div class=\"time-box\">\n          <h5>USA</h5>\n          <p>{{ usaTime }}</p>\n          <small>Live & Date</small>\n        </div>\n\n        <div class=\"time-box\">\n          <h5>UK</h5>\n          <p>{{ ukTime }}</p>\n          <small>Live & Date</small>\n        </div>\n\n        <div class=\"time-box\">\n          <h5>AUSTRALIA</h5>\n          <p>{{ australiaTime }}</p>\n          <small>Live & Date</small>\n        </div>\n\n        <div class=\"time-box\">\n          <h5>KSA</h5>\n          <p>{{ ksaTime }}</p>\n          <small>Live & Date</small>\n        </div>\n\n      </div>\n\n    </div>\n\n    <!-- LOGIN -->\n    <div class=\"col-lg-2 col-md-12 text-center\">\n\n      <button\n        class=\"login-glow-btn\"\n        routerLink=\"/login\"\n      >\n        LOGIN\n      </button>\n\n    </div>\n\n  </div>\n</div>\n\n<!-- MENU -->\n<div class=\"menu-bar mb-4\">\n\n  <button routerLink=\"/\">HOME</button>\n  <button>PRODUCT</button>\n  <button>CERTIFICATES</button>\n  <button>EVENTS</button>\n  <button>MEDIA</button>\n  <button>NEWS</button>\n  <button>DOWNLOADS</button>\n  <button>GALLERY</button>\n  <button>CONTACT</button>\n\n</div>\n\n<div class=\"container-fluid\">\n\n  <div class=\"row\">\n\n    <!-- LEFT -->\n    <div class=\"col-lg-2 col-md-3 mb-3\">\n\n      <div class=\"sidebar-box\">\n\n        <h5>ALL DESIGNS</h5>\n\n        <button\n          class=\"btn btn-outline-primary btn-block mb-2\"\n          (click)=\"load()\"\n        >\n          All Images\n        </button>\n\n        <button\n          class=\"btn btn-outline-secondary btn-block mb-2\"\n          *ngFor=\"let c of categories\"\n          (click)=\"cat(c.id)\"\n        >\n          {{ c.name }}\n        </button>\n\n        <button\n          class=\"btn btn-outline-secondary btn-block mb-2\"\n          routerLink=\"/login\"\n        >\n          Login User\n        </button>\n\n        <button\n          class=\"btn btn-outline-secondary btn-block mb-2\"\n          routerLink=\"/admin\"\n        >\n          Admin\n        </button>\n\n      </div>\n\n    </div>\n\n    <!-- CENTER -->\n    <div class=\"col-lg-8 col-md-9\">\n\n      <div class=\"search-premium mb-4\">\n\n        <input\n          class=\"form-control search-input\"\n          placeholder=\"Search Premium Designs...\"\n          [(ngModel)]=\"keyword\"\n          (input)=\"search()\"\n        />\n\n        <button\n          class=\"btn btn-warning search-btn\"\n          (click)=\"search()\"\n        >\n          Search\n        </button>\n\n      </div>\n\n      <div class=\"image-panel\">\n\n        <div class=\"row\">\n\n          <div\n            class=\"col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-4\"\n            *ngFor=\"let img of images\"\n          >\n\n            <div class=\"card image-card h-100 shadow-sm\">\n\n              <img\n                class=\"gallery-img img-fluid\"\n                [src]=\"\n                  img?.imageUrl\n                    ? api.imageUrl(img.imageUrl)\n                    : 'assets/images/logo.png'\n                \"\n              />\n\n              <div class=\"card-body p-2 text-center\">\n\n                <h5 class=\"image-name\">\n                  {{ img?.name || \"Image Name\" }}\n                </h5>\n\n                <p class=\"image-code\">\n                  <b>Code:</b>\n                  {{ img?.imageCode || \"Not Generated\" }}\n                </p>\n\n                <p class=\"price-text\">\n                  Cost: ₹{{ img?.cost || 0 }}\n                </p>\n\n                <button\n                  class=\"btn view-btn btn-sm btn-block mt-2\"\n                  (click)=\"viewImage(img.imageCode)\"\n                  *ngIf=\"img?.imageCode\"\n                >\n                  Preview\n                </button>\n\n                <button\n                  class=\"btn btn-primary btn-sm btn-block mt-2\"\n                  *ngIf=\"auth.loggedIn() && img?.id\"\n                  (click)=\"add(img.id)\"\n                >\n                  Add to Cart\n                </button>\n\n              </div>\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <!-- RIGHT -->\n    <div class=\"col-lg-2 d-none d-lg-block\">\n\n      <div class=\"payment-box\">\n\n        <h5>QR PAYMENT</h5>\n\n        <div class=\"qr-box\">\n          QR\n        </div>\n\n        <p class=\"small mt-2\">\n          Scan & Pay Instantly\n        </p>\n\n        <h5 class=\"whatsapp-title\">\n          Whatsapp:\n        </h5>\n\n        <h4 class=\"whatsapp-no\">\n          9441449636\n        </h4>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</div>\n\n<div class=\"secure-footer mt-4\">\n  <span class=\"secure-bold\">We 100% Secure,</span>\n  <span>\n    send the item code and payment screenshot to whatsapp, we will transfer file to same whatsapp.\n  </span>\n</div>\n\n<div class=\"main-footer\">\n  <div>\n    Support: admin@asprineminds.com / Cell: +91 929149596 / Andhra Pradesh, INDIA\n  </div>\n  <div>\n    All Rights reserved by Asprine Minds\n  </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row justify-content-center\">\n    <div class=\"col-md-5\">\n      <div class=\"card p-4\">\n        <h3>Login</h3>\n        <input\n          class=\"form-control my-2\"\n          placeholder=\"Email\"\n          [(ngModel)]=\"email\"\n        /><input\n          class=\"form-control my-2\"\n          type=\"password\"\n          placeholder=\"Password\"\n          [(ngModel)]=\"password\"\n        /><button class=\"btn btn-primary btn-block\" (click)=\"login()\">\n          Login\n        </button>\n        <p class=\"text-danger mt-2\">{{ err }}</p>\n        <small>Admin: admin@gallery.com / admin123</small>\n        <a routerLink=\"/forgot-password\">Forgot Password?</a>\n      </div>\n    </div>\n  </div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/register.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/register.component.html ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"row justify-content-center\"><div class=\"col-md-5\"><div class=\"card p-4\"><h3>Register</h3><input class=\"form-control my-2\" placeholder=\"Username\" [(ngModel)]=\"username\"><input class=\"form-control my-2\" placeholder=\"Email\" [(ngModel)]=\"email\"><input class=\"form-control my-2\" type=\"password\" placeholder=\"Password\" [(ngModel)]=\"password\"><button class=\"btn btn-success btn-block\" (click)=\"register()\">Create Account</button><p class=\"text-danger mt-2\">{{err}}</p></div></div></div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/reset-password/reset-password.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/reset-password/reset-password.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container mt-5\" style=\"max-width: 450px;\">\n  <h3>Reset Password</h3>\n\n  <input\n    class=\"form-control my-3\"\n    type=\"text\"\n    placeholder=\"Enter reset token\"\n    [(ngModel)]=\"token\"\n  />\n\n  <input\n    class=\"form-control my-3\"\n    type=\"password\"\n    placeholder=\"Enter new password\"\n    [(ngModel)]=\"newPassword\"\n  />\n\n  <button class=\"btn btn-success w-100\" (click)=\"submit()\">\n    Reset Password\n  </button>\n\n  <div class=\"text-danger mt-3\" *ngIf=\"message\">\n    {{ message }}\n  </div>\n\n  <a routerLink=\"/login\">Back to Login</a>\n</div>");

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("html,\r\nbody {\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  min-height: 100%;\r\n  font-family: Arial, Helvetica, sans-serif;\r\n  background: #071250;\r\n}\r\n\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* NAVBAR */\r\n\r\n.custom-navbar {\r\n  width: calc(100% - 30px);\r\n\r\n  margin: 15px auto 0;\r\n\r\n  padding: 10px 18px;\r\n\r\n  background:\r\n    linear-gradient(\r\n      90deg,\r\n      #020733,\r\n      #061b68,\r\n      #21002d\r\n    );\r\n\r\n  border: 2px solid #ff7600;\r\n\r\n  border-radius: 22px;\r\n\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n\r\n  box-shadow:\r\n    0 0 14px #00d9ff,\r\n    0 0 22px rgba(255, 85, 0, 0.7);\r\n}\r\n\r\n/* BRAND */\r\n\r\n.brand {\r\n  display: flex;\r\n  align-items: center;\r\n\r\n  text-decoration: none;\r\n\r\n  flex-shrink: 0;\r\n}\r\n\r\n.top-logo {\r\n  width: 45px;\r\n  height: 45px;\r\n\r\n  -o-object-fit: contain;\r\n\r\n     object-fit: contain;\r\n\r\n  border-radius: 50%;\r\n\r\n  -webkit-filter:\r\n    drop-shadow(0 0 8px #00eaff);\r\n\r\n          filter:\r\n    drop-shadow(0 0 8px #00eaff);\r\n}\r\n\r\n.brand-text {\r\n  margin-left: 10px;\r\n\r\n  color: #ffd84d;\r\n\r\n  font-size: 24px;\r\n  font-weight: 900;\r\n\r\n  white-space: nowrap;\r\n\r\n  text-shadow:\r\n    0 0 5px #ff7a00,\r\n    1px 1px 0 #7a0000;\r\n}\r\n\r\n/* RIGHT MENU */\r\n\r\n.menu {\r\n  margin-left: auto;\r\n\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: flex-end;\r\n\r\n  gap: 12px;\r\n\r\n  padding-right: 10px;\r\n\r\n  flex-wrap: wrap;\r\n}\r\n\r\n/* MENU LINKS */\r\n\r\n.menu a {\r\n  text-decoration: none;\r\n\r\n  color: white;\r\n\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n\r\n  padding: 8px 14px;\r\n\r\n  border-radius: 20px;\r\n\r\n  background:\r\n    linear-gradient(\r\n      180deg,\r\n      rgba(255,255,255,0.18),\r\n      rgba(255,255,255,0.05)\r\n    );\r\n\r\n  border: 1px solid rgba(255,255,255,0.15);\r\n\r\n  box-shadow:\r\n    0 0 10px rgba(0,217,255,0.18);\r\n\r\n  transition: 0.3s;\r\n\r\n  white-space: nowrap;\r\n}\r\n\r\n/* HOVER */\r\n\r\n.menu a:hover {\r\n  color: #ffd84d;\r\n\r\n  background:\r\n    linear-gradient(\r\n      180deg,\r\n      rgba(0,217,255,0.30),\r\n      rgba(255,120,0,0.18)\r\n    );\r\n\r\n  transform: translateY(-2px);\r\n\r\n  box-shadow:\r\n    0 0 12px #00d9ff,\r\n    0 0 18px rgba(255,120,0,0.4);\r\n}\r\n\r\n/* ACTIVE */\r\n\r\n.menu a.active,\r\n.menu a:focus {\r\n  color: #111;\r\n\r\n  background:\r\n    linear-gradient(\r\n      180deg,\r\n      #ffffff,\r\n      #dfeeff\r\n    );\r\n\r\n  box-shadow:\r\n    0 0 14px #00d9ff;\r\n}\r\n\r\n/* CONTENT */\r\n\r\n.container {\r\n  max-width: 100% !important;\r\n\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n}\r\n\r\n/* TABLET */\r\n\r\n@media (max-width: 992px) {\r\n\r\n  .custom-navbar {\r\n    padding: 10px 14px;\r\n  }\r\n\r\n  .brand-text {\r\n    font-size: 21px;\r\n  }\r\n\r\n  .menu {\r\n    gap: 8px;\r\n  }\r\n\r\n  .menu a {\r\n    font-size: 13px;\r\n    padding: 7px 11px;\r\n  }\r\n}\r\n\r\n/* MOBILE */\r\n\r\n@media (max-width: 768px) {\r\n\r\n  .custom-navbar {\r\n    flex-direction: column;\r\n\r\n    justify-content: center;\r\n\r\n    gap: 10px;\r\n  }\r\n\r\n  .brand {\r\n    justify-content: center;\r\n  }\r\n\r\n  .brand-text {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .top-logo {\r\n    width: 38px;\r\n    height: 38px;\r\n  }\r\n\r\n  .menu {\r\n    width: 100%;\r\n\r\n    justify-content: center;\r\n\r\n    margin-left: 0;\r\n\r\n    gap: 8px;\r\n\r\n    padding-right: 0;\r\n  }\r\n\r\n  .menu a {\r\n    font-size: 13px;\r\n\r\n    padding: 7px 10px;\r\n  }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsU0FBUztFQUNULFVBQVU7RUFDVixXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLHlDQUF5QztFQUN6QyxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUEsV0FBVzs7QUFDWDtFQUNFLHdCQUF3Qjs7RUFFeEIsbUJBQW1COztFQUVuQixrQkFBa0I7O0VBRWxCOzs7Ozs7S0FDc0Y7O0VBRXRGLHlCQUF5Qjs7RUFFekIsbUJBQW1COztFQUVuQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4Qjs7RUFFOUI7O2tDQUVnQztBQUNsQzs7QUFFQSxVQUFVOztBQUNWO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjs7RUFFbkIscUJBQXFCOztFQUVyQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7O0VBRVosc0JBQW1COztLQUFuQixtQkFBbUI7O0VBRW5CLGtCQUFrQjs7RUFFbEI7Z0NBQzhCOztVQUQ5QjtnQ0FDOEI7QUFDaEM7O0FBRUE7RUFDRSxpQkFBaUI7O0VBRWpCLGNBQWM7O0VBRWQsZUFBZTtFQUNmLGdCQUFnQjs7RUFFaEIsbUJBQW1COztFQUVuQjs7cUJBRW1CO0FBQ3JCOztBQUVBLGVBQWU7O0FBQ2Y7RUFDRSxpQkFBaUI7O0VBRWpCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIseUJBQXlCOztFQUV6QixTQUFTOztFQUVULG1CQUFtQjs7RUFFbkIsZUFBZTtBQUNqQjs7QUFFQSxlQUFlOztBQUNmO0VBQ0UscUJBQXFCOztFQUVyQixZQUFZOztFQUVaLGVBQWU7RUFDZixnQkFBZ0I7O0VBRWhCLGlCQUFpQjs7RUFFakIsbUJBQW1COztFQUVuQjs7Ozs7S0FLRzs7RUFFSCx3Q0FBd0M7O0VBRXhDO2lDQUMrQjs7RUFFL0IsZ0JBQWdCOztFQUVoQixtQkFBbUI7QUFDckI7O0FBRUEsVUFBVTs7QUFDVjtFQUNFLGNBQWM7O0VBRWQ7Ozs7O0tBS0c7O0VBRUgsMkJBQTJCOztFQUUzQjs7Z0NBRThCO0FBQ2hDOztBQUVBLFdBQVc7O0FBQ1g7O0VBRUUsV0FBVzs7RUFFWDs7Ozs7S0FDdUU7O0VBRXZFO29CQUNrQjtBQUNwQjs7QUFFQSxZQUFZOztBQUNaO0VBQ0UsMEJBQTBCOztFQUUxQixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBLFdBQVc7O0FBQ1g7O0VBRUU7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsUUFBUTtFQUNWOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGlCQUFpQjtFQUNuQjtBQUNGOztBQUVBLFdBQVc7O0FBQ1g7O0VBRUU7SUFDRSxzQkFBc0I7O0lBRXRCLHVCQUF1Qjs7SUFFdkIsU0FBUztFQUNYOztFQUVBO0lBQ0UsdUJBQXVCO0VBQ3pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLFdBQVc7SUFDWCxZQUFZO0VBQ2Q7O0VBRUE7SUFDRSxXQUFXOztJQUVYLHVCQUF1Qjs7SUFFdkIsY0FBYzs7SUFFZCxRQUFROztJQUVSLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLGVBQWU7O0lBRWYsaUJBQWlCO0VBQ25CO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImh0bWwsXHJcbmJvZHkge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XHJcbiAgYmFja2dyb3VuZDogIzA3MTI1MDtcclxufVxyXG5cclxuKiB7XHJcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLyogTkFWQkFSICovXHJcbi5jdXN0b20tbmF2YmFyIHtcclxuICB3aWR0aDogY2FsYygxMDAlIC0gMzBweCk7XHJcblxyXG4gIG1hcmdpbjogMTVweCBhdXRvIDA7XHJcblxyXG4gIHBhZGRpbmc6IDEwcHggMThweDtcclxuXHJcbiAgYmFja2dyb3VuZDpcclxuICAgIGxpbmVhci1ncmFkaWVudChcclxuICAgICAgOTBkZWcsXHJcbiAgICAgICMwMjA3MzMsXHJcbiAgICAgICMwNjFiNjgsXHJcbiAgICAgICMyMTAwMmRcclxuICAgICk7XHJcblxyXG4gIGJvcmRlcjogMnB4IHNvbGlkICNmZjc2MDA7XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XHJcblxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblxyXG4gIGJveC1zaGFkb3c6XHJcbiAgICAwIDAgMTRweCAjMDBkOWZmLFxyXG4gICAgMCAwIDIycHggcmdiYSgyNTUsIDg1LCAwLCAwLjcpO1xyXG59XHJcblxyXG4vKiBCUkFORCAqL1xyXG4uYnJhbmQge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cclxuICBmbGV4LXNocmluazogMDtcclxufVxyXG5cclxuLnRvcC1sb2dvIHtcclxuICB3aWR0aDogNDVweDtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcblxyXG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XHJcblxyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuXHJcbiAgZmlsdGVyOlxyXG4gICAgZHJvcC1zaGFkb3coMCAwIDhweCAjMDBlYWZmKTtcclxufVxyXG5cclxuLmJyYW5kLXRleHQge1xyXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG5cclxuICBjb2xvcjogI2ZmZDg0ZDtcclxuXHJcbiAgZm9udC1zaXplOiAyNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XHJcblxyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcblxyXG4gIHRleHQtc2hhZG93OlxyXG4gICAgMCAwIDVweCAjZmY3YTAwLFxyXG4gICAgMXB4IDFweCAwICM3YTAwMDA7XHJcbn1cclxuXHJcbi8qIFJJR0hUIE1FTlUgKi9cclxuLm1lbnUge1xyXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuXHJcbiAgZ2FwOiAxMnB4O1xyXG5cclxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG5cclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbn1cclxuXHJcbi8qIE1FTlUgTElOS1MgKi9cclxuLm1lbnUgYSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cclxuICBjb2xvcjogd2hpdGU7XHJcblxyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG5cclxuICBwYWRkaW5nOiA4cHggMTRweDtcclxuXHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuXHJcbiAgYmFja2dyb3VuZDpcclxuICAgIGxpbmVhci1ncmFkaWVudChcclxuICAgICAgMTgwZGVnLFxyXG4gICAgICByZ2JhKDI1NSwyNTUsMjU1LDAuMTgpLFxyXG4gICAgICByZ2JhKDI1NSwyNTUsMjU1LDAuMDUpXHJcbiAgICApO1xyXG5cclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMTUpO1xyXG5cclxuICBib3gtc2hhZG93OlxyXG4gICAgMCAwIDEwcHggcmdiYSgwLDIxNywyNTUsMC4xOCk7XHJcblxyXG4gIHRyYW5zaXRpb246IDAuM3M7XHJcblxyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbn1cclxuXHJcbi8qIEhPVkVSICovXHJcbi5tZW51IGE6aG92ZXIge1xyXG4gIGNvbG9yOiAjZmZkODRkO1xyXG5cclxuICBiYWNrZ3JvdW5kOlxyXG4gICAgbGluZWFyLWdyYWRpZW50KFxyXG4gICAgICAxODBkZWcsXHJcbiAgICAgIHJnYmEoMCwyMTcsMjU1LDAuMzApLFxyXG4gICAgICByZ2JhKDI1NSwxMjAsMCwwLjE4KVxyXG4gICAgKTtcclxuXHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xyXG5cclxuICBib3gtc2hhZG93OlxyXG4gICAgMCAwIDEycHggIzAwZDlmZixcclxuICAgIDAgMCAxOHB4IHJnYmEoMjU1LDEyMCwwLDAuNCk7XHJcbn1cclxuXHJcbi8qIEFDVElWRSAqL1xyXG4ubWVudSBhLmFjdGl2ZSxcclxuLm1lbnUgYTpmb2N1cyB7XHJcbiAgY29sb3I6ICMxMTE7XHJcblxyXG4gIGJhY2tncm91bmQ6XHJcbiAgICBsaW5lYXItZ3JhZGllbnQoXHJcbiAgICAgIDE4MGRlZyxcclxuICAgICAgI2ZmZmZmZixcclxuICAgICAgI2RmZWVmZlxyXG4gICAgKTtcclxuXHJcbiAgYm94LXNoYWRvdzpcclxuICAgIDAgMCAxNHB4ICMwMGQ5ZmY7XHJcbn1cclxuXHJcbi8qIENPTlRFTlQgKi9cclxuLmNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XHJcblxyXG4gIHBhZGRpbmctbGVmdDogMTVweDtcclxuICBwYWRkaW5nLXJpZ2h0OiAxNXB4O1xyXG59XHJcblxyXG4vKiBUQUJMRVQgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDk5MnB4KSB7XHJcblxyXG4gIC5jdXN0b20tbmF2YmFyIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMTRweDtcclxuICB9XHJcblxyXG4gIC5icmFuZC10ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMjFweDtcclxuICB9XHJcblxyXG4gIC5tZW51IHtcclxuICAgIGdhcDogOHB4O1xyXG4gIH1cclxuXHJcbiAgLm1lbnUgYSB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBwYWRkaW5nOiA3cHggMTFweDtcclxuICB9XHJcbn1cclxuXHJcbi8qIE1PQklMRSAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuXHJcbiAgLmN1c3RvbS1uYXZiYXIge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICBnYXA6IDEwcHg7XHJcbiAgfVxyXG5cclxuICAuYnJhbmQge1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICAuYnJhbmQtdGV4dCB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgfVxyXG5cclxuICAudG9wLWxvZ28ge1xyXG4gICAgd2lkdGg6IDM4cHg7XHJcbiAgICBoZWlnaHQ6IDM4cHg7XHJcbiAgfVxyXG5cclxuICAubWVudSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuXHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICBtYXJnaW4tbGVmdDogMDtcclxuXHJcbiAgICBnYXA6IDhweDtcclxuXHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG4gIH1cclxuXHJcbiAgLm1lbnUgYSB7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcblxyXG4gICAgcGFkZGluZzogN3B4IDEwcHg7XHJcbiAgfVxyXG59Il19 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var AppComponent = /** @class */ (function () {
    function AppComponent(auth) {
        this.auth = auth;
    }
    AppComponent.ctorParameters = function () { return [
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }
    ]; };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-root",
            template: __importDefault(__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pages_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/login.component */ "./src/app/pages/login.component.ts");
/* harmony import */ var _pages_register_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/register.component */ "./src/app/pages/register.component.ts");
/* harmony import */ var _pages_gallery_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/gallery.component */ "./src/app/pages/gallery.component.ts");
/* harmony import */ var _pages_cart_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/cart.component */ "./src/app/pages/cart.component.ts");
/* harmony import */ var _pages_admin_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/admin.component */ "./src/app/pages/admin.component.ts");
/* harmony import */ var _image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./image-preview/image-preview.component */ "./src/app/image-preview/image-preview.component.ts");
/* harmony import */ var _services_auth_interceptor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/auth.interceptor */ "./src/app/services/auth.interceptor.ts");
/* harmony import */ var _services_auth_guard__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/auth.guard */ "./src/app/services/auth.guard.ts");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/forgot-password/forgot-password.component.ts");
/* harmony import */ var _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./reset-password/reset-password.component */ "./src/app/reset-password/reset-password.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
















var routes = [
    { path: "", component: _pages_gallery_component__WEBPACK_IMPORTED_MODULE_8__["GalleryComponent"] },
    { path: "login", component: _pages_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"] },
    { path: "register", component: _pages_register_component__WEBPACK_IMPORTED_MODULE_7__["RegisterComponent"] },
    { path: "cart", component: _pages_cart_component__WEBPACK_IMPORTED_MODULE_9__["CartComponent"], canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_13__["AuthGuard"]] },
    { path: "admin", component: _pages_admin_component__WEBPACK_IMPORTED_MODULE_10__["AdminComponent"], canActivate: [_services_auth_guard__WEBPACK_IMPORTED_MODULE_13__["AuthGuard"]] },
    { path: "image-preview/:id", component: _image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_11__["ImagePreviewComponent"] },
    { path: 'forgot-password', component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_14__["ForgotPasswordComponent"] },
    { path: 'reset-password', component: _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_15__["ResetPasswordComponent"] },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _pages_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                _pages_register_component__WEBPACK_IMPORTED_MODULE_7__["RegisterComponent"],
                _pages_gallery_component__WEBPACK_IMPORTED_MODULE_8__["GalleryComponent"],
                _pages_cart_component__WEBPACK_IMPORTED_MODULE_9__["CartComponent"],
                _pages_admin_component__WEBPACK_IMPORTED_MODULE_10__["AdminComponent"],
                _image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_11__["ImagePreviewComponent"],
                _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_14__["ForgotPasswordComponent"],
                _reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_15__["ResetPasswordComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forRoot(routes),
            ],
            providers: [
                _services_auth_guard__WEBPACK_IMPORTED_MODULE_13__["AuthGuard"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HTTP_INTERCEPTORS"], useClass: _services_auth_interceptor__WEBPACK_IMPORTED_MODULE_12__["AuthInterceptor"], multi: true },
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/forgot-password/forgot-password.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/forgot-password/forgot-password.component.ts ***!
  \**************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(api) {
        this.api = api;
        this.email = '';
        this.message = '';
        this.errorMessage = '';
        this.token = '';
    }
    ForgotPasswordComponent.prototype.submit = function () {
        var _this = this;
        this.message = '';
        this.errorMessage = '';
        this.token = '';
        if (!this.email || this.email.trim() === '') {
            this.errorMessage = 'Email is required';
            return;
        }
        this.api.forgotPassword(this.email).subscribe(function (res) {
            _this.message = res.message;
            _this.token = res.token;
            _this.email = '';
        }, function (err) {
            _this.errorMessage = err.error.message || 'Email not found';
        });
    };
    ForgotPasswordComponent.ctorParameters = function () { return [
        { type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"] }
    ]; };
    ForgotPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./forgot-password.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/forgot-password/forgot-password.component.html")).default
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());



/***/ }),

/***/ "./src/app/image-preview/image-preview.component.css":
/*!***********************************************************!*\
  !*** ./src/app/image-preview/image-preview.component.css ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".top-action-bar {\n      display: flex;\n      align-items: center;\n      gap: 15px;\n      flex-wrap: wrap;\n    }\n\n    .back-btn {\n      border-radius: 25px;\n      font-weight: bold;\n      padding: 8px 22px;\n    }\n\n    .category-top-bar {\n      display: flex;\n      align-items: center;\n      border-radius: 30px;\n      overflow: hidden;\n      box-shadow: 0 0 12px #00c8ff66;\n    }\n\n    .category-label {\n      background: #0052cc;\n      color: white;\n      padding: 9px 18px;\n      font-weight: bold;\n      letter-spacing: 1px;\n    }\n\n    .category-value {\n      background: linear-gradient(90deg, #00b7ff, #00e0ff);\n      color: #002244;\n      padding: 9px 22px;\n      font-weight: bold;\n    }\n\n    .preview-card {\n      border-radius: 20px;\n      border: none;\n      background: linear-gradient(135deg, #ffffff, #f3f6ff);\n      box-shadow: 0 0 20px #00c8ff33;\n    }\n\n    .preview-img {\n      width: 100%;\n      max-width: 420px;\n      height: 340px;\n      -o-object-fit: contain;\n         object-fit: contain;\n      border-radius: 16px;\n      border: 3px solid #00c8ff;\n      padding: 10px;\n      background: #fff;\n      box-shadow: 0 0 18px #00c8ff44;\n    }\n\n    .description-bar {\n      background: linear-gradient(90deg, #0052cc, #00b7ff);\n      color: white;\n      padding: 12px 22px;\n      border-radius: 30px;\n      font-weight: bold;\n      font-size: 16px;\n      letter-spacing: 1px;\n      display: inline-block;\n      margin-bottom: 15px;\n      box-shadow: 0 0 12px #00c8ff55;\n    }\n\n    .description-text {\n      font-size: 17px;\n      line-height: 1.8;\n      color: #444;\n      margin-bottom: 25px;\n    }\n\n    .image-title {\n      font-size: 34px;\n      font-weight: bold;\n      color: #111;\n      margin-bottom: 20px;\n    }\n\n    .info-box {\n      background: #f8f9ff;\n      border-radius: 16px;\n      padding: 18px;\n      box-shadow: 0 0 12px rgba(0,0,0,0.08);\n    }\n\n    .info-box p {\n      font-size: 16px;\n      margin-bottom: 12px;\n    }\n\n    .price-text {\n      color: #009933;\n      font-weight: bold;\n      font-size: 28px;\n      margin-top: 10px;\n    }\n\n    @media (max-width: 768px) {\n      .preview-img {\n        height: 260px;\n        margin-bottom: 20px;\n      }\n\n      .image-title {\n        font-size: 28px;\n      }\n\n      .top-action-bar {\n        align-items: stretch;\n      }\n\n      .category-top-bar {\n        width: 100%;\n      }\n\n      .category-value {\n        flex: 1;\n      }\n    }\n\n    .top-action-bar {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  flex-wrap: wrap;\n}\n\n    .back-btn {\n  border-radius: 25px;\n  font-weight: bold;\n  padding: 8px 22px;\n}\n\n    .category-top-bar {\n  display: flex;\n  border-radius: 30px;\n  overflow: hidden;\n  box-shadow: 0 0 12px #00c8ff66;\n}\n\n    .category-label {\n  background: #0052cc;\n  color: white;\n  padding: 9px 18px;\n  font-weight: bold;\n}\n\n    .category-value {\n  background: linear-gradient(90deg, #00b7ff, #00e0ff);\n  color: #002244;\n  padding: 9px 22px;\n  font-weight: bold;\n}\n\n    .preview-card,\n.contact-card {\n  border-radius: 20px;\n  border: none;\n  background: linear-gradient(135deg, #ffffff, #f3f6ff);\n}\n\n    .preview-img {\n  width: 100%;\n  max-width: 420px;\n  height: 340px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  border-radius: 16px;\n  border: 3px solid #00c8ff;\n  padding: 10px;\n  background: white;\n}\n\n    .description-bar {\n  background: linear-gradient(90deg, #0052cc, #00b7ff);\n  color: white;\n  padding: 12px 22px;\n  border-radius: 30px;\n  font-weight: bold;\n  display: inline-block;\n  margin-bottom: 15px;\n}\n\n    .description-text {\n  font-size: 17px;\n  line-height: 1.8;\n  color: #444;\n}\n\n    .image-title {\n  font-size: 34px;\n  font-weight: bold;\n  color: #111;\n}\n\n    .info-box {\n  background: #f8f9ff;\n  border-radius: 16px;\n  padding: 18px;\n}\n\n    .price-text {\n  color: green;\n  font-weight: bold;\n}\n\n    .contact-bar {\n  background: linear-gradient(90deg, #0052cc, #00b7ff);\n\n  color: white;\n\n  padding: 12px 22px;\n\n  border-radius: 30px;\n\n  font-weight: bold;\n\n  font-size: 16px;\n\n  letter-spacing: 1px;\n\n  display: inline-block;\n\n  margin-bottom: 15px;\n\n  box-shadow: 0 0 12px #00c8ff55;\n}\n\n    .qr-box {\n  height: 180px;\n  border: 2px dashed #333;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 32px;\n  font-weight: bold;\n  background: #f8f9fa;\n}\n\n    @media (max-width: 768px) {\n  .preview-img {\n    height: 260px;\n  }\n\n  .image-title {\n    font-size: 28px;\n  }\n\n  .category-top-bar {\n    width: 100%;\n  }\n\n  .category-value {\n    flex: 1;\n  }\n\n  .preview-img {\n  display: block;\n  width: 100%;\n  max-width: 420px;\n  height: 340px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  background: white;\n  border: 3px solid red;\n}\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaW1hZ2UtcHJldmlldy9pbWFnZS1wcmV2aWV3LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7TUFDTSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLFNBQVM7TUFDVCxlQUFlO0lBQ2pCOztJQUVBO01BQ0UsbUJBQW1CO01BQ25CLGlCQUFpQjtNQUNqQixpQkFBaUI7SUFDbkI7O0lBRUE7TUFDRSxhQUFhO01BQ2IsbUJBQW1CO01BQ25CLG1CQUFtQjtNQUNuQixnQkFBZ0I7TUFDaEIsOEJBQThCO0lBQ2hDOztJQUVBO01BQ0UsbUJBQW1CO01BQ25CLFlBQVk7TUFDWixpQkFBaUI7TUFDakIsaUJBQWlCO01BQ2pCLG1CQUFtQjtJQUNyQjs7SUFFQTtNQUNFLG9EQUFvRDtNQUNwRCxjQUFjO01BQ2QsaUJBQWlCO01BQ2pCLGlCQUFpQjtJQUNuQjs7SUFFQTtNQUNFLG1CQUFtQjtNQUNuQixZQUFZO01BQ1oscURBQXFEO01BQ3JELDhCQUE4QjtJQUNoQzs7SUFFQTtNQUNFLFdBQVc7TUFDWCxnQkFBZ0I7TUFDaEIsYUFBYTtNQUNiLHNCQUFtQjtTQUFuQixtQkFBbUI7TUFDbkIsbUJBQW1CO01BQ25CLHlCQUF5QjtNQUN6QixhQUFhO01BQ2IsZ0JBQWdCO01BQ2hCLDhCQUE4QjtJQUNoQzs7SUFFQTtNQUNFLG9EQUFvRDtNQUNwRCxZQUFZO01BQ1osa0JBQWtCO01BQ2xCLG1CQUFtQjtNQUNuQixpQkFBaUI7TUFDakIsZUFBZTtNQUNmLG1CQUFtQjtNQUNuQixxQkFBcUI7TUFDckIsbUJBQW1CO01BQ25CLDhCQUE4QjtJQUNoQzs7SUFFQTtNQUNFLGVBQWU7TUFDZixnQkFBZ0I7TUFDaEIsV0FBVztNQUNYLG1CQUFtQjtJQUNyQjs7SUFFQTtNQUNFLGVBQWU7TUFDZixpQkFBaUI7TUFDakIsV0FBVztNQUNYLG1CQUFtQjtJQUNyQjs7SUFFQTtNQUNFLG1CQUFtQjtNQUNuQixtQkFBbUI7TUFDbkIsYUFBYTtNQUNiLHFDQUFxQztJQUN2Qzs7SUFFQTtNQUNFLGVBQWU7TUFDZixtQkFBbUI7SUFDckI7O0lBRUE7TUFDRSxjQUFjO01BQ2QsaUJBQWlCO01BQ2pCLGVBQWU7TUFDZixnQkFBZ0I7SUFDbEI7O0lBRUE7TUFDRTtRQUNFLGFBQWE7UUFDYixtQkFBbUI7TUFDckI7O01BRUE7UUFDRSxlQUFlO01BQ2pCOztNQUVBO1FBQ0Usb0JBQW9CO01BQ3RCOztNQUVBO1FBQ0UsV0FBVztNQUNiOztNQUVBO1FBQ0UsT0FBTztNQUNUO0lBQ0Y7O0lBQ0o7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxlQUFlO0FBQ2pCOztJQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0lBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQiw4QkFBOEI7QUFDaEM7O0lBRUE7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0lBRUE7RUFDRSxvREFBb0Q7RUFDcEQsY0FBYztFQUNkLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0lBRUE7O0VBRUUsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixxREFBcUQ7QUFDdkQ7O0lBRUE7RUFDRSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBbUI7S0FBbkIsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLGlCQUFpQjtBQUNuQjs7SUFFQTtFQUNFLG9EQUFvRDtFQUNwRCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7SUFFQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVztBQUNiOztJQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixXQUFXO0FBQ2I7O0lBRUE7RUFDRSxtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLGFBQWE7QUFDZjs7SUFFQTtFQUNFLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0lBRUE7RUFDRSxvREFBb0Q7O0VBRXBELFlBQVk7O0VBRVosa0JBQWtCOztFQUVsQixtQkFBbUI7O0VBRW5CLGlCQUFpQjs7RUFFakIsZUFBZTs7RUFFZixtQkFBbUI7O0VBRW5CLHFCQUFxQjs7RUFFckIsbUJBQW1COztFQUVuQiw4QkFBOEI7QUFDaEM7O0lBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7SUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLFdBQVc7RUFDYjs7RUFFQTtJQUNFLE9BQU87RUFDVDs7RUFFQTtFQUNBLGNBQWM7RUFDZCxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBbUI7S0FBbkIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixxQkFBcUI7QUFDdkI7QUFDQSIsImZpbGUiOiJzcmMvYXBwL2ltYWdlLXByZXZpZXcvaW1hZ2UtcHJldmlldy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvcC1hY3Rpb24tYmFyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiAxNXB4O1xuICAgICAgZmxleC13cmFwOiB3cmFwO1xuICAgIH1cblxuICAgIC5iYWNrLWJ0biB7XG4gICAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBwYWRkaW5nOiA4cHggMjJweDtcbiAgICB9XG5cbiAgICAuY2F0ZWdvcnktdG9wLWJhciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDEycHggIzAwYzhmZjY2O1xuICAgIH1cblxuICAgIC5jYXRlZ29yeS1sYWJlbCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjMDA1MmNjO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgcGFkZGluZzogOXB4IDE4cHg7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAxcHg7XG4gICAgfVxuXG4gICAgLmNhdGVnb3J5LXZhbHVlIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYjdmZiwgIzAwZTBmZik7XG4gICAgICBjb2xvcjogIzAwMjI0NDtcbiAgICAgIHBhZGRpbmc6IDlweCAyMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLnByZXZpZXctY2FyZCB7XG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmZmZmZiwgI2YzZjZmZik7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMjBweCAjMDBjOGZmMzM7XG4gICAgfVxuXG4gICAgLnByZXZpZXctaW1nIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgbWF4LXdpZHRoOiA0MjBweDtcbiAgICAgIGhlaWdodDogMzQwcHg7XG4gICAgICBvYmplY3QtZml0OiBjb250YWluO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICAgIGJvcmRlcjogM3B4IHNvbGlkICMwMGM4ZmY7XG4gICAgICBwYWRkaW5nOiAxMHB4O1xuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAxOHB4ICMwMGM4ZmY0NDtcbiAgICB9XG5cbiAgICAuZGVzY3JpcHRpb24tYmFyIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwNTJjYywgIzAwYjdmZik7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiAxMnB4IDIycHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMXB4O1xuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAxMnB4ICMwMGM4ZmY1NTtcbiAgICB9XG5cbiAgICAuZGVzY3JpcHRpb24tdGV4dCB7XG4gICAgICBmb250LXNpemU6IDE3cHg7XG4gICAgICBsaW5lLWhlaWdodDogMS44O1xuICAgICAgY29sb3I6ICM0NDQ7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICAgIH1cblxuICAgIC5pbWFnZS10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDM0cHg7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIGNvbG9yOiAjMTExO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICB9XG5cbiAgICAuaW5mby1ib3gge1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZjlmZjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICBwYWRkaW5nOiAxOHB4O1xuICAgICAgYm94LXNoYWRvdzogMCAwIDEycHggcmdiYSgwLDAsMCwwLjA4KTtcbiAgICB9XG5cbiAgICAuaW5mby1ib3ggcCB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIH1cblxuICAgIC5wcmljZS10ZXh0IHtcbiAgICAgIGNvbG9yOiAjMDA5OTMzO1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBmb250LXNpemU6IDI4cHg7XG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgLnByZXZpZXctaW1nIHtcbiAgICAgICAgaGVpZ2h0OiAyNjBweDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIH1cblxuICAgICAgLmltYWdlLXRpdGxlIHtcbiAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgfVxuXG4gICAgICAudG9wLWFjdGlvbi1iYXIge1xuICAgICAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgICAgIH1cblxuICAgICAgLmNhdGVnb3J5LXRvcC1iYXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgIH1cblxuICAgICAgLmNhdGVnb3J5LXZhbHVlIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgIH1cbiAgICB9XG4udG9wLWFjdGlvbi1iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDE1cHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmJhY2stYnRuIHtcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIHBhZGRpbmc6IDhweCAyMnB4O1xufVxuXG4uY2F0ZWdvcnktdG9wLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJveC1zaGFkb3c6IDAgMCAxMnB4ICMwMGM4ZmY2Njtcbn1cblxuLmNhdGVnb3J5LWxhYmVsIHtcbiAgYmFja2dyb3VuZDogIzAwNTJjYztcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiA5cHggMThweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5jYXRlZ29yeS12YWx1ZSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYjdmZiwgIzAwZTBmZik7XG4gIGNvbG9yOiAjMDAyMjQ0O1xuICBwYWRkaW5nOiA5cHggMjJweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5wcmV2aWV3LWNhcmQsXG4uY29udGFjdC1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZmZmZmLCAjZjNmNmZmKTtcbn1cblxuLnByZXZpZXctaW1nIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNDIwcHg7XG4gIGhlaWdodDogMzQwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJvcmRlcjogM3B4IHNvbGlkICMwMGM4ZmY7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuXG4uZGVzY3JpcHRpb24tYmFyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDA1MmNjLCAjMDBiN2ZmKTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nOiAxMnB4IDIycHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbi5kZXNjcmlwdGlvbi10ZXh0IHtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBsaW5lLWhlaWdodDogMS44O1xuICBjb2xvcjogIzQ0NDtcbn1cblxuLmltYWdlLXRpdGxlIHtcbiAgZm9udC1zaXplOiAzNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgY29sb3I6ICMxMTE7XG59XG5cbi5pbmZvLWJveCB7XG4gIGJhY2tncm91bmQ6ICNmOGY5ZmY7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIHBhZGRpbmc6IDE4cHg7XG59XG5cbi5wcmljZS10ZXh0IHtcbiAgY29sb3I6IGdyZWVuO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmNvbnRhY3QtYmFyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDA1MmNjLCAjMDBiN2ZmKTtcblxuICBjb2xvcjogd2hpdGU7XG5cbiAgcGFkZGluZzogMTJweCAyMnB4O1xuXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG5cbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG5cbiAgZm9udC1zaXplOiAxNnB4O1xuXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XG5cbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG5cbiAgYm94LXNoYWRvdzogMCAwIDEycHggIzAwYzhmZjU1O1xufVxuXG4ucXItYm94IHtcbiAgaGVpZ2h0OiAxODBweDtcbiAgYm9yZGVyOiAycHggZGFzaGVkICMzMzM7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDMycHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnByZXZpZXctaW1nIHtcbiAgICBoZWlnaHQ6IDI2MHB4O1xuICB9XG5cbiAgLmltYWdlLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDI4cHg7XG4gIH1cblxuICAuY2F0ZWdvcnktdG9wLWJhciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAuY2F0ZWdvcnktdmFsdWUge1xuICAgIGZsZXg6IDE7XG4gIH1cblxuICAucHJldmlldy1pbWcge1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNDIwcHg7XG4gIGhlaWdodDogMzQwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXI6IDNweCBzb2xpZCByZWQ7XG59XG59Il19 */");

/***/ }),

/***/ "./src/app/image-preview/image-preview.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/image-preview/image-preview.component.ts ***!
  \**********************************************************/
/*! exports provided: ImagePreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagePreviewComponent", function() { return ImagePreviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var ImagePreviewComponent = /** @class */ (function () {
    function ImagePreviewComponent(route, api) {
        this.route = route;
        this.api = api;
    }
    ImagePreviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        var code = this.route.snapshot.paramMap.get("id");
        this.api.getImageByCode(code).subscribe(function (data) {
            _this.image = data;
        });
    };
    ImagePreviewComponent.prototype.goBack = function () {
        window.history.back();
    };
    ImagePreviewComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }
    ]; };
    ImagePreviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-image-preview",
            template: __importDefault(__webpack_require__(/*! raw-loader!./image-preview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/image-preview/image-preview.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./image-preview.component.css */ "./src/app/image-preview/image-preview.component.css")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], ImagePreviewComponent);
    return ImagePreviewComponent;
}());



/***/ }),

/***/ "./src/app/pages/admin.component.css":
/*!*******************************************!*\
  !*** ./src/app/pages/admin.component.css ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2FkbWluLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/admin.component.ts":
/*!******************************************!*\
  !*** ./src/app/pages/admin.component.ts ***!
  \******************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var AdminComponent = /** @class */ (function () {
    function AdminComponent(api) {
        this.api = api;
        this.categories = [];
        this.images = [];
        this.catName = "";
        this.catDesc = "";
        this.name = "";
        this.desc = "";
        this.successMessage = "";
        this.cost = "";
        this.categoryId = "";
        this.nameError = "";
        this.descError = "";
        this.categoryError = "";
        this.fileError = "";
        this.costError = "";
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.reload();
    };
    AdminComponent.prototype.reload = function () {
        var _this = this;
        this.api.categories().subscribe(function (r) { return (_this.categories = r); });
        this.api.images().subscribe(function (r) { return (_this.images = r); });
    };
    AdminComponent.prototype.addCat = function () {
        var _this = this;
        this.api
            .addCategory({ name: this.catName, description: this.catDesc })
            .subscribe(function () {
            _this.catName = "";
            _this.catDesc = "";
            _this.reload();
        });
    };
    AdminComponent.prototype.file = function (e) {
        this.selected = e.target.files[0];
    };
    AdminComponent.prototype.upload = function () {
        var _this = this;
        this.nameError = "";
        this.descError = "";
        this.categoryError = "";
        this.fileError = "";
        this.costError = "";
        this.successMessage = "";
        var valid = true;
        if (!this.name || this.name.trim() === "") {
            this.nameError = "Image name is required";
            valid = false;
        }
        if (!this.desc || this.desc.trim() === "") {
            this.descError = "Description is required";
            valid = false;
        }
        if (!this.categoryId) {
            this.categoryError = "Please select category";
            valid = false;
        }
        if (!this.selected) {
            this.fileError = "Please select image";
            valid = false;
        }
        if (this.cost !== "" && Number(this.cost) < 0) {
            this.costError = "Image cost cannot be negative";
            valid = false;
        }
        if (!valid) {
            return;
        }
        var fd = new FormData();
        fd.append("name", this.name);
        fd.append("description", this.desc);
        fd.append("categoryId", this.categoryId);
        fd.append("cost", this.cost);
        fd.append("file", this.selected);
        this.api.upload(fd).subscribe(function () {
            _this.successMessage = "Image uploaded successfully";
            _this.name = "";
            _this.desc = "";
            _this.cost = "";
            _this.categoryId = "";
            _this.selected = null;
            _this.reload();
        }, function (err) {
            alert(err.error.message);
        });
    };
    AdminComponent.prototype.del = function (id) {
        var _this = this;
        this.api.deleteImage(id).subscribe(function () { return _this.reload(); });
    };
    AdminComponent.ctorParameters = function () { return [
        { type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"] }
    ]; };
    AdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./admin.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/admin.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./admin.component.css */ "./src/app/pages/admin.component.css")).default]
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/pages/cart.component.css":
/*!******************************************!*\
  !*** ./src/app/pages/cart.component.css ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NhcnQuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/cart.component.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/cart.component.ts ***!
  \*****************************************/
/*! exports provided: CartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartComponent", function() { return CartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var CartComponent = /** @class */ (function () {
    function CartComponent(api) {
        this.api = api;
        this.items = [];
    }
    CartComponent.prototype.ngOnInit = function () {
        this.load();
    };
    CartComponent.prototype.load = function () {
        var _this = this;
        this.api.cart().subscribe(function (r) { return (_this.items = r); });
    };
    CartComponent.prototype.remove = function (id) {
        var _this = this;
        this.api.removeCart(id).subscribe(function () { return _this.load(); });
    };
    CartComponent.ctorParameters = function () { return [
        { type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"] }
    ]; };
    CartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./cart.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/cart.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./cart.component.css */ "./src/app/pages/cart.component.css")).default]
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], CartComponent);
    return CartComponent;
}());



/***/ }),

/***/ "./src/app/pages/gallery.component.css":
/*!*********************************************!*\
  !*** ./src/app/pages/gallery.component.css ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".top-banner {\n  background: linear-gradient(90deg, #001847, #061d73, #2d003d);\n  border-radius: 20px;\n  padding: 18px;\n  margin-bottom: 20px;\n  box-shadow: 0 0 20px rgba(0,255,255,0.25);\n}\n\n.main-logo {\n  width: 120px;\n  height: 90px;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n\n.country-time-row {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.time-box {\n  background: rgba(255,255,255,0.08);\n  padding: 12px;\n  border-radius: 14px;\n  min-width: 110px;\n  text-align: center;\n  color: white;\n}\n\n.time-box h5 {\n  margin: 0;\n  font-size: 14px;\n  font-weight: bold;\n}\n\n.time-box p {\n  margin: 4px 0;\n  font-size: 13px;\n}\n\n.login-glow-btn {\n  background: linear-gradient(90deg, #00b7ff, #007bff);\n  color: white;\n  border: none;\n  border-radius: 30px;\n  padding: 10px 25px;\n  font-weight: bold;\n}\n\n.menu-bar {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n\n.menu-bar button {\n  background: #061d73;\n  color: white;\n  border: none;\n  padding: 10px 18px;\n  border-radius: 25px;\n  font-size: 13px;\n}\n\n.sidebar-box {\n  background: rgba(255,255,255,0.08);\n  padding: 18px;\n  border-radius: 18px;\n  color: white;\n}\n\n.search-premium {\n  display: flex;\n  gap: 10px;\n}\n\n.search-input {\n  border-radius: 25px;\n  border: none;\n  padding: 12px;\n}\n\n.search-btn {\n  border-radius: 25px;\n  padding: 10px 25px;\n}\n\n.image-panel {\n  background: rgba(255,255,255,0.05);\n  border-radius: 20px;\n  padding: 20px;\n}\n\n.image-card {\n  border-radius: 18px;\n  overflow: hidden;\n  border: none;\n}\n\n.gallery-img {\n  width: 100%;\n  height: 220px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.image-name {\n  font-size: 15px;\n  font-weight: bold;\n}\n\n.image-code {\n  font-size: 13px;\n  color: #555;\n}\n\n.price-text {\n  color: green;\n  font-weight: bold;\n}\n\n.view-btn {\n  background: linear-gradient(90deg, #00b7ff, #007bff);\n  border: none;\n  color: white;\n}\n\n.payment-box {\n  background: rgba(255,255,255,0.08);\n  border-radius: 18px;\n  padding: 20px;\n  color: white;\n  text-align: center;\n}\n\n.qr-box {\n  height: 180px;\n  background: white;\n  border-radius: 12px;\n  margin-top: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: black;\n  font-weight: bold;\n}\n\n.whatsapp-title {\n  margin-top: 18px;\n}\n\n.whatsapp-no {\n  color: #00ff99;\n}\n\n.secure-footer {\n  text-align: center;\n  color: white;\n  margin-top: 25px;\n}\n\n.main-footer {\n  text-align: center;\n  color: #ccc;\n  padding: 18px;\n  font-size: 13px;\n}\n\n.container-fluid {\n  min-height: auto;\n  overflow: visible;\n}\n\n.image-panel {\n  background: rgba(255,255,255,0.05);\n  border-radius: 20px;\n  padding: 20px;\n  min-height: auto;\n  height: auto;\n  overflow: visible;\n  margin-bottom: 30px;\n}\n\n.image-panel .row {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.sidebar-box,\n.payment-box {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 15px;\n  max-height: calc(100vh - 40px);\n  overflow-y: auto;\n}\n\n.main-footer,\n.secure-footer {\n  clear: both;\n  position: relative;\n  z-index: 1;\n}\n\n.image-panel .row {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n.sidebar-box,\n.payment-box {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 15px;\n  max-height: none;\n  overflow: visible;\n}\n\n.secure-footer {\n  background: linear-gradient(90deg, #ffd400, #ffb300, #ffd400);\n  color: #7a0000;\n  padding: 10px 18px;\n  text-align: center;\n  font-size: 18px;\n  border-radius: 0;\n  font-weight: 500;\n  box-shadow: 0 0 18px rgba(255, 204, 0, 0.8);\n  margin-left: 60px;\n  margin-right: 60px;\n  transform: skewX(-10deg);\n}\n\n.secure-footer span {\n  display: inline-block;\n  transform: skewX(10deg);\n}\n\n.secure-bold {\n  font-weight: 900;\n  color: #b00000;\n  margin-right: 8px;\n}\n\n.main-footer {\n  text-align: center;\n  color: white;\n  padding: 12px;\n  font-size: 17px;\n  font-weight: 500;\n  text-shadow: 0 0 8px #00c8ff;\n}\n\n@media (max-width: 768px) {\n  .secure-footer {\n    margin-left: 10px;\n    margin-right: 10px;\n    font-size: 14px;\n    transform: none;\n  }\n\n  .secure-footer span {\n    transform: none;\n  }\n\n  .main-footer {\n    font-size: 13px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvZ2FsbGVyeS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkRBQTZEO0VBQzdELG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osc0JBQW1CO0tBQW5CLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsZUFBZTtFQUNmLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsU0FBUztFQUNULGVBQWU7RUFDZixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLG9EQUFvRDtFQUNwRCxZQUFZO0VBQ1osWUFBWTtFQUNaLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGFBQWE7QUFDZjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsbUJBQW1CO0VBQ25CLGFBQWE7QUFDZjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixvQkFBaUI7S0FBakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usb0RBQW9EO0VBQ3BELFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsbUJBQW1CO0VBQ25CLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGFBQWE7RUFDYixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxtQkFBbUI7RUFDbkIsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0FBQ2pCOztBQUVBOztFQUVFLHdCQUFnQjtFQUFoQixnQkFBZ0I7RUFDaEIsU0FBUztFQUNULDhCQUE4QjtFQUM5QixnQkFBZ0I7QUFDbEI7O0FBRUE7O0VBRUUsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSx3QkFBZ0I7RUFBaEIsZ0JBQWdCO0VBQ2hCLFNBQVM7RUFDVCxnQkFBZ0I7RUFDaEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsNkRBQTZEO0VBQzdELGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLDJDQUEyQztFQUMzQyxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osYUFBYTtFQUNiLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0U7SUFDRSxpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2dhbGxlcnkuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50b3AtYmFubmVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMDAxODQ3LCAjMDYxZDczLCAjMmQwMDNkKTtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgcGFkZGluZzogMThweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYm94LXNoYWRvdzogMCAwIDIwcHggcmdiYSgwLDI1NSwyNTUsMC4yNSk7XG59XG5cbi5tYWluLWxvZ28ge1xuICB3aWR0aDogMTIwcHg7XG4gIGhlaWdodDogOTBweDtcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbn1cblxuLmNvdW50cnktdGltZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEycHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi50aW1lLWJveCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wOCk7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIG1pbi13aWR0aDogMTEwcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4udGltZS1ib3ggaDUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi50aW1lLWJveCBwIHtcbiAgbWFyZ2luOiA0cHggMDtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4ubG9naW4tZ2xvdy1idG4ge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMwMGI3ZmYsICMwMDdiZmYpO1xuICBjb2xvcjogd2hpdGU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgcGFkZGluZzogMTBweCAyNXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLm1lbnUtYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMHB4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4ubWVudS1iYXIgYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogIzA2MWQ3MztcbiAgY29sb3I6IHdoaXRlO1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDEwcHggMThweDtcbiAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4uc2lkZWJhci1ib3gge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDgpO1xuICBwYWRkaW5nOiAxOHB4O1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5zZWFyY2gtcHJlbWl1bSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMTBweDtcbn1cblxuLnNlYXJjaC1pbnB1dCB7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgcGFkZGluZzogMTJweDtcbn1cblxuLnNlYXJjaC1idG4ge1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICBwYWRkaW5nOiAxMHB4IDI1cHg7XG59XG5cbi5pbWFnZS1wYW5lbCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC4wNSk7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbi5pbWFnZS1jYXJkIHtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4uZ2FsbGVyeS1pbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAyMjBweDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG59XG5cbi5pbWFnZS1uYW1lIHtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmltYWdlLWNvZGUge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGNvbG9yOiAjNTU1O1xufVxuXG4ucHJpY2UtdGV4dCB7XG4gIGNvbG9yOiBncmVlbjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi52aWV3LWJ0biB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgIzAwYjdmZiwgIzAwN2JmZik7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ucGF5bWVudC1ib3gge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDgpO1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnFyLWJveCB7XG4gIGhlaWdodDogMTgwcHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY29sb3I6IGJsYWNrO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLndoYXRzYXBwLXRpdGxlIHtcbiAgbWFyZ2luLXRvcDogMThweDtcbn1cblxuLndoYXRzYXBwLW5vIHtcbiAgY29sb3I6ICMwMGZmOTk7XG59XG5cbi5zZWN1cmUtZm9vdGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogd2hpdGU7XG4gIG1hcmdpbi10b3A6IDI1cHg7XG59XG5cbi5tYWluLWZvb3RlciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICNjY2M7XG4gIHBhZGRpbmc6IDE4cHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLmNvbnRhaW5lci1mbHVpZCB7XG4gIG1pbi1oZWlnaHQ6IGF1dG87XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xufVxuXG4uaW1hZ2UtcGFuZWwge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMDUpO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBwYWRkaW5nOiAyMHB4O1xuICBtaW4taGVpZ2h0OiBhdXRvO1xuICBoZWlnaHQ6IGF1dG87XG4gIG92ZXJmbG93OiB2aXNpYmxlO1xuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xufVxuXG4uaW1hZ2UtcGFuZWwgLnJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnNpZGViYXItYm94LFxuLnBheW1lbnQtYm94IHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgdG9wOiAxNXB4O1xuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gNDBweCk7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi5tYWluLWZvb3Rlcixcbi5zZWN1cmUtZm9vdGVyIHtcbiAgY2xlYXI6IGJvdGg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbn1cblxuLmltYWdlLXBhbmVsIC5yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5zaWRlYmFyLWJveCxcbi5wYXltZW50LWJveCB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMTVweDtcbiAgbWF4LWhlaWdodDogbm9uZTtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG59XG5cbi5zZWN1cmUtZm9vdGVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjZmZkNDAwLCAjZmZiMzAwLCAjZmZkNDAwKTtcbiAgY29sb3I6ICM3YTAwMDA7XG4gIHBhZGRpbmc6IDEwcHggMThweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDE4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJveC1zaGFkb3c6IDAgMCAxOHB4IHJnYmEoMjU1LCAyMDQsIDAsIDAuOCk7XG4gIG1hcmdpbi1sZWZ0OiA2MHB4O1xuICBtYXJnaW4tcmlnaHQ6IDYwcHg7XG4gIHRyYW5zZm9ybTogc2tld1goLTEwZGVnKTtcbn1cblxuLnNlY3VyZS1mb290ZXIgc3BhbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgdHJhbnNmb3JtOiBza2V3WCgxMGRlZyk7XG59XG5cbi5zZWN1cmUtYm9sZCB7XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG4gIGNvbG9yOiAjYjAwMDAwO1xuICBtYXJnaW4tcmlnaHQ6IDhweDtcbn1cblxuLm1haW4tZm9vdGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC1zaGFkb3c6IDAgMCA4cHggIzAwYzhmZjtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5zZWN1cmUtZm9vdGVyIHtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxuXG4gIC5zZWN1cmUtZm9vdGVyIHNwYW4ge1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxuXG4gIC5tYWluLWZvb3RlciB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICB9XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/gallery.component.ts":
/*!********************************************!*\
  !*** ./src/app/pages/gallery.component.ts ***!
  \********************************************/
/*! exports provided: GalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function() { return GalleryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(api, auth) {
        this.api = api;
        this.auth = auth;
        this.images = [];
        this.categories = [];
        this.keyword = "";
        this.indiaTime = "";
        this.usaTime = "";
        this.ukTime = "";
        this.australiaTime = "";
        this.ksaTime = "";
    }
    GalleryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.api.categories().subscribe(function (r) {
            _this.categories = r || [];
        });
        this.updateTimes();
        setInterval(function () { return _this.updateTimes(); }, 1000);
    };
    GalleryComponent.prototype.updateTimes = function () {
        this.indiaTime = new Date().toLocaleTimeString("en-IN", {
            timeZone: "Asia/Kolkata",
        });
        this.usaTime = new Date().toLocaleTimeString("en-US", {
            timeZone: "America/New_York",
        });
        this.ukTime = new Date().toLocaleTimeString("en-GB", {
            timeZone: "Europe/London",
        });
        this.australiaTime = new Date().toLocaleTimeString("en-AU", {
            timeZone: "Australia/Sydney",
        });
        this.ksaTime = new Date().toLocaleTimeString("en-SA", {
            timeZone: "Asia/Riyadh",
        });
    };
    GalleryComponent.prototype.load = function () {
        var _this = this;
        this.api.images().subscribe(function (r) {
            _this.images = r || [];
        });
    };
    GalleryComponent.prototype.search = function () {
        var _this = this;
        this.api.search(this.keyword).subscribe(function (r) {
            _this.images = r || [];
        });
    };
    GalleryComponent.prototype.cat = function (id) {
        var _this = this;
        this.api.byCategory(id).subscribe(function (r) {
            _this.images = r || [];
        });
    };
    GalleryComponent.prototype.add = function (id) {
        this.api.addCart(id).subscribe(function () { return alert("Added to cart"); });
    };
    GalleryComponent.prototype.viewImage = function (code) {
        window.location.href = "/image-preview/" + code;
    };
    GalleryComponent.ctorParameters = function () { return [
        { type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"] },
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] }
    ]; };
    GalleryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./gallery.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/gallery.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./gallery.component.css */ "./src/app/pages/gallery.component.css")).default]
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]])
    ], GalleryComponent);
    return GalleryComponent;
}());



/***/ }),

/***/ "./src/app/pages/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/pages/login.component.css ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2xvZ2luLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/pages/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.email = "";
        this.password = "";
        this.err = "";
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.auth.login({ email: this.email, password: this.password }).subscribe(function (r) {
            _this.auth.save(r);
            _this.router.navigate(["/"]);
        }, function (e) { return (_this.err = "Invalid login"); });
    };
    LoginComponent.ctorParameters = function () { return [
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./login.component.css */ "./src/app/pages/login.component.css")).default]
        }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/pages/register.component.css":
/*!**********************************************!*\
  !*** ./src/app/pages/register.component.css ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/register.component.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/register.component.ts ***!
  \*********************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.username = '';
        this.email = '';
        this.password = '';
        this.err = '';
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe(function (r) { _this.auth.save(r); _this.router.navigate(['/']); }, function (e) { return _this.err = 'Registration failed'; });
    };
    RegisterComponent.ctorParameters = function () { return [
        { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({ template: __importDefault(__webpack_require__(/*! raw-loader!./register.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/register.component.html")).default, styles: [__importDefault(__webpack_require__(/*! ./register.component.css */ "./src/app/pages/register.component.css")).default] }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/reset-password/reset-password.component.ts":
/*!************************************************************!*\
  !*** ./src/app/reset-password/reset-password.component.ts ***!
  \************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/api.service */ "./src/app/services/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(api) {
        this.api = api;
        this.token = '';
        this.newPassword = '';
        this.message = '';
    }
    ResetPasswordComponent.prototype.submit = function () {
        var _this = this;
        this.message = '';
        this.api.resetPassword(this.token, this.newPassword).subscribe(function (res) {
            _this.message = res.message;
        }, function (err) {
            _this.message = err.error.message || 'Reset failed';
        });
    };
    ResetPasswordComponent.ctorParameters = function () { return [
        { type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"] }
    ]; };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __importDefault(__webpack_require__(/*! raw-loader!./reset-password.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/reset-password/reset-password.component.html")).default
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/services/api.service.ts":
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.api = 'https://image-gallery-system.onrender.com/api';
    }
    ApiService.prototype.categories = function () {
        return this.http.get(this.api + "/categories");
    };
    ApiService.prototype.images = function () {
        return this.http.get(this.api + "/images");
    };
    ApiService.prototype.getImageByCode = function (code) {
        return this.http.get(this.api + "/images/code/" + code);
    };
    ApiService.prototype.search = function (k) {
        return this.http.get(this.api + "/images/search?keyword=" + k);
    };
    ApiService.prototype.byCategory = function (id) {
        return this.http.get(this.api + "/images/category/" + id);
    };
    ApiService.prototype.cart = function () {
        return this.http.get(this.api + "/cart");
    };
    ApiService.prototype.addCart = function (id) {
        return this.http.post(this.api + "/cart/" + id, {});
    };
    ApiService.prototype.removeCart = function (id) {
        return this.http.delete(this.api + "/cart/" + id);
    };
    ApiService.prototype.addCategory = function (c) {
        return this.http.post(this.api + "/categories", c);
    };
    ApiService.prototype.upload = function (fd) {
        return this.http.post(this.api + "/admin/images", fd);
    };
    ApiService.prototype.deleteImage = function (id) {
        return this.http.delete(this.api + "/admin/images/" + id);
    };
    ApiService.prototype.forgotPassword = function (email) {
        return this.http.post(this.api + "/auth/forgot-password", { email: email });
    };
    ApiService.prototype.resetPassword = function (token, newPassword) {
        return this.http.post(this.api + "/auth/reset-password", {
            token: token,
            newPassword: newPassword
        });
    };
    ApiService.prototype.imageUrl = function (path) {
        return path && path.startsWith("/uploads")
            ? "http://localhost:8080" + path
            : path;
    };
    ApiService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: "root" }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/services/auth.guard.ts":
/*!****************************************!*\
  !*** ./src/app/services/auth.guard.ts ***!
  \****************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () { if (this.auth.loggedIn())
        return true; this.router.navigate(['/login']); return false; };
    AuthGuard.ctorParameters = function () { return [
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }
    ]; };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/services/auth.interceptor.ts":
/*!**********************************************!*\
  !*** ./src/app/services/auth.interceptor.ts ***!
  \**********************************************/
/*! exports provided: AuthInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function() { return AuthInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.service */ "./src/app/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(auth) {
        this.auth = auth;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var t = this.auth.token();
        if (t) {
            req = req.clone({ setHeaders: { Authorization: "Bearer " + t } });
        }
        return next.handle(req);
    };
    AuthInterceptor.ctorParameters = function () { return [
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }
    ]; };
    AuthInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());



/***/ }),

/***/ "./src/app/services/auth.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



var AuthService = /** @class */ (function () {
    function AuthService(http, router) {
        this.http = http;
        this.router = router;
        this.api = 'https://image-gallery-system.onrender.com/api';
    }
    AuthService.prototype.login = function (data) {
        return this.http.post(this.api + "/auth/login", data);
    };
    AuthService.prototype.register = function (data) {
        return this.http.post(this.api + "/auth/register", data);
    };
    AuthService.prototype.save = function (r) {
        try {
            window.localStorage.setItem("token", r.token);
            window.localStorage.setItem("role", r.role);
            window.localStorage.setItem("username", r.username);
        }
        catch (e) { }
    };
    AuthService.prototype.token = function () {
        try {
            return window.localStorage.getItem("token");
        }
        catch (e) {
            return null;
        }
    };
    AuthService.prototype.loggedIn = function () {
        try {
            return !!window.localStorage.getItem("token");
        }
        catch (e) {
            return false;
        }
    };
    AuthService.prototype.isAdmin = function () {
        try {
            return window.localStorage.getItem("role") === "ROLE_ADMIN";
        }
        catch (e) {
            return false;
        }
    };
    AuthService.prototype.logout = function () {
        try {
            window.localStorage.clear();
        }
        catch (e) { }
        this.router.navigate(["/login"]);
    };
    AuthService.prototype.forgotPassword = function (email) {
        return this.http.post(this.api + '/auth/forgot-password', { email: email });
    };
    AuthService.prototype.resetPassword = function (token, newPassword) {
        return this.http.post(this.api + '/auth/reset-password', {
            token: token,
            newPassword: newPassword
        });
    };
    AuthService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
    ]; };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: "root" }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_0__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\DEVELOPER\Downloads\image-gallery-fixed-no-lombok\image-gallery-complete-production\frontend\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map