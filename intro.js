

window.onload = function() {
starting();
}


function gatheringInfoAnimation(){


  //Loading
    anime({
    targets: '#gathering',
    opacity:1,
    easing: 'easeInOutQuad',
    duration: 2000,
    complete:function(anim){

      //Loading
        anime({
        targets: '#progressValue',
        width:'25%',
        easing: 'easeInOutQuad',
        duration: 1000,
        complete:function(anim){

          document.getElementById("loadingText").innerHTML = "Analyzing the data...";

          anime({
          targets: '#progressValue',
          width:'50%',
          easing: 'easeInOutQuad',
          duration: 1000,
          complete:function(anim){

          document.getElementById("loadingText").innerHTML = "Creating personality parameters based on data...";

          anime({
          targets: '#progressValue',
          width:'75%',
          easing: 'easeInOutQuad',
          duration: 1000,
          complete:function(anim){

          document.getElementById("loadingText").innerHTML = "Generating the orb based on personality...";

          anime({
          targets: '#progressValue',
          width:'100%',
          easing: 'easeInOutQuad',
          duration: 1000,
          complete:function(anim){


                    //Last animation
                    anime({
                    targets: '#introContainer',
                    opacity:0,
                    easing: 'easeInOutQuad',
                    duration: 2000,
                    complete:function(anim){
                      introFinished = true;
                      if(document.getElementById("introContainer") !=null && document.getElementById("introContainer") != undefined) document.getElementById("introContainer").remove();
                    }
                    });

            }
            });


            }
            });

            }
            });

          }
          });



        }
        });

    }





function starting(){

//Loading
  anime({
  targets: '#name',
  opacity:1,
  easing: 'easeInOutQuad',
  duration: 2000,
  complete:function(anim){

    anime({
    targets: '#name',
    delay:1000,
    translateY:-200,
    easing: 'easeInOutQuad',
    duration: 2000,
    complete:function(anim){

   getAccess();

    }
    });

  }
  });

}

function getAccess(){

//Loading
  anime({
  targets: '#access',
  opacity:1,
  easing: 'easeInOutQuad',
  duration: 2000,
  complete:function(anim){
  }
  });

}


function giveAccess(){

  anime({
  targets: '#access',
  opacity:0,
  easing: 'easeInOutQuad',
  duration: 2000,
  complete:function(anim){

gatheringInfoAnimation();

  }
  });

}

// var i = 0;
// function move() {
//   if (i == 0) {
//     i = 1;
//     var elem = document.getElementById("myBar");
//     var width = 10;
//     var id = setInterval(frame, 10);
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//         i = 0;
//       } else {
//         width++;
//         elem.style.width = width + "%";
//         elem.innerHTML = width + "%";
//       }
//     }
//   }
// }
