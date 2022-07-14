var fs = require("fs");

//open

// fs.open("data.txt","r+",function (err,file) {
//     if(err){
//         console.log("Open file is Error");
//         return;
//     }
//     console.log("Open file is successfully");
// });
//
// // Read file sync
// var data = fs.readFileSync("data.txt");
// console.log(data.toString());



// fs.readFile("data.txt",function (err, data) {
//     if(err){
//         console.log("Error read file");
//
//     }else {
//         console.log(data.toString());
//     }
//
// });
// fs.writeFile("data.txt","New Content File",function (err){
//     if(err){
//         console.log("Write file Error");
//
//     }else {
//         fs.readFile("data.txt",function (err,data){
//             if (err){
//                 console.log("Read file Error");
//
//             }else {
//                 console.log(data.toString());
//             }
//         });
//     }
// });

//Make New Folder
fs.mkdir("new_folder",function (err){
    if(err){
        console.log("Error");
    }else {
        console.log("Success!")
    }
});