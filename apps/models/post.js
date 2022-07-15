var q =require("q");
var db = require("../common/database");
var conn = db.getConnection();
function getAllPosts() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM posts', function (err, posts) {
        if (err) {
            defer.reject(err);
        }else {
            defer.resolve(posts);
        }
    });
    return defer.promise;
}

function addPost(params) {
    if(params){
        var defer = q.defer();
        var query = conn.query('INSERT INTO posts SET ?', params, function (err, result) {
            if (err) {
                defer.reject(err);
            }else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;
}


function getPostById(id) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM posts WHERE ?',{id:id}, function (err, posts) {
        if (err) {
            defer.reject(err);
        }else {
            defer.resolve(posts);
        }
    });
    return defer.promise;
}



function updatePost(params) {
    if(params){
        var defer = q.defer();
        var query = conn.query('UPDATE posts SET title =?, content =?,author =?,updated_at=? WHERE id=?',[params.title,params.content, params.author,new Date(),params.id],function (err, result) {
            if (err) {
                defer.reject(err);
            }else {
                defer.resolve(result);
            }
        });
        return defer.promise;
    }
    return false;

}
module.exports ={
    getAllPosts:getAllPosts,
    addPost:addPost,
    getPostById:getPostById,
    updatePost:updatePost
}