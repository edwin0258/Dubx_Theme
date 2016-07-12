// Vanilla Javascript Version

var db = 'Your raw html here, e.g. "<column name="id">4</column> ect.."'

//replace name="name" with name="slug" if problems.
db = db.split(/host_id">(\w{1,})<|name="name">([\w!@#$%^&*()_+\-=\[\]{};':"\\|,.\/? \u1100-\u11FF\u3130\u318F\uA960-\uA97F\uAC00-\uD7AF\uD7B0-\uD7FF\u3000-\u303F|\u3040-\u309F|\u30A0-\u30FF|\uFF00-\uFFEF|\u4E00-\u9FAF|\u2605-\u2606|\u2190-\u2195|\u203B/]{1,})</g)
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

console.log(db) // [object] form
// comment out which version you don't want
console.log(db.reduce(function(arr,x,i){arr.push([x.name,x.type,x.link])
return arr},[])) // multi-dim array form

console.log(db.map(x => 'Name: ' + x.name + '\n link: ' + x.link + '\n').join(''))
// plain text format