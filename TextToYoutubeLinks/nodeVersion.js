//Node.js Version

var fs = require('fs')
//replace stuff.html file of your choice, e.g. db.txt, hhh.xml
fs.readFile('stuff.txt','utf-8',function(err, data){
    if(err){
        console.log(err);
        return err;
    }
    db = data.toString()
.split(/host_id">(\w{1,})<|name="name">([\w!@#$%^&*()_+\-=\[\]{};':"\\|,.\/? \u1100-\u11FF\u3130\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3000-\u303F|\u3040-\u309F|\u30A0-\u30FF|\uFF00-\uFFEF|\u4E00-\u9FAF|\u2605-\u2606|\u2190-\u2195|\u203B/]{1,})</g)
	.filter(function(x){ return x !== undefined})
	.filter(function(x,i){if(i % 2 == 1) return x})
	.reduce(function(obj,x,i,arr){
		if(i % 2 == 1)
			(/^\d+$/g.test(arr[i])) ?
			obj.push({name: arr[i-1],type:'soundcloud',link: 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F' + arr[i]}) :
			obj.push({name: arr[i-1],type:'youtube',link: 'https://www.youtube.com/watch?v=' + arr[i]})
		return obj
	}
	, [])

    
    fs.writeFile('video_links.txt', db.map(x => 'Name: ' + x.name + '\n Link: ' + x.link + '\n').join(''),'utf-8',function(err){
        if(err){ console.log(err)
        return err}
    })
})