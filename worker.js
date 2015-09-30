// current-ver-raspberry .touched
var util = require('util');

// implement your job functions.
var job_count=0;
var myJobs = {
  add: function(a, b, callback) { 
	  console.log('worker: add, with a/b = '+a+'/'+b);
		var retstru = {};
		retstru['a']=a;
		retstru['b']=b;
		retstru['jobno']='n/a';
		retstru.jobcount = job_count;
		retstru['date']=new Date();
		retstru.result=a+b;
		var retstru_json=util.format('%j',retstru);
		console.log('retstru before callback:', retstru_json);
	  callback(a+b); },
  succeed: function(arg, callback) { callback(); },
  fail: function(arg, callback) { callback(new Error('fail')); }
}

// setup a worker
var worker = require('coffee-resque').connect({
  host: process.env.REDIS_SERVER || 'redis.wolfspool.chickenkiller.com',
  port: 6379
}).worker('*', myJobs);

// some global event listeners
//
// Triggered every time the Worker polls.
worker.on('poll', function(worker, queue) {
	console.error('poll');
});

// Triggered before a Job is attempted.
worker.on('job', function(worker, queue, job) {
	job_count+=1;
	console.error('job on queue '+queue);
});

// Triggered every time a Job errors.
worker.on('error', function(err, worker, queue, job) {
	console.error('error: '+err);
});

// Triggered on every successful Job run.
worker.on('success', function(worker, queue, job, result) {
	console.log('success# '+job_count+', result= '+result);
});

worker.start();

