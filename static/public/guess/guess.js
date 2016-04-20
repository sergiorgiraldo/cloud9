		var register;

		function Register(){
			this.low = 0;
			this.high = 100;
			this.last = 0;
		}

		//Guess strategies

		var Guesser = function(){
			this.direction = "";
		};

		Guesser.prototype = {
			setDirection:function(direction){
				this.direction = direction;
			},

			guess:function(){
				return this.direction.guess();
			}
		};

		var guessInitial = function(){
			this.guess =  function(){
				return Math.floor((Math.random() * 100) + 1);
			}
		};

		var guessHigher = function(){
			this.guess =  function(){
				register.low = register.last;
				
				return Math.floor((register.high + register.last)/2);
			}
		};

		var guessLower = function(){
			this.guess =  function(){
				register.high = register.last;

				return Math.floor((register.low + register.last)/2);
			}
		};

		//END - Guess strategies

		//UI methods

		var template = {
			strategy:null,

			setup:function(){

			},

			exec:function(){
				this.setup();

				if (!this.strategy){
					alert("UPS, DEFINE STRATEGY FIRST");
					return;
				}

				var guesser = new Guesser();
				guesser.setDirection(this.strategy); 

				register.last = guesser.guess();
				
				updateUi();
			}
		};

		function getTemplate(){
			var F = function(){};
			F.prototype = template;
			return new F();
		}

		function start(){
			var impl = getTemplate();

			impl.setup = function(){
				impl.strategy = new guessInitial();
				register = new Register()
			};

			impl.exec();
		}

		function higher(){
			var impl = getTemplate();

			impl.setup = function(){
				impl.strategy = new guessHigher();
			};

			impl.exec();
		}
		
		function lower(){
			var impl = getTemplate();

			impl.setup = function(){
				impl.strategy = new guessLower();
			};

			impl.exec();
		}
		
		function gotIt(){
			alert("Heeeeeeeeee");
		}

		function $(el){
			return document.getElementById(el);
		}

		function updateUi(){
			$("nb").innerText = register.last;

			doTable();
		}	

		function createCell(value){
			var cell = document.createElement("td");    
			var cellText = document.createTextNode(value); 
			cell.appendChild(cellText);
			return cell;		
		}

		function doTable(){
			var row = document.createElement("tr");

			row.appendChild(createCell(register.low));					
			row.appendChild(createCell(register.high));
			row.appendChild(createCell(register.last));

			$("tbody").appendChild(row);	
		}	
