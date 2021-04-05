function randomNum(length) {
    var i = 0
    var b = ''
    while (i < length) {
        // console.log(i);
         var a = Math.random() * 10
        // a = a * length
        a = Math.ceil(a)
        b +=a
        // console.log(b);
        i++
    }
    return b
}
export default randomNum