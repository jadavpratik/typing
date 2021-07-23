window.addEventListener("keyup", function(event){
	if (event.getModifierState("CapsLock"))
		Swal.fire(
		  'Please turn off CapsLock!',
		  '',
		  'warning'
		);
});


// --------------------------------VARIABLE-----------------------------------------------
const type_content = document.getElementsByClassName('type_content')[0];
const start_btn = document.getElementsByClassName('start_btn')[0];
const completed = document.getElementsByClassName('completed')[0];
const main = document.getElementsByClassName('main')[0];

var random,
	paragraph,
	span,
	char_index,
	error,
	start_time,
	end_time,
	shift;

const style = {
	'current' : 'color:white; background-color:#1a75ff',
	'right' : 'color:#1a75ff; background-color:white',
	'wrong' : {
		'space' : 'background-color:red',
		'char' : 'color:white; background-color:red'
	}	
}

const paragraphs = [
		 "First of all the just remove the words from your mind like impossibe, i can't do it, fear of failure etc... You can do anythings and you can become anythings but you have to do staring with a small-small steps, all the people who be a successful they are not become overnight. they all have enough time and patience"
    	,"Watch Movie, Series, Speeches, News etc... all those things are very helpful to understanding Language because the when the child was born at that time he don't know anythings what we are talking about but by time to time he learn one then two then three and everything... So Keeping in Mind Things..."
    	,"Speaking is also most important things because once you are able to understand the language then after you have start a practice, this is very important part of learning English and improve vocubulary is most important thing..."
    	,"The Reading is also important things because when you read the news article or somethings else you can able to understand the words and spelling, so that's why you have to keep habit of reading. while reading if you don't understand the meaning of the word so just mark it and search by it on google or dictionary. so by This way you can improve you English..."
    ]


// -------------------------------------LOGIC------------------------------------------

// ON CLICK ON START BUTTON CHANGE THE STATUS OF BUTTON

start_btn.addEventListener('click', function(){

	const Username = prompt('Enter your Name');

	if(Username!=='' && Username!==null){
		// THIS BELOW VALUES STORES FOR PRINT IN CERTIFICATE...
		localStorage.setItem('name', Username);
		if(start_btn.children[0].innerHTML=='START' || start_btn.children[0].innerHTML=='RESTART'){	

			start_btn.children[0].innerHTML = 'DONE';
			start_btn.setAttribute('disabled', 'disabled');

				type_content.innerHTML = '';
				main.classList.remove('d-none');

				completed.classList.remove('d-flex');
				completed.classList.add('d-none');

				select_paragraph();	   // SELECT PARAGRAPH
				starting_assignment(); // VARIABLE ASSIGNMENT
				start_typing();        // START GAME
		}			
	}

})

// ON START OR RESTART, WE NEED TO RE-INITIALIZE ALL VARIABLE WITH ZERO VALUE
function starting_assignment(){
   	char_index = 0;
	error = 0;
	shift = 0;
	const date = new Date();
	start_time = date.getTime();
	span = type_content.getElementsByTagName('span');
	span[char_index].style.cssText = style.current;
}

// SELECT A RANDOM PARAGRAPH AND TAKE EVERY CHARACTER FROM IT AND PUT INTO A TYPE_CONTENT
function select_paragraph(){
	random = Math.floor(Math.random()*paragraphs.length);
	paragraph = paragraphs[random].split("");
	paragraph.forEach((char)=>{		
			span = document.createElement('span') ;
			span.innerText = char ;
			type_content.appendChild(span);
   	});
}


// -------------------ACTUAL LOGIC OR RIGHT & WRONG CHARACTER--------------------------- 

function start_typing(){
	document.addEventListener('keydown', Logic);	
}

const Logic = function(e){
	e.preventDefault();
	if(e.keyCode==16)
		shift=1; // SHIFT = 1 MEANS USER WANT'S TO WRITE CAPITAL LETTER

	else if( shift==1 && (e.keyCode==span[char_index].innerText.charCodeAt(0)) )
		right_character();  // CONDITION FOR CAPITAL LETTER
	
	else if( e.key == span[char_index].innerText )
		right_character(); // CONDITION FOR SMALL LETTER
	
	else if( e.key != span[char_index].innerText )
		wrong_character(); // CONDITION FOR WRONG LETTER
}

//------------------------------------RIGHT-WRONG CHARACTER FUNCTIONS------------------
function right_character(){
	span[char_index].style.cssText = style.right;
	next_character();
}

function wrong_character(){
	if(span[char_index].innerText==" ") // SPACE ERROR
		span[char_index].style.cssText= style.wrong.space;

	else // CHARACTER ERROR
		span[char_index].style.cssText = style.wrong.char ;
	error++;
}

function next_character(){
	shift=0;
	char_index++;
	if(span[char_index]!=undefined)
		span[char_index].style.cssText = style.current;
	else
		game_finished(); // IF YOU REACH THE LAST CHARACTER THEN GAME IS FINISHED
}


//------------------------------------GAME-FINISH------------------
	
function game_finished(){
	document.removeEventListener('keydown', Logic);
	start_btn.children[0].innerHTML = 'RESTART';
	start_btn.removeAttribute('disabled');
	const date = new Date();
		  end_time = date.getTime();
	const time = ((end_time - start_time)/1000)/60; //TOTAL TIMES IN MINITUES..
	const words = paragraph.length/5;
	const grossWPM = words/time;
	const actual_value = words - error;
	const netWPM = actual_value/time;	
	const accuracy = (netWPM/grossWPM)*100;

	document.getElementById('speed').innerHTML = netWPM.toFixed(0);
	document.getElementById('typos').innerHTML = error;
	document.getElementById('accuracy').innerHTML = accuracy.toFixed(2)+'%';
	document.getElementById('time').innerHTML = time.toFixed(2);


	main.classList.add('d-none');
	completed.classList.remove('d-none');
	completed.classList.add('d-flex');
	completed.classList.add('d-none');

	// THIS BELOW VALUES STORES FOR PRINT IN CERTIFICATE...
	localStorage.setItem('speed', netWPM.toFixed(0));
	localStorage.setItem('accuracy', accuracy.toFixed(2));

}

// WARNING TURN OF CAPS-LOCK
// DESCLAIMER THIS WEBSITE IS BASICALLY FOR DESKTOP VERSION...