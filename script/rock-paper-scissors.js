//now, on pressing reset button, score will get remove
            //and when someting doesnt exist in the local storage storage its gonna give the value of null 
            //so after pressing reset button and reloading the page, score=null
            //and when we press any other button, will give an error as we are trying to update a null value
            //so to handle that error use an if condition
            
            let score=JSON.parse(localStorage.getItem('score'))|| {
                wins:0,
                loses:0,
                ties:0
            };

            function updateelem(){
                document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
            }
            /*to get the score from the local storage i.e. not losing the count of wins,loses and ties even after reload, follow the above method 

            code below will reset the count after every reload
            const score={
                wins:0,
                loses:0,
                ties:0
            };
            console.log(JSON.parse(localStorage.getItem('score')));*/


            /*if(score===null)
            {
                score={
                    wins:0,
                    loses:0,
                    ties:0
                };
            }*/

            let intervalid;
            let isautoplaying=false;

            // updateelem();

        function autoplay(){
            if(!isautoplaying){
                document.getElementById("autoPlayBtn").style.backgroundColor = "grey";
                intervalid=setInterval(function(){
                    const plyr_move=compmove();
                    playgame(plyr_move); 
                },1000);
                isautoplaying=true;
            }
            else{
                document.getElementById("autoPlayBtn").style.backgroundColor = "white";
                clearInterval(intervalid);
                isautoplaying=false;
            }
        }

        //calling playgame func when rock button is clicked using addeventlistener
        // document.querySelector('.js-rock-button').addEventListener('click',()=>{
        //     playgame('rock');
        // })

        //adding eventlisteners for keydown
        /*
            when press : r-rock
                         p-paper  
                         s-scissors
        */
        //onkeydown and keydown have special return values called event and it helps us to get what key was enter using event.key


        window.addEventListener('DOMContentLoaded',function(){
            document.body.addEventListener('keydown',(event)=>{
                console.log(event.key);
                if(event.key==='1')
                playgame('rock');
                else if(event.key==='2')
                playgame('paper');
                else if(event.key==='3')
                playgame('scissors');
            });
        })

        

            function playgame(usrmove){
                let computerMove=compmove();
                let result='';
                if(usrmove==='rock')
                {
                    if(computerMove=='rock'){
                        result='It was a Tie';
                    }
                
                    else if(computerMove=='paper'){
                        result='You Lose';
                    }
                    
                    else if(computerMove=='scissors'){
                        result='You Win';
                    } 
                }
                else if(usrmove==='paper')
                {
                    if(computerMove=='rock'){
                        result='You Win';
                    }
                
                    else if(computerMove=='paper'){
                        result='It was a Tie';
                    }
                    
                    else if(computerMove=='scissors'){
                        result='You Lose';
                    }
                }
                else if(usrmove==='scissors')
                {
                    if(computerMove=='rock'){
                        result='You Lose';
                    }
                
                    else if(computerMove=='paper'){
                        result='You Win';
                    }
                    
                    else if(computerMove=='scissors'){
                        result='It was a Tie';
                    }
                }

                if(result==='You Win')
                score.wins+=1;
                else if(result==='You Lose')
                score.loses+=1;
                else if(result==='It was a Tie')
                score.ties+=1;

                localStorage.setItem('score',JSON.stringify(score));

                document.querySelector('.js-outcome').innerHTML=result;
                document.querySelector('.js-choice').innerHTML=`You 
                <img src="images/${usrmove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

                updateelem();

               /* alert(`You picked ${usrmove}. Computer picked ${computerMove}. ${result}
                Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`);*/
            }

            function compmove(){
                let random_num=Math.random();
                let computerMove='';
                if(random_num>=0 && random_num<1/3)
                {
                    computerMove='rock';
                }
                else if(random_num>=1/3 && random_num<=2/3)
                {
                    computerMove='paper';
                }
                else if(random_num>=2/3 && random_num<1)
                {
                    computerMove='scissors';
                }
                // console.log(computerMove);
                return computerMove;
            }