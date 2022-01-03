const beats = document.getElementById('beats');
const currentBeat = document.getElementById('currentBeat');
const playPauseBtn = document.getElementById('playPauseBtn');
const playerImg = document.getElementById('playerImg');
const currentBeatName = document.getElementById('currentSong');
const currentTime = document.getElementById('currentTime');
const beatLength = document.getElementById('beatLength');
const cartItemsList = document.getElementById('cartItemsList');
const totalAmount = document.querySelectorAll('.totalAmount');
const musicPlayer = document.getElementById('musicPlayer');
let total = 0;

let playBtn;
let playing = false;



// Show beats
// Add each individual beat to the shop - from the beats.js file
beatList.forEach(beat => {
    const minutes = Math.floor((beat.length)/60);
    const seconds = beat.length - (minutes*60);

    beats.innerHTML += (`
        <div class="card">
            <div class="posRel">
                <img src="${beat.imgUrl}">
                <audio src="${beat.beatUrl}"></audio>

                <i id="playBtn" class="fas fa-play"></i>
            </div>

            <div class="beatInfo">
                <h4>${beat.Name}</h4>

                <p>${beat.tempo} BPM<br>


                ${minutes}:${seconds} min <br>
                ${beat.genre} <br>
                10 USD</p>

                <i id="addBeatBtn" class="fas fa-plus-circle"></i>
            </div>
        </div>
    `)
});


// Pressing play button on beat
const playBtns = document.querySelectorAll('.fa-play');
// play the beat, when pressing the corresponding play button
playBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        let beatUrl = btn.parentElement.children[1].attributes.src.value;
        currentBeat.attributes.src.value = beatUrl;
        currentBeat.play();

        // make the playPauseBtn visible
        playPauseBtn.classList.add('fa-pause');
        playPauseBtn.classList.remove('fa-play');

        // make the music player visible
        musicPlayer.classList.remove('hidden');

        // Set image in musicplayer to coverart of the current beat
        playerImg.src = btn.parentElement.children[0].src;
        
        // set beat name in the musicplayer
        currentBeatName.innerText = btn.parentElement.parentElement.children[1].children[0].textContent;
        
        // Set total length of beat
        currentBeat.onloadedmetadata = () =>{
            const timer = new Date(0);
            timer.setSeconds(currentBeat.duration);
            let timeString = timer.toISOString().substr(14, 5);
            
            beatLength.innerText = timeString;
        }    
    }
)});



// When clicking the addBeatBtn
const addBeatBtns = document.querySelectorAll('.fa-plus-circle');
addBeatBtns.forEach(btn => {
    let beatAdded = false;

    btn.addEventListener('click', () => {
        const beatName = btn.parentElement.children[0].textContent;

        if (!btn.classList.contains('added')) {
            console.log(`${beatName} added to cart`);

            btn.classList.add('added');
        
            cartItemsList.innerHTML += `
                <li class="cartItem"> ${beatName}:
                    <span>10 USD</span> 
                    <i class="fas fa-times"></i>
                </li>
            `;

            // Each beat costs 10 usd
            total += 10;

            setTotalAmount();

            beatAdded = true;
            
            deleteItem(btn);

        } else {
            alert(`${beatName} has already been added :)`);
        }
    
    // end of btn.addEventListener
    });

// end of addBeatBtns.forEach()
});




// set current time of the playing beat in the musicplayer
setInterval(() => {
    const timer = new Date(0);
    timer.setSeconds(currentBeat.currentTime);
    let timeString = timer.toISOString().substr(14, 5);
    
    currentTime.innerText = timeString;
    // console.log(timeString);
}, 1000);



// what happens when the playPauseBtn is pressed
playPauseBtn.addEventListener('click', () => {
    if (currentBeat.paused == true) {
        currentBeat.play();
        playPauseBtn.classList.remove('fa-play')
        playPauseBtn.classList.add('fa-pause');
    } else {
        currentBeat.pause();
        playPauseBtn.classList.remove('fa-pause')
        playPauseBtn.classList.add('fa-play');
    }
});




// This sets the total amount spend both in the cart and in the header
function setTotalAmount() {
        totalAmount.forEach(e => {   
            e.innerText = total;
        });
}



// Pressing the red delete btn
function deleteItem(btn) {
    const deleteItemBtn = document.querySelectorAll('.fa-times');
        deleteItemBtn.forEach(item => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                total -= 10;

                btn.classList.remove('added');

                setTotalAmount();
            })
        });
}



if (window.screen.width <= 600) {
    const cartBtn = document.getElementById('cartBtn');
    const cartItems = document.getElementById('cartItems');
    const overlay = document.getElementById('overlay');

    overlay.style.height = `${document.body.clientHeight}px`;

    cartBtn.addEventListener('click', () => {
        cartItems.style.display = 'block';
        overlay.style.display = 'block';
        console.log(overlay.clientHeight);

    });

    overlay.addEventListener('click', () => {
        cartItems.style.display = 'none';
        overlay.style.display = 'none';
    })
}

console.log(document.body.clientHeight);
console.log(document.body.scrollHeight);
console.log(beats.scrollHeight);
console.log(document.body);
console.log(document.body.scrollHeight);
console.log(document.body.offsetHeight);
