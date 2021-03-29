//Json file added

var fs = require('fs');


//constants
var TASK_JSON_PATH = "./database.json";


function init(){
	//create file if it's present.
	if(!fs.existsSync(TASK_JSON_PATH)){
		console.log("Initialising storage.\n Creating `database.json` file");
		setData([]);	
	}
	
}

function getData(){
	//read file contents
	var contents = fs.readFileSync(TASK_JSON_PATH);

	//parse contents
	var data = JSON.parse(contents);

	return data;
}


function setData(data){
	//strigify JSON
	var dataString = JSON.stringify(data);

	//write to  file
	
	fs.writeFileSync(TASK_JSON_PATH,dataString);
}

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
  init()
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function trimtxt(text,i){
  var arr = text.split(" ")
  return arr[i]
}
function onDataReceived(text) {
  if (text.trim() === 'quit') {
    quit();
  }
  else if (text.trim() === 'list') {
    list();
  }
  else if (trimtxt(text,0).trim() === 'add') {
    add(trimtxt(text,1));
  }
  else if (trimtxt(text,0).trim() === 'remove') {
    remove(parseInt(trimtxt(text,1))-1);
  }
  else if(trimtxt(text,0).trim() === 'hello'){
    hello(text);
  }
  else if (text.trim() === 'help') {
    help();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  var def = trimtxt(text,1);
  if(def == undefined){return console.log("hello!")}
  console.log(`hello! `+def)
}

function help() {
	console.log("Usage: write tasks then one of the commands [add|check|remove|help] then write the task ");
	console.log("`task` is only a string when using `add` and a number\nfor all other commands.");
	console.log("Using the `tasks` without arguments lists all tasks");
}

function list() {
	
	//data
	var data = getData();
	
	if(data.length > 0){
		//print the list.
		console.log(`Task list: \n`);
		data.forEach(function (task,index){
			console.log(index+1+"."," ["+(task.completed ? " " : " ")+"] ",task.task);
		});
		
	}else{
		console.log("No tasks added!!");
	}

}
//add task
function add(task) {
  if(task == undefined) {return console.log("please add a todo task")}
	//get data
	var data = getData();

	//add item
	data.push({task:task,completed:false});

	//set data
	setData(data);

  list()
}

//delete task
function remove(task){
  
	//get data
	var data = getData();
  if (task > data.length-1){
    return console.log("wrong number ")
  }
  else{
    //delete item
	data.splice(task,task-task+1);

	//set data
	setData(data);

	//list
	list();
  }
	
}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("MoeKh")
