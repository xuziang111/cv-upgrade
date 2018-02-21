!function(){
	var view = document.querySelector("#leaveMessage")
	var model = {
		init:function(){
      var APP_ID = 'orldLePcUlN3v9H2DehyMz5V-gzGzoHsz';
      var APP_KEY = 'DyCcYr2vF8Du4kR5mhmvFjsG';         
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
        });            
      },
		fetch:function(){
			var query = new AV.Query('Message');
			return query.find() //promise对象
		},
		save:function(name,content){
			var Message = AV.Object.extend('Message'); 
					var message = new Message();
					return message.save({ //promise对象
						'name':name,
						'content': content
					})
		}
	}

  var controller ={
		view:null,
		messageList:null,
    init:function(view){
			this.view = view;
			this.model = model;
			this.model.init();
			this.messageList = view.querySelector('#messageList')
			this.form = view.querySelector('form')
			this.loadMessages();
			this.bindEvents();
    },
      loadMessages:function(){
        this.model.fetch().then( (message) => {
						console.log(message)
						let array = message.map((item) => item.attributes )
        	  array.forEach((item)=>{
							let li = document.createElement('li');
        	    li.innerText = `${item.name}:${item.content}`;
        	    this.messageList.appendChild(li)
          	})
        	},function(error){
          alert('error')
        });            
			},
			bindEvents:function(){
				let myForm = this.form
				myForm.addEventListener('submit',function(e){
					e.preventDefault();
					let name = myForm.querySelector('input[name=name]').value;
					let content = myForm.querySelector('input[name=content]').value;
					console.log(content)
					this.model.save(name,content).then(function(object) {
						let li = document.createElement('li');
						li.innerText = `${object.attributes.name}:${object.attributes.content}`;
						this.messageList.appendChild(li)
					})
			})
		},
		x:function(){

		}	
  }
controller.init(view);
}.call()