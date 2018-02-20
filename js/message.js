
var APP_ID = 'orldLePcUlN3v9H2DehyMz5V-gzGzoHsz';
var APP_KEY = 'DyCcYr2vF8Du4kR5mhmvFjsG';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

/*
var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/

var query = new AV.Query('Message');
query.find().then(function (message) {
    message.forEach(function(item){
        console.log(item.attributes.content)
        let li = document.createElement('li');
        li.innerText = item.attributes.content;
        messageList.appendChild(li)
    })
  },function(error){
      alert('error')
  });


let myFrom = document.querySelector('#postMessageForm')
console.log(myFrom)
myFrom.addEventListener('submit',function(e){
    console.log('no error');
    e.preventDefault();
    let content = myFrom.querySelector('input[name=content]').value;
    console.log(content)
    var Message = AV.Object.extend('Message'); 
    var message = new Message();
    message.save({
     'content': content
    }).then(function(object) {
        console.log('no error');
        console.log(object);
    })
})