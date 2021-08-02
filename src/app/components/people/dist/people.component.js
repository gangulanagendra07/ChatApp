"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PeopleComponent = void 0;
var core_1 = require("@angular/core");
var lodash_1 = require("lodash");
var PeopleComponent = /** @class */ (function () {
    function PeopleComponent(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.users = [];
        this.userArr = [];
        this.onlineUsers = [];
        // this.socket = io('http://loaclhost:3000');
    }
    PeopleComponent.prototype.ngOnInit = function () {
        this.loggedInUser = this.tokenService.GetPayload();
        this.GetUsers();
        this.GetUser();
        // this.socket.on('refreshPage', () =>{
        //   this.GetUsers();
        //   this.GetUser();
        // });
    };
    PeopleComponent.prototype.GetUsers = function () {
        var _this = this;
        this.userService.getAllUsers().subscribe(function (data) {
            // Here we are using lodash method to remove loggedInUser from server response.
            lodash_1["default"].remove(data.result, { username: _this.loggedInUser.username });
            _this.users = data.result;
        });
    };
    PeopleComponent.prototype.GetUser = function () {
        var _this = this;
        this.userService.getById(this.loggedInUser._id).subscribe(function (data) {
            _this.userArr = data.result.following;
        });
    };
    PeopleComponent.prototype.FollowUser = function (user) {
        this.userService.followUser(user._id).subscribe(function (data) {
            // this.socket.emit('refresh', {});
        });
    };
    PeopleComponent.prototype.CheckInArray = function (arr, id) {
        var result = lodash_1["default"].find(arr, ['userfollowed._id', id]);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    };
    PeopleComponent.prototype.online = function (event) {
        this.onlineUsers = event;
    };
    PeopleComponent.prototype.checkIfOnline = function (name) {
        var result = lodash_1["default"].indexOf(this.onlineUsers, name);
        if (result > -1) {
            return true;
        }
        else {
            return false;
        }
    };
    PeopleComponent = __decorate([
        core_1.Component({
            selector: 'app-people',
            templateUrl: './people.component.html',
            styleUrls: ['./people.component.css']
        })
    ], PeopleComponent);
    return PeopleComponent;
}());
exports.PeopleComponent = PeopleComponent;
