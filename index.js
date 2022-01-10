var page = 0
var box_chosen = []
var difficulty = 3
var difficulty_adjuster = 0.5
var correct_boxes = 0

function startgame(){


box_random()




    setTimeout(function()  {

        cursor()
     
    },3500)








}




function box_random(){
  
    

    for(let i = 1; i <= 36; i++){

        var box_selector = document.querySelector(`.box${i}`)
        var condition = random()
      
          breakme:  if (condition == difficulty){
                
                if(box_chosen.indexOf(i) != -1){
                    
                    break breakme
                }

               box_chosen.push(i)
               box_selector.style.animationName = "background"
                page++
            }

             if (page == difficulty){
            break
        }  
        
        

        }

        
           if(page != difficulty){
            box_random()
        
            } 
}




function random(){
var random = Math.ceil((Math.random()*36))


    return random

}


function cursor(){
    document.body.classList += "pointer"
    clearTimeout()
}

function check_box(event){
var box_clicked_name = (event.target.className)
var box_clicked_HTML = document.getElementsByClassName(`${box_clicked_name}`)
var box_clicked = parseInt((event.target.className).slice(7))



if (box_chosen.includes(box_clicked)){              
    box_clicked_HTML[0].style.backgroundColor = "rgb(" + 0 + "," + 171 + "," + 28 + ")";
    correct_boxes++
}
else{
    box_clicked_HTML[0].style.backgroundColor = 'rgb(' + [242,0,0].join(',') + ')';
}


if(correct_boxes == difficulty){

    for(let i = 1; i < 36; i++){
        var all_boxes = document.querySelectorAll('.box')
        all_boxes[i].style.backgroundColor = 'rgb(' + [0,162,226].join(',') + ')';
        document.body.classList.remove("pointer")
    }
}

}