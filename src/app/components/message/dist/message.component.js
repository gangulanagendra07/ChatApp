"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessageComponent = void 0;
var core_1 = require("@angular/core");
// import io from 'socket.io-client';
var MessageComponent = /** @class */ (function () {
    function MessageComponent(tokensService, messageService, route, userService) {
        this.tokensService = tokensService;
        this.messageService = messageService;
        this.route = route;
        this.userService = userService;
        this.users = [];
        this.messagesArray = [];
        this.typing = false;
        // this.socket = io('http://localhost:3000');
    }
    MessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.tokensService.GetPayload();
        this.route.params.subscribe(function (params) {
            _this.receiver = params.name;
        });
        this.userService.getAllUsers().subscribe(function (data) {
            _this.users = data.result;
            _this.users.forEach(function (usersdata) {
                if (usersdata.username === _this.receiver) {
                    _this.receiverData = usersdata;
                    _this.GetMessages(_this.user._id, _this.receiverData._id);
                }
            });
        });
        // this.socket.on('refreshPage', () => {
        //   this.userService.getAllUsers().subscribe(data => {
        //     this.users = data.result;
        //     this.users.forEach(usersdata => {
        //       if (usersdata.username === this.receiver) {
        //         this.receiverData = usersdata;
        //         this.GetMessages(this.user._id, this.receiverData._id);
        //       }
        //     });
        //   });
        // });
        // this.socket.on('Is_typing', data => {
        //   if (data.sender === this.receiver) {
        //     this.typing = true;
        //   }
        // });
        // this.socket.on('has_stopped_typing', data => {
        //   if (data.sender === this.receiver) {
        //     this.typing = true;
        //   }
        // });
    };
    MessageComponent.prototype.ngAfterViewInit = function () {
        var params = {
            room1: this.user.username,
            room2: this.receiver
        };
        // this.socket.emit('join chat', params);
    };
    MessageComponent.prototype.GetMessages = function (senderId, receiverId) {
        var _this = this;
        this.messageService.GetAllMessages(senderId, receiverId).subscribe(function (data) {
            _this.messagesArray = data.messages.message;
        });
    };
    MessageComponent.prototype.sendMessage = function () {
        var _this = this;
        if (this.message) {
            this.messageService.SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message).subscribe(function (data) {
                // this.socket.emit('refresh', {});
                _this.message = "";
            });
        }
    };
    // Created IsTyping method to listen event whether user is tying or not.
    MessageComponent.prototype.IsTyping = function () {
        // this.socket.emit('start_typing', {
        //   sender: this.user.username,
        //   receiver: this.receiver
        // });
        var _this = this;
        if (this.typingMessage) {
            clearTimeout(this.typingMessage);
        }
        this.typingMessage = setTimeout(function () {
            _this.socket.emit('stop_typing', {
            //   sender: this.user.username,
            //   receiver: this.receiver
            });
        }, 500);
    };
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'app-message',
            templateUrl: './message.component.html',
            styleUrls: ['./message.component.css']
        })
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;
