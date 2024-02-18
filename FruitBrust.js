document.addEventListener('DOMContentLoaded', () => {
    // alert("Welcome to Juicy World")
    var delay_popup = 100; 
    setTimeout("document.getElementById('overlay').style.display='block'", delay_popup)
    
    const Name = document.getElementById('playerName')
    const displayname = document.getElementById('displayname')
    const Btn1 = document.getElementById('btn')
    const target = document.getElementById('target')
    const randomTarget = randomNumber(100, 200)
    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    Btn1.addEventListener("click", function () {
        // let gameover = minutesTar
        displayname.innerHTML = Name.value
        console.log("this is target")
        
        target.innerHTML = `Target : ${targetScore}`
        
        let time = parseInt(startingMinutes * 60 /3.6) 
        let gameOverTime = time*1000


        setTimeout(() => {
            setTimeout("document.getElementById('gameOver').style.display='block'", 1000)
            countDown.innerHTML = `Time left  00:00`
            console.log("game over")
        }, gameOverTime);
        console.log(time)
        const countDown = document.getElementById('countdown')
        
        setInterval(updateTime, 1000)
        
        function updateTime() {
            const minutes = Math.floor(time / 60)
            let seconds = time % 60
            countDown.innerHTML = `Time left  ${minutes}:${seconds}`
            
            time--;
        }
        
        
    });
    let targetScore = randomTarget
    minutesTar = targetScore/60
    console.log(minutesTar)
    const startingMinutes = minutesTar
    const grid = document.querySelector('.grid')
    let scoreDisplay = document.getElementById('score')
    let width = 8;
    let squares = []
    let score = 0
    function playit() {
        document.getElementById('audio').play()

    }


    let candyColor = [

        'url(pineapple-png.png)',
        'url(orange-png.png)',
        'url(mango-png.png)',
        'url(grape-png.png)',
        'url(apple-png.png)'
    ]
    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage =
                    squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = "";
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundImage === "") {
                    let randomImage=Math.floor(Math.random()*candyColor.length)
                    squares[i].style.backgroundImage=candyColor[randomImage];
                }
            }
        }
    }
    //create Board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColor.length)
            square.style.backgroundImage = candyColor[randomColor]


            grid.appendChild(square)
            squares.push(square)

        }

    }

    createBoard()

    // let emptyarr= squares.map(function(element){
    //     return element.style.backgroundImage = ''

    // })
    // console.log(emptyarr)

    // drag candies
    //          nameofFunction  square for event
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    let colorBeingDragged
    let colorBeingReplaced
    let squareIdbeingDragged
    let squareIdbeingReplaced


    function dragStart() {
        // console.log(this.id ,"dragstart")

        colorBeingDragged = this.style.backgroundImage
        squareIdbeingDragged = parseInt(this.id)
        // console.log(colorBeingDragged)

    }


    function dragOver(e) {
        e.preventDefault()
        // console.log(this.id , 'dragover')

    }

    function dragEnter(e) {
        e.preventDefault()

        // console.log(this.id ,'dragenter')

    }

    function dragLeave() {
        // console.log(this.id ,"dragleave")

    }

    function dragDrop() {
        // console.log(this.id ,"dragdrop")
        colorBeingReplaced = this.style.backgroundImage
        squareIdbeingReplaced = parseInt(this.id)
        this.style.backgroundImage = colorBeingDragged
        squares[squareIdbeingDragged].style.backgroundImage = colorBeingReplaced
    }

    function dragEnd() {
        // console.log(this.id ,"dragend")
        // what is valid move
        let validMoves = [
            squareIdbeingDragged - 1,
            squareIdbeingDragged - width,
            squareIdbeingDragged + 1,
            squareIdbeingDragged + width
        ]
        let validMove = validMoves.includes(squareIdbeingReplaced)
        const isARowOfThree = checkRowForThree()
        const isARowOfFour = checkRowForFour()
        const isARowOfFive = checkRowForFive()
        const isAColumnOfThree = checkColumnForThree()
        const isAColumnOfFour = checkColumnForFour()
        const isAColumnOfFive = checkColumnForFive()
        if (squareIdbeingReplaced && validMove &&
            (isARowOfThree || isARowOfFour || isARowOfFive || isAColumnOfFive || isAColumnOfFour || isAColumnOfThree)) {
            colorBeingDragged = null
            colorBeingReplaced = null
        }
        else if (squareIdbeingReplaced && !validMove) {
            squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdbeingDragged].style.backgroundImage = colorBeingDragged
        }
        else if (squareIdbeingReplaced && validMove) {
            squares[squareIdbeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdbeingDragged].style.backgroundImage = colorBeingDragged
        }
        // else squares[squareIdbeingDragged].style.backgroundImage = colorBeingDragged


    }

    // checking for matches
    // check row for Five
    function checkRowForFive() {
        for (i = 0; i < 59; i++) {
            let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            //    const notValid = [ 1,2,5,6,44,15,30,18,22,25,27,35,40,45,50,53,55,60]
            //    if (notValid.includes(i)) continue
            if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 15
                let intScore = scoreDisplay.innerHTML
                let Integer = parseInt(intScore)
            
                if (Integer >= targetScore) {
                    console.log("target reached")
                    setTimeout("document.getElementById('targetAchieved').style.display='block'", 100)
                   }
                scoreDisplay.innerHTML = score

                rowOfFive.forEach(index => {
                    document.getElementById('audio').play();
                    squares[index].style.backgroundImage = '';

                })
                return true
            }
        }
    }
    checkRowForFive()


    // checking for matches
    // check column for Five
    function checkColumnForFive() {
        for (i = 0; i < 40; i++) {
            let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 15
                let intScore = scoreDisplay.innerHTML
                let Integer = parseInt(intScore)
            
                if (Integer >= targetScore) {
                    console.log("target reached")
                    setTimeout("document.getElementById('targetAchieved').style.display='block'", 100)
                   }
                scoreDisplay.innerHTML = score

                columnOfFive.forEach(index => {
                    document.getElementById('audio').play()
                    squares[index].style.backgroundImage = ''

                })
                return true
            }
        }
    }

    // check row for Four
    function checkRowForFour() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            // const notValid = [ 1,2,5,6,13,15,18,22,25,27,30,35,40,45,50,55,60]
            // if (notValid.includes(i)) continue
            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 12
                let intScore = scoreDisplay.innerHTML
                let Integer = parseInt(intScore)
            
                if (Integer >= targetScore) {
                    console.log("target reached")
                    setTimeout("document.getElementById('targetAchieved').style.display='block'", 100)
                   }
                scoreDisplay.innerHTML = score

                rowOfFour.forEach(index => {
                    document.getElementById('audio').play();
                    squares[index].style.backgroundImage = '';

                })
                return true
            }
        }
    }
    checkRowForFour()


    // checking for matches
    // check column for three
    function checkColumnForFour() {
        for (i = 0; i < 45; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score +=12
                let intScore = scoreDisplay.innerHTML
                let Integer = parseInt(intScore)
            
                if (Integer >= targetScore) {
                    console.log("target reached")
                    setTimeout("document.getElementById('targetAchieved').style.display='block'", 100)
                   }
                scoreDisplay.innerHTML = score

                columnOfFour.forEach(index => {
                    document.getElementById('audio').play();
                    squares[index].style.backgroundImage = '';

                })
                return true
            }
        }
    }

    // checking for matches
    // check row for three
    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            // const notValid = [ 5,6,13,15,22,25,27,35,40,45,55,60]
            // if (notValid.includes(i)) continue
            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 12
                let intScore = scoreDisplay.innerHTML
                let Integer = parseInt(intScore)
            
                if (Integer >= targetScore) {
                    console.log("target reached")
                    setTimeout("document.getElementById('targetAchieved').style.display='block'", 100)
                   }
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    document.getElementById('audio').play();
                    squares[index].style.backgroundImage = '';
                })
                return true
            }
        }
    }
    checkRowForThree()


    // checking for matches
    // check column for three
    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''
            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 12
                let intScore = scoreDisplay.innerHTML
                let Integer = parseInt(intScore)
                
                if (Integer >= targetScore) {
                    console.log("target reached")
                    setTimeout("document.getElementById('targetAchieved').style.display='block'", 100)
                   }
                scoreDisplay.innerHTML = score

                columnOfThree.forEach(index => {
                    document.getElementById('audio').play()
                    squares[index].style.backgroundImage = ''

                })
                return true
            }
        }
    }
    checkColumnForThree()


    // checking for matches

    // drop candies once some have been cleared

    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage =
                    squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = "";
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
                const isFirstRow = firstRow.includes(i);
                if (isFirstRow && squares[i].style.backgroundImage === "") {
                    let randomImage=Math.floor(Math.random()*candyColor.length)
                    squares[i].style.backgroundImage=candyColor[randomImage];
                }
            }
        }
    }

    let zeroScore = 1;

    function makeZeroScore() {


        score = 0
        scoreDisplay.innerHTML = score


    }
    makeZeroScore()



    checkColumnForFour()
    window.setInterval(function () {
        checkColumnForFive()
        checkRowForFive()
        checkRowForFour()
        checkColumnForFour()
        checkColumnForThree()
        checkRowForThree()
        moveDown()
        // zero()


    }, 100)




    // console.log(score)
    setTimeout(() => {
        // console.log("this")
        makeZeroScore()
    }, 8000);
   
  
   

})
