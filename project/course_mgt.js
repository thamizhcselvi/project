var express=require('express');

var app=express();

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.set("views","./views");
app.set("view engine","pug");

var d=new Date();
var student=[];
var status=[];
var course_list=[
	{id:1,name:'REST API Fundamentals',start_date:new Date("15 Mar 2019"),end_date:new Date("15 Apr 2019")},
	{id:2,name:'Networking Fundamentals',start_date:new Date("10 Mar 2019"),end_date:new Date("15 May 2019")},
	{id:3,name:'Functional Programming Fundamentals',start_date:new Date("1 Mar 2019"),end_date:new Date("2 Mar 2019")}
];

app.get('/',(req,res)=>{
	res.render('home');
});

app.get('/course_list',(req,res)=>{
	res.render('course_list',{course_list:course_list});
});

app.get('/reg_course',(req,res)=>{
	res.render('reg_course',{
	title: 'Register course'
	});
});

app.post('/reg_course',(req,res)=>{		//to create the course
	console.log(req.body);
	var req_milli=new Date().getTime();
	var id=req.body.course_id;
	var result=new Object();

	var found=course_list.find(function(element){

		if(element.id==id)
		{
			return id;
		}
	});
	var temp=course_list[id-1].start_date;
	var milli=temp.getTime();
	if(req_milli<milli)
	{
		var stud={
			name: req.body.name,
			reg_no: req.body.reg_no,
			course_id:req.body.course_id
		};
		student.push(stud);
		res.status(200).redirect('/');
	}
	else
	{
		console.log('failed');
	}

});

	app.get('/stud_list',(req,res)=>{
		res.render('stud_list',{student:student});
	});

	app.get('/stud_delete',(req,res)=>{
		res.render('stud_delete',{
		title: 'Delete a course'
		});
	});

	app.post('/stud_delete',(req,res)=>{
		console.log(req.body);
		var reg=req.body.reg_no;
		var id=req.body.course_id;

		student.forEach(function(element){
			if((element.course_id===id) && (element.reg_no===reg))
			{
				delete(element.course_id);
				delete(element.reg_no);
				delete(element.name);
				res.redirect('/');
			}
			else
				{
					res.redirect('/');
				}
		});
	});

	app.get('/status',(req,res)=>{

		course_list.forEach(function(element){

			var temp1=element.start_date;
			var milli1=temp1.getTime();
			console.log('temp1:'+temp1);

			var temp=element.end_date;
			var milli=temp.getTime();
			console.log('temp:'+temp);

			var req_milli=new Date().getTime();
			console.log('req:'+req_milli);


			if((req_milli<milli) && (req_milli<milli1))
			{
				var res={
					course_id:element.id,
					status:"InActive"
				};
				status.push(res);
			}
			else
			{
				var res={
					course_id:element.id,
					status:"Active"
				};
				status.push(res);
			}
			});
		console.log(status);
		res.render('status',{status:status});
	});

app.listen(3000);
