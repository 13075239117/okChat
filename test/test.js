// function randomNum(length) {

//     return a
// }
// randomNum(5)
// var i = 0
// var b = ''
// while (i < 10) {
//     console.log(i);
//      var a = Math.random() * 10
//     // a = a * length
//     a = Math.ceil(a)
//     b +=a
//     console.log(b);
//     i++
// }
// var a = {q:8,y:5,u:6}
// const {q,u} = a
// console.log(q,u);
// var name = '小明',age = '18'
// var obj={
//     name:this.name,
//     // age:this,
//     age2:this.age,
//     func:function(){
//         console.log(this);
//     }
// }
// console.log(obj.age2,obj.name);
// // obj.func()
// // function a(){
// //     var user = "追梦子";
// //     console.log(this.user); //undefined
// //     console.log(this); //Window
// // }
// // a();
// // Window.obj.func
// console.log(Window);
// var name1 = 4
// function person() {
//     // this.name = name;
//     // this.job = job;
//     // this.age = age;
//     console.log(this.name1);
//     this.sayHi = function () {
//         alert("Hi")
//     }

// }

// person()
var obj = {
    i:{
        o:this
    }
}
console.log( obj.i.o);