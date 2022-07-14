// khong co promide

// Su dung promise
var q = require("q");
function show(err,data){
    var defer = q.defer();
    if(err){
        defer.reject("Co loi roi");

    }else {
        defer.resolve(data);
    }
    return defer.promise;
}
show(true,"data 1")
.then(function (data){
    //step 1
    console.log(data);
    var data2 = "data 2";
    return data2;
})
.then(function (data2){
    console.log(data2);
})
.catch(function (err){
    console.log(err);
})