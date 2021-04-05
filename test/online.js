var a = [85,4,21,56,3,44,52]
var t=[]
// for (var i in a){
//     for(var y in a){
//         // console.log(a[i]);
//         if(a[i]<a[y]){
//             a[i] = a[y]
//         }
//     }
//     c.push(a[i])
// }
for (let i = 0; i < a.length; i++) {
    let y = i+1
    for (y; y < a.length; y++) {
        // console.log(a[y]);
        if(a[i]<a[y]){
            var c
            c= a[y]
            a[y]=a[i]
            a[i] = c
        }     
    }    
    t.push(a[i])
}
console.log(t);