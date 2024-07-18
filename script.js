        const score = document.querySelector('.score');
        const startScreen = document.querySelector('.startScreen');
        const gameArea = document.querySelector('.gameArea');
    
        let keys = {
            ArrowUp : false,
            ArrowDown : false,
            ArrowRight : false,
            ArrowLeft : false
        }
        document.addEventListener('keydown' , keyDown);
        document.addEventListener('keyup' , keyUp);
        

        function keyDown(e){             // e is passed as we don't want the functionality given by JS by default
            e.preventDefault();          // by e.key we will know which key user is pressing
            keys[e.key] = true;
            //console.log(e.key);
            //console.log(keys);
        }
        function keyUp(e){             
            e.preventDefault();
            keys[e.key] = false;         // to again make the pressed key false next time
           // console.log(e.key);
           // console.log(keys);
        }
        startScreen.addEventListener('click',start);       // start is callback function

        let player = { speed : 5, score : 0 };

    

        function start(){
            // gameArea.classList.remove('hide');
            startScreen.classList.add('hide');
            gameArea.innerHTML = "";

            player.start = true;
            player.score = 0;
            window.requestAnimationFrame(gamePlay);        // gamePlay is callback function


            let car = document.createElement('div');       // createElement is used to create an element in document
            car.setAttribute('class','car');
            // car.innerText = "I am car";
            gameArea.appendChild(car);

        console.log("Top position : ",car.offsetTop);             // to get the position from top
        console.log("Left position : ",car.offsetLeft);


        player.x = car.offsetLeft;
        player.y = car.offsetTop;

        // let roadLine = document.createElement('div');
        // roadLine.setAttribute('class','lines');
        // gameArea.appendChild(roadLine);


        for(x=0;x<5;x++){
            let roadLine = document.createElement('div');
            roadLine.setAttribute('class','lines');
            roadLine.y = x*150;
            roadLine.style.top = roadLine.y + "px";               // height of each roadLines are 100 and next line start after 150 so 50 px gap is created
            gameArea.appendChild(roadLine);   
        }


        for(x=0;x<4;x++){
            let enemyCar = document.createElement('div');
            enemyCar.setAttribute('class','enemy');
            // enemyCar.y = x*150;
            enemyCar.y = ((x+1) * 350) * -1;
            enemyCar.style.backgroundColor = randomColor();
            enemyCar.style.left = Math.floor(Math.random() * 350) + "px"
            enemyCar.style.top = enemyCar.y + "px";               // height of each roadLines are 100 and next line start after 150 so 50 px gap is created
            gameArea.appendChild(enemyCar);   
        }
    }

       
    function isCollide(a,b){
        aRect = a.getBoundingClientRect();
        bRect = b.getBoundingClientRect();

        return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
       }
        
        function moveLines(){
            let lines = document.querySelectorAll('.lines')
            lines.forEach(function(item){                     // anonymous values


                if(item.y >= 700){
                    item.y -= 750
                }
                item.y += player.speed 
                item.style.top = item.y + "px"; 
            })
        }


        function endGame(){
            player.start = false
            // gameArea.classList.add('hide');
            startScreen.classList.remove('hide');

            startScreen.innerHTML = "Game Over <br> Your Final score is " + player.score + " <br> Press here to restart the game";
        }

        function moveEnemy(car){
            let enemy = document.querySelectorAll('.enemy')
            enemy.forEach(function(item){                     // anonymous values

                if(isCollide(car,item)){
                    console.log("Hit");
                    endGame();
                }
                if(item.y >= 750){
                    item.y = -800

                    item.style.left = Math.floor(Math.random() * 350) + "px"
                }
                item.y += player.speed 
                item.style.top = item.y + "px"; 
            })
        }


        function gamePlay(){
            
            let car = document.querySelector('.car');
            if(player.start){

                 moveLines();
                 moveEnemy(car);

                if(keys.ArrowUp && player.y > (0 + 80)) { player.y -= player.speed }     // if top value decreases then car move upwards and road.top = 0
                if(keys.ArrowDown && player.y < (657)) { player.y += player.speed }       // road.bottom = 657
                if(keys.ArrowLeft && player.x > 0) { player.x -= player.speed }
                if(keys.ArrowRight && player.x < (400 - 50)) { player.x += player.speed }      // road.width = 400

                car.style.top = player.y + "px";
                car.style.left = player.x + "px";

                let road = gameArea.getBoundingClientRect();                 // we can get left right top bottom position of a div
            window.requestAnimationFrame(gamePlay);
            //  console.log(player.score++);
            player.score++;
            let ps = player.score - 1;
            score.innerText = "Score : " + ps;
            }
        }



        function randomColor(){

            function c(){
                let hex = Math.floor(Math.random() * 256).toString(16);
                return ("0" + String(hex)).substr(-2)
            }
            return "#"+c()+c()+c();
        }