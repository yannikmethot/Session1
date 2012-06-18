
/*
 * GET home page.
 */

module.exports = function(app){
    return {index:index};


    function index(req, res){

        // Get a single document
        app.posts.findOne({ pageId: "hallo" }, function(err, post) {
            res.render('index', {
                post:post,
                title: 'Express' });
        });
    }
};

