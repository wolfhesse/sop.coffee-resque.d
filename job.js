var resque=require('coffee-resque').connect({
	host: '127.0.0.1',
	port: 6379
});
resque.enqueue('math','add',[1,2]);
resque.enqueue('math','add',[1,2]);
resque.enqueue('math','add',[1,2]);
resque.enqueue('math','add',[1,2]);
resque.enqueue('math','add',[1,2]);

