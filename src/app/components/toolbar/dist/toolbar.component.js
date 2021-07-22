"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ToolbarComponent = void 0;
var core_1 = require("@angular/core");
var M = require("materialize-css");
var moment = require("moment");
var lodash_1 = require("lodash");
var ToolbarComponent = /** @class */ (function () {
    function ToolbarComponent(tokenService, router, userService) {
        this.tokenService = tokenService;
        this.router = router;
        this.userService = userService;
        this.notifications = [];
        this.count = [];
        this.chatList = [];
        this.msgNumber = 0;
        // this.socket = io('http://loaclhost:3000');
    }
    ToolbarComponent.prototype.ngOnInit = function () {
        this.user = this.tokenService.GetPayload();
        var dropDownElement = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(dropDownElement, {
            alignment: 'right',
            hover: true,
            coverTrigger: false
        });
        var dropDownElementTwo = document.querySelectorAll('.dropdown-trigger1');
        M.Dropdown.init(dropDownElementTwo, {
            alignment: 'right',
            hover: true,
            coverTrigger: false
        });
        this.GetUser();
        // this.socket.on('refreshPage', ()=>{
        //   this.GetUser();
        // });
    };
    ToolbarComponent.prototype.GetUser = function () {
        var _this = this;
        this.userService.getById(this.user._id).subscribe(function (data) {
            _this.notifications = data.result.notifications.reverse();
            var value = lodash_1["default"].filter(_this.notifications, ['read', false]);
            // console.log(value);
            _this.count = value;
            _this.chatList = data.result.chatList;
            _this.CheckIfRead(_this.chatList);
            console.log(_this.msgNumber);
        }, function (err) {
            if (err.error.token) {
                _this.tokenService.DeleteToken();
                _this.router.navigate(["/"]);
            }
        });
    };
    ToolbarComponent.prototype.logOut = function () {
        this.tokenService.DeleteToken();
        localStorage.clear();
        this.router.navigate(['']);
    };
    ToolbarComponent.prototype.MarkAll = function () {
        this.userService.MarkAllAsRead().subscribe(function (data) {
            // this.socket.emit('refresh', {});
            // console.log(data);
        });
    };
    ToolbarComponent.prototype.CheckIfRead = function (arr) {
        var checkArr = [];
        for (var i = 0; i < arr.length; i++) {
            var receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
            if (this.router.url !== "/chat/" + receiver.sendername) {
                if (receiver.isRead === false && receiver.receivername === this.user.username) {
                    checkArr.push(1);
                    this.msgNumber = lodash_1["default"].sum(checkArr);
                }
            }
        }
    };
    ToolbarComponent.prototype.GoToHome = function () {
        this.router.navigate(['streams']);
    };
    ToolbarComponent.prototype.TimeForNow = function (time) {
        return moment(time).fromNow();
    };
    ToolbarComponent.prototype.MessageDate = function (date) {
        return moment(date).calendar(null, {
            sameDay: '[Today]',
            lastDay: '[Yesterday]',
            lastWeek: '[DD/MM/YYYY]',
            sameElse: '[DD/MM/YYYY]'
        });
    };
    ToolbarComponent = __decorate([
        core_1.Component({
            selector: 'app-toolbar',
            templateUrl: './toolbar.component.html',
            styleUrls: ['./toolbar.component.css']
        })
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
