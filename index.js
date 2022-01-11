var page = 0
var box_chosen = []
var remaining_boxes = 0
var difficulty = 1
var difficulty_floor = Math.floor(difficulty)
var difficulty_adjuster = 0.5
var correct_boxes = 0
const boxes = 36
var level = 1
var all_boxes =  document.getElementsByClassName('box')
var lives = 3
var sec = 0
var timerOn = 0
var msecVar


//timer function
function setSec() {
    sec = sec + 1;
    msecVar = setTimeout(setSec, 1000);
    document.getElementById("sec").innerHTML = `<p style="left: -30px; position: absolute;">${sec}</p> <p style="margin-left: 10px;">Seconds</p>`
}

function start() {
  if (!timerOn) {
    timerOn = 1;
    setSec();
  }
}

function stop() {
    clearTimeout(msecVar);
    timerOn = 0;
  }


function startgame(){
//ensures user cannot click anything when boxes are being chosen
document.getElementById("Start__game").innerHTML=""
 document.getElementById("Start__game").style.border = "none";

//generates a random assortment of boxes based on difficulty
box_random()

remaining_boxes = difficulty_floor
document.getElementById("level").innerHTML = 
`
<h1>Level</h1> <h1 class="special_number">${difficulty.toFixed(1)}</h1>
`

//allows the user to click boxes only after the chosen boxes animation is played
setTimeout(function()  {
cursor()
},2500)


document.getElementById("remaining").innerHTML = 
`
Remaining Boxes <span class="number">${remaining_boxes}</span>
`


console.log(box_chosen)
}

//generates random assortment of boxes that are chosen
function box_random(){
  
    //runs through each box on the site giving each one a 1 in 36 chance of being chosen
    for(let i = 1; i <= boxes; i++){
        var box_selector = document.querySelector(`.box${i}`)
        var condition = random()
      

          breakme:  if (condition == difficulty_floor){

              //if statement removes duplicates if there are any
                if(box_chosen.indexOf(i) != -1){
                    break breakme
                }

                //adds chosen boxes to an array and gives them the chosen animation
               box_chosen.push(i)
               box_selector.style.animationName = "background"
                page++
            }

            //breaks the function is there are enough chosen boxes equivalent to the difficulty
             if (page == difficulty_floor){
            break
             }  
        }

            //once the array runs through each box on the site and if there are not enough, the function will run again
           if(page != difficulty_floor){
            box_random()
            } 
}




function random(){
var random = Math.ceil((Math.random()*36))
    return random
}

// gives user ability to click on boxes
function cursor(){
    for(let i = 0; i < boxes; i++){
        all_boxes[i].style.cursor = "pointer"
        all_boxes[i].style.pointerEvents = "all";
    }
    clearTimeout()
}



function check_box(event){
var box_clicked_name = (event.target.className)
var box_clicked_HTML = document.getElementsByClassName(`${box_clicked_name}`)
var box_clicked = parseInt((event.target.className).slice(7))


//checks if the box that the user clicked matches the chosen box and if it is turn the box green and remove the ability to click it
if (box_chosen.includes(box_clicked)){              
    box_clicked_HTML[0].style.backgroundColor = "rgb(" + 46 + "," + 204 + "," + 113 + ")";
    box_clicked_HTML[0].style.cursor = "auto"
    box_clicked_HTML[0].style.pointerEvents = "none";
    correct_boxes++
    remaining_boxes--
}
//if the clicked box does not match the chosen box turn it red and remove a life
else{
    box_clicked_HTML[0].style.backgroundColor = 'rgb(' + [242,98,97].join(',') + ')';
    var hearts = document.getElementsByClassName(`heart${lives}`)
    lives--
    hearts[0].innerHTML =
    `
    <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon line" width="48" height="48"><path id="primary" d="M19.57,5.44a4.91,4.91,0,0,1,0,6.93L12,20,4.43,12.37A4.91,4.91,0,0,1,7.87,4a4.9,4.9,0,0,1,3.44,1.44,4.46,4.46,0,0,1,.69.88,4.46,4.46,0,0,1,.69-.88,4.83,4.83,0,0,1,6.88,0Z" style="fill: none; stroke: rgb(255, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>
    `

    //lose game condition
    if(lives == 0){
        stop()
        reset()
        document.getElementById("stats").innerHTML = 
        `
        <p>Congrats, You made it up to <span class="stats__scores">level ${difficulty}</span></p>
           <P>and you did it in <span class="stats__scores">${sec} seconds</span>!</P>
        `
        document.body.classList += "gameover"
    }
    
}
//updates remaining boxes whenever a box is clicked
document.getElementById("remaining").innerHTML = 
`
 Remaining Boxes <span class="number">${remaining_boxes}</span>
`

//clears all boxes if the user gets all chosen boxes correct
if(correct_boxes == difficulty_floor){
    reset()
    setTimeout(startgame, 3000)
}

   
}



//resets all variables and all header features
function reset(){
        for(let i = 0; i < boxes; i++){
            all_boxes[i].style.cursor = "auto"
            all_boxes[i].style.pointerEvents = "none";
        }

        for(let i = 1; i <= 3; i++){
        var hearts = document.getElementsByClassName(`heart${i}`)
       
        hearts[0].innerHTML =
        `
        <svg class="heart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon line" width="48" height="48"><path id="primary" d="M19.57,5.44a4.91,4.91,0,0,1,0,6.93L12,20,4.43,12.37A4.91,4.91,0,0,1,7.87,4a4.9,4.9,0,0,1,3.44,1.44,4.46,4.46,0,0,1,.69.88,4.46,4.46,0,0,1,.69-.88,4.83,4.83,0,0,1,6.88,0Z" style="fill: red; stroke: rgb(255, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>
        `
         }
    
        setTimeout(() => {  
    
            for(let i = 0; i < boxes; i++){
                all_boxes[i].style.backgroundColor = 'rgb(' + [0,162,226].join(',') + ')';
                all_boxes[i].style.animationName = "none"
            }
            
            remaining_boxes = 0
            page = 0
            correct_boxes = 0
            box_chosen = []
            lives = 3
        
            difficulty = difficulty + difficulty_adjuster
             difficulty_floor = Math.floor(difficulty)
            level++
    
         }, 2000);
        }

        //reloads the site in the lose card
        function reload() {
            reload = location.reload();
        }