console.log("hello");

// initialise variables
let index = 1;
let audioElement = new Audio('assets/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let gif2 = document.getElementById("gif2");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

// songs array
let songs = [
    { songName: "song 1", filePath: "assets/1.mp3", coverPath: "assets/1.jpg" },
    { songName: "song 2", filePath: "assets/2.mp3", coverPath: "assets/5.jpg" },
    { songName: "song 3", filePath: "assets/3.mp3", coverPath: "assets/3.jpg" },
    { songName: "song 4", filePath: "assets/4.mp3", coverPath: "assets/4.jpg" },

    { songName: "song 5", filePath: "assets/5.mp3", coverPath: "assets/5.jpg" },
    { songName: "song 6", filePath: "assets/6.mp3", coverPath: "assets/6.jpg" },
    { songName: "song 7", filePath: "assets/7.mp3", coverPath: "assets/7.jpg" },
    { songName: " song 8", filePath: "assets/8.mp3", coverPath: "assets/8.jpg" },
];


// to give respective images to each song item provided in the songs array
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// PLAY/PAUSE functionality of the main button when clicked
masterPlay.addEventListener("click", () => {

    // condition true, if the song is paused or its time is less or equal to 0sec
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        // updates the button of the respective song which is being played
        document.getElementById(`${index}`).classList.remove("fa-circle-play");
        document.getElementById(`${index}`).classList.add("fa-circle-pause");
        
        // triggers the gif 
        gif.style.opacity = 1;
        gif2.style.opacity = 1;
    }
    else {
        audioElement.pause();

        // stops the gif
        gif.style.opacity = 0;
        gif2.style.opacity = 0;

        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');

        // updates the button of the respective song which is paused 
        Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>
        {
            element.classList.remove("fa-circle-pause");
            element.classList.add("fa-circle-play");
        })
    }
})

// Listen to event
audioElement.addEventListener("timeupdate", () => {
    // update seeker
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

// updaating the progress bar of the song
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})

// updating the buttons on each song
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    })
}

// playing songs using the song items when clicked on
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {

        // condition true, when the song is paused or time is less or equal to 0
        // this condition plays the song and updates the icons
        if(audioElement.paused || audioElement.currentTime<=0){
            makeAllPlays();
        
            index = parseInt(e.target.id);
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");

            audioElement.src = `assets/${index}.mp3`;
            masterSongName.innerText = songs[index - 1].songName;
            audioElement.play();

            gif.style.opacity = 1;
            gif2.style.opacity = 1;
            
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        
        // condition true, if the song is being played 
        else if(audioElement.played || audioElement>0){
               
            // condition true if the songItem which is clicked on is the SAME 
            // songItem which is being played
            if(parseInt(e.target.id)==`${index}`){
                audioElement.pause();
                gif.style.opacity = 0;
                gif2.style.opacity = 0;
    
                e.target.classList.remove("fa-circle-pause");
                e.target.classList.add("fa-circle-play");
    
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                   
            }

            // condition triggered, if the songItem which is clicked on is NOT SAME
            // as songItem which is being
            else{
                console.log("else if then else");
                makeAllPlays();
            
                index = parseInt(e.target.id);
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");

                audioElement.src = `assets/${index}.mp3`;
                masterSongName.innerText = songs[index - 1].songName;
                audioElement.play();

                gif.style.opacity = 1;
                gif2.style.opacity = 1;
            
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            }
        }

        // condition triggered when,we want to pause the song
        else{
            audioElement.pause();
            gif.style.opacity = 0;
            gif2.style.opacity = 0;

            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");

            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            
        }
    })
})

// making next button work
document.getElementById("next").addEventListener('click', () => {
    if (index >= 8) {
        index = 1;
    }
    else {
        index += 1;
    }
    audioElement.src = `assets/${index}.mp3`;
    masterSongName.innerText = songs[index - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
 
    for(let i=1; i<=8; i++){
        if(index==i){
            document.getElementById(`${i}`).classList.remove("fa-circle-play");
            document.getElementById(`${i}`).classList.add("fa-circle-pause");
        }
        else if(i<index || i==8){
            document.getElementById(`${i}`).classList.remove("fa-circle-pause");
            document.getElementById(`${i}`).classList.add("fa-circle-play");
        }
    }

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    gif2.style.opacity = 1;
})

// making previous button work
document.getElementById("previous").addEventListener('click', () => {
    if (index <= 1) {
        index = 1;
    }
    else {
        index -= 1;
    }
    audioElement.src = `assets/${index}.mp3`;
    masterSongName.innerText = songs[index - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    
    for(let i=1; i<=8; i++){
        if(index==i){
            document.getElementById(`${i}`).classList.remove("fa-circle-play");
            document.getElementById(`${i}`).classList.add("fa-circle-pause");
        }
        else if(i>index || i==1){
            document.getElementById(`${i}`).classList.remove("fa-circle-pause");
            document.getElementById(`${i}`).classList.add("fa-circle-play");
        }
    }

    gif.style.opacity = 1;
    gif2.style.opacity = 1;
})