var page = 0
var box_chosen = []


function startgame(){
    var difficulty = 7
    

    for(let i = 1; i <= 36; i++){

        var box_selector = document.querySelector(`.box${i}`)
        var condition = random()
      
        
       

          breakme:  if (condition == difficulty){
               
                
                if(box_chosen.indexOf(i) != -1){
                    console.log('hehe haw')
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
                startgame()
                
            } 
}




function random(){
var random = Math.ceil((Math.random()*36))


    return random
   


}


