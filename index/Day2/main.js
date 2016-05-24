var minus = document.getElementById("minus");
var number = document.getElementById("number");
var add = document.getElementById("add");
var tips = document.getElementById("tips");

minus.onclick = function(){
	add.className = "sign";
	if(number.innerText <= 2){
		tips.innerText = "Table Number is Min";
		tips.style.height = "20px";
		setTimeout(function(){
			tips.style.height = "0";
		}, 2500); 
	}else{
		number.innerText = number.innerText - 1;
		if(number.innerText <= 2){
			this.className = this.className + " close";
			
		}
	}

}

add.onclick = function(){
	minus.className = "sign";
	if(number.innerText >= 5){
		tips.innerText = "Table Number is Max";
		tips.style.height = "20px";
		setTimeout(function(){
			tips.style.height = "0";
		}, 2500);
	}else{
		number.innerText = parseInt(number.innerText) + 1;
		if(number.innerText >= 5){
			this.className = this.className + " close";
		}
	}
}