function S4() {
   return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function guid() {
   return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
var uuid = guid()
window.localStorage.setItem('uuid', uuid)
console.log(guid())
