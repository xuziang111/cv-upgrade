function fn(){
	let view = document.querySelector("#leaveMessage")
	let model = {
		init:function(){
      let APP_ID = 'orldLePcUlN3v9H2DehyMz5V-gzGzoHsz';
      let APP_KEY = 'DyCcYr2vF8Du4kR5mhmvFjsG';         
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
        });            
      },
		fetch:function(){
			let query = new AV.Query('Message');
			return query.find() //promise对象
		},
		save:function(name,content){
			let Message = AV.Object.extend('Message'); 
			let message = new Message();
					return message.save({ //promise对象
						'name':name,
						'content': content
					})
		}
	}

  let controller ={
		view:null,
		model:null,
		messageList:null,
    init:function(view,model){
			this.view = view;
			this.model = model;
			this.model.init();
			this.messageList = view.querySelector('#messageList > ol')
			this.form = view.querySelector('form')
			this.loadMessages();
			this.bindEvents();
    },
      loadMessages:function(){
        this.model.fetch().then( (message) => {
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
				myForm.addEventListener('submit',(e) => {
					e.preventDefault();
					let name = myForm.querySelector('input[name=name]').value;
					let content = myForm.querySelector('input[name=content]').value;
					this.model.save(name,content).then(function(object) {
						let li = document.createElement('li');
						li.innerText = `${object.attributes.name}:${object.attributes.content}`;
						this.messageList.appendChild(li)
					}).then('',function(){alert("留言暂不可用 请稍后再试")})
			})
		},
  }
controller.init(view,model);
}
export default fn