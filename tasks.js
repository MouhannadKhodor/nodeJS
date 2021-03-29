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
  else if(trimtxt(text,0).trim() === 'hello'){
    hello(text);
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
	console.log("Usage: write tasks then one of the commands [add|check|delete|help] then write the task ");
	console.log("`task` is only a string when using `add` and a number\nfor all other commands.");
	console.log("Using the `tasks` without arguments lists all tasks");
}

function list() {
	
	//data
	var data = getData();
	
	if(data.length > 0){
		//print the list. using ANSI colors and formating
		console.log("\x1b[93m\x1b[4mTask list:\x1b[24m");
		data.forEach(function (task,index){
			console.log(index+1+"."," ["+(task.completed ? "\x1b[92m✓\x1b[93m" : " ")+"] ",task.task);
		});
		
	}else{
		console.log("\x1b[91mNo tasks added!!");
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
