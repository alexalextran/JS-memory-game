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

function startgame(){


box_random()
remaining_boxes = difficulty_floor

document.getElementById("level").innerHTML = 
`
<h1>Level</h1> <h1 class="special_number">${difficulty.toFixed(1)}</h1>
`




    setTimeout(function()  {

        cursor()
     
    },2500)

document.getElementById("remaining").innerHTML = 
`
Remaining Boxes <span class="number">${remaining_boxes}</span>
`







   

}




function box_random(){
  
    

    for(let i = 1; i <= boxes; i++){

        var box_selector = document.querySelector(`.box${i}`)
        var condition = random()

      
          breakme:  if (condition == difficulty_floor){
                    
                if(box_chosen.indexOf(i) != -1){
                    
                    break breakme
                }

               box_chosen.push(i)
               box_selector.style.animationName = "background"
               
                page++
            }

             if (page == difficulty_floor){
            break
        }  
        
        

        }

        
           if(page != difficulty_floor){
            box_random()
            
        
            } 
}




function random(){
var random = Math.ceil((Math.random()*36))


    return random

}


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



if (box_chosen.includes(box_clicked)){              
    box_clicked_HTML[0].style.backgroundColor = "rgb(" + 0 + "," + 171 + "," + 28 + ")";
    box_clicked_HTML[0].style.cursor = "auto"
    box_clicked_HTML[0].style.pointerEvents = "none";
    correct_boxes++
    remaining_boxes--
}
else{
    box_clicked_HTML[0].style.backgroundColor = 'rgb(' + [242,0,0].join(',') + ')';
}

document.getElementById("remaining").innerHTML = 
`
 Remaining Boxes <span class="number">${remaining_boxes}</span>
`




if(correct_boxes == difficulty_floor){
    reset()
    setTimeout(startgame, 3000)
   
}

 

   
}




function reset(){
   
        for(let i = 0; i < boxes; i++){
            all_boxes[i].style.cursor = "auto"
            all_boxes[i].style.pointerEvents = "none";
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
            
        
            difficulty = difficulty + difficulty_adjuster
             difficulty_floor = Math.floor(difficulty)
            level++
    
    
         }, 2000);

         
    
        }
