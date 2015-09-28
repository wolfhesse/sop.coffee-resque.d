// implement your job functions.
var job_count=0;
var myJobs = {
  add: function(a, b, callback) { 
	  console.log('worker: add, with a/b = '+a+'/'+b);
	  callback(a + b); },
  succeed: function(arg, callback) { callback(); },
  fail: function(arg, callback) { callback(new Error('fail')); }
}

// setup a worker
var worker = require('coffee-resque').connect({
  host: '127.0.0.1',
  port: 6379
}).worker('*', myJobs);

// some global event listeners
//
// Triggered every time the Worker polls.
worker.on('poll', function(worker, queue) {
	console.log('poll');
});

// Triggered before a Job is attempted.
worker.on('job', function(worker, queue, job) {
	console.log('job on queue '+queue);
});

// Triggered every time a Job errors.
worker.on('error', function(err, worker, queue, job) {
	console.log('error');
});

// Triggered on every successful Job run.
worker.on('success', function(worker, queue, job, result) {
	job_count+=1;
	console.log('success# '+job_count+', result= '+result);
});

worker.start();

