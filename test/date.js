// 重写方法，自定义格式化日期
// Date.prototype.toLocaleString = function () {
//     // 补0   例如 2018/7/10 14:7:2  补完后为 2018/07/10 14:07:02
//     function addZero(num) {
//         if (num < 10)
//             return "0" + num;
//         return num;
//     }
//     // 按自定义拼接格式返回
//     return this.getFullYear() + "." + addZero(this.getMonth() + 1) + "." + addZero(this.getDate()) + " " +
//         addZero(this.getHours()) + ":" + addZero(this.getMinutes()) 
// };
// // 根据毫秒数构建 Date 对象
// var date = new Date(1499996760000);
// // 按重写的自定义格式，格式化日期
// dateTime = date.toLocaleString();
const a={}
a['2021.03.30 12:19'] = 55
console.log(a);