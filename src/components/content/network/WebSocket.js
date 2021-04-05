import qs from 'qs'

function client(ws,sendMsg, accept,videoAccept) {
  // console.log(ws);
  // ws.onopen = function (event) {
  //   console.log(send);
  //   // Web Socket 已连接上，使用 send() 方法发送数据
  //   ws.send(JSON.stringify({a:'s'}));
  //   console.log('已连接上');
  //   // alert("数据发送中...");
  // };
  ws.addEventListener('open', function (event) {
    ws.send(JSON.stringify(sendMsg)); 
    console.log('已连接');
  });
  ws.onmessage = function (event) {
    // resolve(res)
    videoAccept = event.data
    accept.push(event.data)
    // console.log(event.data);
    // ws.close()
    
  }
  ws.onclose = function (e) {
    // reject("Connection closed.")

  console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
  console.log(e);
  };
  ws.onerror = function(e){
    console.log(e);
  }
}

export default client