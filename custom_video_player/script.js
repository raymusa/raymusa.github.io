

window.onload = function() { // sets initial behavior on page loading

	// Video
	var video = document.getElementById("video");

	// Buttons
	var playButton = document.getElementById("play-pause");
	var fast_forward = document.getElementById("ff");
    var skip = 2;
    var fast = document.getElementById("fast");
	var muteButton = document.getElementById("mute");
	var fullScreenButton = document.getElementById("full-screen");
    var intervalRewind;


	// Sliders
	var seekBar = document.getElementById("seek-bar");
	var volumeBar = document.getElementById("volume-bar");



	/*video.playbackRate = 1.0;
    clearInterval(intervalRewind);*/

   /* playButton.addEventListener("click", function() {
			// Play the video
			video.play();
		
	});*/

	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
		if (video.paused == true) {
			// Play the video
			video.play();
			video.playbackRate = 1.0;
            clearInterval(intervalRewind);
				// Update the button text to 'Pause'
			playButton.innerHTML = "Pause";
		} else {
			// Pause the video
			video.pause();

			// Update the button text to 'Play'
			playButton.innerHTML = "Play";

		}
	});



	fast_forward.addEventListener("click", function(){

		video.currentTime += skip;// takes current time and adds "value" to it

	
});
	
	


    
    fast.addEventListener("click", function(){
    document.querySelector('video').playbackRate = 2.0;
    });

  

    reverse.addEventListener("click", function(){
    //button function for rewind
     playback(1.0);
    });

    function playback(rewindSpeed) {    
   clearInterval(intervalRewind);
   var startSystemTime = new Date().getTime();
   var startVideoTime = video.currentTime;
   
   intervalRewind = setInterval(function(){
       video.playbackRate = 1.0;
       if(video.currentTime == 0){
           clearInterval(intervalRewind);
           video.pause();
       } else {
           var elapsed = new Date().getTime()-startSystemTime;
           //log.textContent='Rewind Elapsed: '+elapsed.toFixed(3);
           video.currentTime = Math.max(startVideoTime - elapsed*rewindSpeed/1000.0, 0);
       }
   }, 30);
}





 


	//Event listener for mute button
	muteButton.addEventListener("click",function() {
		if (video.muted == false){ // if the volume is on
             video.muted = true;// mute the video
             //Update the button text
             muteButton.innerHTML ="Unmute";

		}else{
			//Unmute the video
			video.muted=false;
            // Update the button text

			muteButton.innerHTML ="mute";
     }

});

	//Event listener for fullscreen button
	fullScreenButton.addEventListener("click", function() {
        if(video.requestFullscreen){
           video.requestFullscreen();
        }else if(video.mozRequestFullScreen){
        	video.mozRequestFullScreen();// Firefox
        }else if(video.webkitRequestFullscreen){
        	video.webkitRequestFullscreen();//Chrome & Safari
        }

	});

	//Event listener for volume bar
	volumeBar.addEventListener("change", function(){
     //Update the video volume
     video.volume=volumeBar.value;

	});

	//Event listener for seek bar
	seekBar.addEventListener("change", function(){
    // Calculate the time
    var time = video.duration * (seekBar.value / 100);
		// Update the video's time
		video.currentTime = time;

	});
	// Update the seek bar as the video plays
	video.addEventListener("timeupdate", function() {
		// Calculate the slider value
		var value = (100 / video.duration) * video.currentTime;

		// Update the slider value
		seekBar.value = value;
	});

	// Pause the video when the seek handle is being dragged
	seekBar.addEventListener("mousedown", function() {
		video.pause();
	});

	// Play the video when the seek handle is dropped
	seekBar.addEventListener("mouseup", function() {
		video.play();
	});

}






	