var my_module = require("./my_module");
var my_message = my_module.message("Hello! This is a message");
console.log(my_message);
var result = my_module.add(4,9);
console.log(result);
var res = my_module.sub(10,9)
console.log(res);