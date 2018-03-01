'use strict';

!function () {
	var view = document.querySelector("#leaveMessage");
	var model = {
		init: function init() {
			var APP_ID = 'orldLePcUlN3v9H2DehyMz5V-gzGzoHsz';
			var APP_KEY = 'DyCcYr2vF8Du4kR5mhmvFjsG';
			AV.init({
				appId: APP_ID,
				appKey: APP_KEY
			});
		},
		fetch: function fetch() {
			var query = new AV.Query('Message');
			return query.find(); //promise对象
		},
		save: function save(name, content) {
			var Message = AV.Object.extend('Message');
			var message = new Message();
			return message.save({ //promise对象
				'name': name,
				'content': content
			});
		}
	};

	var controller = {
		view: null,
		model: null,
		messageList: null,
		init: function init(view, model) {
			this.view = view;
			this.model = model;
			this.model.init();
			this.messageList = view.querySelector('#messageList > ol');
			this.form = view.querySelector('form');
			this.loadMessages();
			this.bindEvents();
		},
		loadMessages: function loadMessages() {
			var _this = this;

			this.model.fetch().then(function (message) {
				var array = message.map(function (item) {
					return item.attributes;
				});
				array.forEach(function (item) {
					var li = document.createElement('li');
					li.innerText = item.name + ':' + item.content;
					_this.messageList.appendChild(li);
				});
			}, function (error) {
				alert('error');
			});
		},
		bindEvents: function bindEvents() {
			var _this2 = this;

			var myForm = this.form;
			myForm.addEventListener('submit', function (e) {
				e.preventDefault();
				var name = myForm.querySelector('input[name=name]').value;
				var content = myForm.querySelector('input[name=content]').value;
				_this2.model.save(name, content).then(function (object) {
					var li = document.createElement('li');
					li.innerText = object.attributes.name + ':' + object.attributes.content;
					this.messageList.appendChild(li);
				}).then('', function () {
					alert("留言暂不可用 请稍后再试");
				});
			});
		}
	};
	controller.init(view, model);
}.call();