var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://user:password@ds159200.mlab.com:59200/mean-js', ['tasks']); //tasks=collections

router.get('/tasks', function (req, res, next) {
    db.tasks.find(function(err, tasks) {
        if(err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

router.post('/task', function(req, res, next) {
    var task = req.body;
    if(!task.title || !(task.isDone + '')) {
        res.sendStatus(400);
        res.json({
            "error": "bad data"
        });
    }
    else {
        db.tasks.save(task, function (err, task) {
            if(err) {
                res.send(err);
            }
            console.log(task);
            res.json(task);
        });
    }
});

router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var update = {};

    if(task.isDone) {
        update.isDone = task.isDone;
    }
    if(task.title) {
        update.title = task.title;
    }

    if(!update) {
        res.sendStatus(400);
        res.json({
            "error": "bad data"
        });
    } else {    
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, update, {},function(err, task) {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;