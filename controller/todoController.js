var bodyParser =require('body-parser');
var db= require('mongoose');
// connect db
db.connect('momongodb+srv://thucduy01:admin@cluster0-wmjev.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// create a schema 
var todoSchema = new db.Schema({
    item: String,
    desc: String,
    timestamp: String,
    priority: String,
    status: String,
});

var Todo = db.model('Todo', todoSchema);

var urlrencodeParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
    
    //show todo-list
    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            if (err) throw err;
            //res.render('todo1',{todos:data})
            res.render('todo', {todos:data})
        });
        //res.render('todo',{todos: data});
    });

    // post todo
    app.post('/todo',urlrencodeParser, function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        })
    });
    //put todo
    app.put('/todo/:item',urlrencodeParser,function(req,res){
        // console.log(req.body.item);
        Todo.findOneAndUpdate({item : req.params.item},
            {   item : req.body.item,
                desc : req.body.desc
            },function(err,data){
            if (err) throw err;
            res.json(data);
        })
    });
    //remove todo
    app.delete('/todo/:item',function(req,res){
        //let abc =req.params.item;
        //let abcd = abc.replace(/_/gi," ");
        Todo.find({item : req.params.item}).deleteOne(function(err,data){
            if (err) throw err;
            res.json(data);
        })
    });
}