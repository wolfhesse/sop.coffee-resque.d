var resque=require('coffee-resque').connect({
	host: '127.0.0.1',
	port: 6379
});

var fn=function(){
	var a=Math.random(2);
	var b=Math.random(3);
	console.log('a,b is '+a+' '+b);
	resque.enqueue('math','add',[a,b],function(err, remainingJobs){
		if(err) {
			console.log('error '+err);
		} else {
			console.log('New job queued. Remaining jobs in queue: '+remainingJobs);
		}
	});
};

fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();
fn();

//process.exit();
