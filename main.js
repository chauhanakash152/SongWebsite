 var currentSongNumber = 1;
 var willShuffle = 0;
 var willLoop = 1;
 var willMute =1;
var songs = [{
               'name': 'Badri Ki Dulhania (Title Track)',
               'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
               'album': 'Badrinath ki Dulhania',
               'duration': '2:56',
              'fileName': 'song1.mp3',
              'image':'song1.jpg'
           },
           {
               'name': 'Humma Song',
               'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
               'album': 'Ok Jaanu',
               'duration': '3:15',
               'fileName': 'song2.mp3',
               'image':'song2.jpg'
           },
           {
               'name': 'Nashe Si Chadh Gayi',
               'artist': 'Arijit Singh',
               'album': 'Befikre',
               'duration': '2:34',
               'fileName': 'song3.mp3',
               'image':'song3.jpg'
           },
           {
               'name': 'The Breakup Song',
               'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
               'album': 'Ae Dil Hai Mushkil',
               'duration': '2:29',
               'fileName': 'song4.mp3',
               'image':'song4.jpg'
           }]
function changeCurrentSongDetails(songObj) {
    $('.current-song-image').attr('src','img/' + songObj.image)
    $('.current-song-name').text(songObj.name)
    $('.current-song-album').text(songObj.album)
}
  function toggleSong() // function defination for pausing and playing of song with changing the icon of play and pause
      {
        var song = document.querySelector('audio');
        if (song.paused == true) {
            console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause'); // chainning property
            song.play();  // to play the song
        } else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause(); // for pausing the song
        }
      }
      var songNumber = 1;
      // var isPlaying = false;
      function fancyTimeFormat(time)
        {
            // Hours, minutes and seconds
            // ~~ this means maths.floor() here;
            var hrs = ~~(time / 3600); // covert into hour
            var mins = ~~((time % 3600) / 60); // covert into minutes
            var secs = time % 60; // coverts into seconds

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }
        function updateCurrentTime(){
          var song = document.querySelector('audio');
          var currentTime = Math.floor(song.currentTime);
          var duration = Math.floor(song.duration);
          duration = fancyTimeFormat(duration);
          currentTime= fancyTimeFormat(currentTime);
        //  console.log('value of current time:');
        //  console.log(currentTime);
          $('.time-elapsed').text(currentTime);
          $('.song-duration').text(duration);
        //  console.log(song.duration);
        }

        function addSongNameClickEvent(songObj , position){
        //  console.log('vlaue of positioin:');
        //  console.log(positioin);
              var songName = songObj.fileName;
              var id=  '#song' + position ;
              $(id).click(function() {
                      console.log('value of position:');
                      console.log(position);
                      currentSongNumber = position ;
                      var audio = document.querySelector('audio');
                      var currentSong = audio.src;
                      if(currentSong.search(songName) != -1)
                      toggleSong();
                      else {
                      //  var songObj = songs[position];
                        changeCurrentSongDetails(songObj);
                        audio.src = songName;
                        toggleSong();
                        }
                      //audio.play();
              });
        }
        window.onload = function(){
                    // external plugins for sorting and rearrangin
                  changeCurrentSongDetails(songs[0]);
                updateCurrentTime();      // this is added for the  1st second after that set interval will call it again and gain after 1 second
                setInterval(function(){
                updateCurrentTime();
                updateSongProgress();
              //    $('#songs').datatables();
              },1000);

                // var songName1 = 'Tamma Tamma Again';
                // var songName2 = 'Humma Song';
                // var songName3 = 'Nashe Si Chadh Gayi';
                // var songName4 = 'The Breakup Song';

                           for(var i =0; i < songs.length;i++) {
                                 var obj = songs[i];         // adding the
                                 var name = '#song' + (i+1);
                                 var song = $(name);
                                 song.find('.song-name').text(obj.name);
                                 song.find('.song-artist').text(obj.artist);
                                 song.find('.song-album').text(obj.album);
                                 song.find('.song-length').text(obj.duration);
                                 addSongNameClickEvent(obj,i+1);
                             }
                             $('#songs').DataTable({
                               paging: false
                             });
                // var fileNames =['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'];
                // for ( var i=0 ; i < fileNames.length ; i++) // for all the song in fileNames array
                // addSongNameClickEvent(fileNames[i],i+1);
        }
        function timeJump(){
          var song = document.querySelector('audio');
          song.currentTime = song.duration - 5;
        }
        $('audio').on('ended', function()
      {
        var audio = document.querySelector('audio');
        if(currentSongNumber < 4){
          // play the next song
          var nextSongObj = songs[currentSongNumber]; // since song is arra then currentSongnumber is intialed by 1 then it will always go to next song
          audio.src = nextSongObj.fileName // changing the source of the audio
          toggleSong(); // playing the song of which src has been changed
          changeCurrentSongDetails(nextSongObj); // updatng the details such as image at the bottom
          currentSongNumber = currentSongNumber +1; // increasing the value of currentSongNumber for the next time
        }else{
          // stop playin
          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
          audio.currentTime =0;
        }
      })
      $('.welcome-screen button').on('click', function() {
          var name = $('#name-input').val();
          if (name.length >= 2) {
              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $('.welcome-screen').addClass('hidden');
              $('.main').removeClass('hidden');
          } else {
              $('#name-input').addClass('error');
          }
      });

      $('.fa-repeat').on('click', function(){
        $('.fa-repeat').toggleClass('disabled');
        willLoop = 1 - willLoop;
        console.log('value of wil loop');
        console.log(willLoop);
        if(willLoop == 0)
        {
              $('audio').prop('loop', true);
        }else{
            $('audio').prop('loop', false);
        }
      });

      $('.fa-random').on('click', function(){
        $('.fa-random').toggleClass('disabled');
        willShuffle = 1 - willShuffle;
      });

       $('.fa-step-forward').on('click',function(){   // for next song
         console.log('forward button');
         timeJump();  // call the time jummp that will pplay the song for the last 5 second then after that $('audio').on('ended',function) is triggered
       });
       $('.mute-icon').on('click', function(){
         willMute = 1-willMute;
         if(willMute == 0){
           $('.mute-icon').removeClass('fa-volume-up').addClass('fa-volume-off');
           $('audio').prop('muted', true);
         } else {
           $('.mute-icon').removeClass('fa-volume-off').addClass('fa-volume-up');
           $('audio').prop('muted', false);
         }
       });
       $('.fa-step-backward').on('click',function(){ // for prev song;
         console.log('backword button');
         if(currentSongNumber ==1)   // if the song is at firt song then it's the first song so it have to be played again
         {
           console.log('Executed succesfully');
           var song = document.querySelector('audio');
           song.currentTime = 0;
         }else{       // for other  songs
          // console.log('value of currentSongNumber:');
        //   console.log(currentSongNumber);
           var obj = songs[currentSongNumber - 2]; // obj of the previous song so that it can be used to update the detail of current playing songs
          // console.log('value of currentSongNumber:');
          // console.log(currentSongNumber-2);
          currentSongNumber= currentSongNumber - 1;    // current song number is minus 1 cause , at next time when we want to click on the next song it will hold the index of next element
          // console.log('value of currentSongNumber:');
        //   console.log(currentSongNumber -1);
        //   console.log(obj.name);
        //   console.log(obj.artist);
          changeCurrentSongDetails( obj);   // updating the song details just above the footer of the playing song
          var nextSongObj = songs[currentSongNumber-1]; // since song is arra then currentSongnumber is intialed by 1 then it will always go to next song
          var audio =document.querySelector('audio');
          audio.src = nextSongObj.fileName // changing the source of the audio the previous song
          toggleSong();

         }
       });

      $('.play-icon').on('click', function() {  // on clicking the play the current song
          toggleSong();
      });

      $('body').on('keypress', function(event) {
                  var target = event.target; // tag is being stored here event ovject contains a lot of information, we select the target and then inside target we select tagName
                  // tagName attribute will contain while pressing the key which tag was selected or in which tag we were present at that time
                  if (event.keyCode == 32 && target.tagName != 'INPUT') {
                      toggleSong();
                  }
              });

          function updateSongProgress() {
           var audio = document.querySelector('audio');
           var current = audio.currentTime;       //select the current time of the song
           var total = audio.duration;               // select the total duration of time
           var percent = (current/total) * 100;           // cover them into % so that it can filled according to that
           $('.progress-filled').css("width", percent + "%");  // chaging the css property so that it could show how much it have updated
        }



        // Function - to calculate where click event has occured on progress bar
        $(".player-progress").on('click', function(event) {
           var $this = $(this);
           var width = event.pageX - $this.offset().left;
           var total = $this.width();
           var time = (width/total) * 100;
           var audio = document.querySelector('audio');
           audio.currentTime = (audio.duration * time)/100;
           updateSongProgress();
        })
