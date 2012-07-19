
/*
 * GET home page.
 */

module.exports = function(app){
    return {index:index, post:post};
	function post(req, res){
		
		bd = app.bd;

		// Get some collections
		var posts = bd.collection("posts");
		
		var thepost = req.query['post']  || "";
		
		var postss =[];
		var cur = app.posts.find();
        cur.forEach(function(x){
        	
        	postss.push(x);
        });
        
		if(thepost != ""){
			app.posts.findOne({ pageId:thepost }, function(err, post) {
				res.render('post', {
		                post:post,
	               		title: 'Test express form',
	               		thepost: thepost,
	               		posts:postss
	               	 
		                
		        });
			});	 
		}
		
	}
	
    function index(req, res){
    	
    	
		bd = app.bd;

		// Get some collections
		var posts = bd.collection("posts");

		posts.insert({ 
			pageId: req.query['pageId'],
		    title: req.query['title'],
		    created: new Date,
		    body: req.query['body']
		});

        var cur = app.posts.find();
        var postsnb = 0;
        var posts =[];
        cur.forEach(function(x){
        	
        	postsnb +=1;
        	posts.push(x);
        });
        
        
	 	
        app.posts.findOne({ pageId: "hallo" }, function(err, post) {
            app.postsdeux.findOne({ pageId: "hallo2" }, function(err, postdeux) {
	            
	            var shares = [{name:"Google",price:120}, {name:"Apple",price:132}, {name:"Microsoft",price:92}];
	           
	             res.render('index', {
	                post:post,
	                postdeux:postdeux,
	                postNum:postsnb,
	                shares : shares,
	                posts:posts,
	                title: 'Test express form' });
	              
	            
	        });
        });
    }
};

