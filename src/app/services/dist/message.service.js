"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessageService = void 0;
var core_1 = require("@angular/core");
var BASEURL = 'http://localhost:3000/api/message';
var MessageService = /** @class */ (function () {
    function MessageService(http) {
        this.http = http;
    }
    MessageService.prototype.SendMessage = function (senderId, receiverId, receiverName, message) {
        return this.http.post(BASEURL + "/chat-message/" + senderId + "/" + receiverId, {
            receiverId: receiverId,
            receiverName: receiverName,
            message: message
        });
    };
    MessageService.prototype.GetAllMessages = function (senderId, receiverId) {
        return this.http.get(BASEURL + "/chat-message/" + senderId + "/" + receiverId);
    };
    MessageService.prototype.MarkMessages = function (sender, receiver) {
        return this.http.get(BASEURL + "/receiver-message/" + sender + "/" + receiver);
    };
    MessageService.prototype.MarkAllMessages = function () {
        return this.http.get(BASEURL + "/mark-all-messages");
    };
    MessageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
