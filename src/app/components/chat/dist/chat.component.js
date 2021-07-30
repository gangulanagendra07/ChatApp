"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatComponent = void 0;
var core_1 = require("@angular/core");
var ChatComponent = /** @class */ (function () {
    function ChatComponent() {
        this.parentOnlineUsers = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.tabElement = document.querySelector('.nav-content');
    };
    ChatComponent.prototype.ngAfterViewInit = function () {
        this.tabElement.style.display = 'none';
    };
    // Added below method to export the data from parent to child component
    ChatComponent.prototype.online = function (event) {
        this.parentOnlineUsers = event;
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.component.html',
            styleUrls: ['./chat.component.css']
        })
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
