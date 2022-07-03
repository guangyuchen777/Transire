
var canUseAudio = false;

var emotionalScore = 1;

var listeningToVoice = false;
var performingAnimation = false;

var transcriptionPara = document.querySelector('.text_output');
var emotionPara = document.querySelector('.emotion_output');
var interactionPara = document.querySelector('.interaction_output');

if ("webkitSpeechRecognition" in window) {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
  canUseAudio = true;
}else{
  console.log("Speech Recognition Not Available")
  transcriptionPara.innerHTML = "Talking is supported only in Chrome..." ;
}






if (canUseAudio) testSpeech();
function testSpeech() {


  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ;';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;


  recognition.start();
  recognition.onresult = function(event) {
    const results = event.results
    const transcript = results[results.length-1][0].transcript

    var speechResult = event.results[0][0].transcript.toLowerCase();

    if(wakedUp) transcriptionPara.innerHTML = speechResult;

if( event.results[0].isFinal){
   console.log("Final" , event.results[0].isFinal);
   fetch(`https://funeralproject.ey.r.appspot.com/emotion?text=${transcript}`)
//  fetch(`http://localhost:8080/emotion?text=${transcript}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if(wakedUp){
          emotionPara.innerHTML = "Emotion score: " + result.score;
          emotionalScore = result.score;
        }

        if (result.score > 0) {
          //setEmoji('positive')
          reactPositively();
        } else if (result.score < 0) {
          //setEmoji('negative')
          reactNegatively();
        } else {
          //setEmoji('neutral')
          reactNeutraly();
        }
      })
      .catch((e) => {
        console.error('Request error -> ', e)
        recognition.abort()
      })
}




  }


  recognition.onspeechend = function() {
    recognition.stop();

  }

  recognition.onerror = function(event) {
    transcriptionPara.textContent = ' ' + event.error;
  }

  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }

  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }

  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
      if(!performingAnimation) stopListeningAnimation();
      testSpeech();
  }

  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }

  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }

  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }

  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');

          if(!listeningToVoice){
            anime({
            targets: animationParameters,
            speed: 0.1,
            easing: 'easeOutQuad',
            duration:800,
            complete:function(anim){
            listeningToVoice = true;
            }
          });
        }

  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}

function stopListeningAnimation(){
  anime({
  targets: animationParameters,
  speed: 1,
  easing: 'easeOutQuad',
  duration:800,
  complete:function(anim){
  listeningToVoice = false;
  }
  });
}


function reactPositively(){
  performingAnimation = true;
  var pr = constrain(emotionalScore,0,4);
    anime({
    targets: animationParameters,
    secondBrightness:2,
    loop: 2*pr,
    direction: 'alternate',
    easing: 'easeOutBounce',
    duration: 500,
    complete:function(anim){

    }
    });

    anime({
    targets: animationParameters,
    firstBrightness:2,
    delay: 250,
    loop: 2*pr,
    direction: 'alternate',
    easing: 'easeOutBounce',
    duration: 500,
    complete:function(anim){
      stopListeningAnimation();
        performingAnimation = false;
    }
    });



    anime({
    targets: animationParameters,
    wiggleness:1*pr,
    loop: 2*pr,
    direction: 'alternate',
    easing: 'easeInOutSine',
    duration: 500,
    complete:function(anim){
    }
    });



}

function reactNeutraly(){
   stopListeningAnimation();
}

function reactNegatively(){
    var pr = constrain(emotionalScore,-4,0);
  performingAnimation = true;
    anime({
    targets: animationParameters,
    brightness: 2,
    size: 2,
    speed: 0.1/(-1*pr),
    delay: 200,
    loop: 2*(-1*pr),
    direction: 'alternate',
    easing: 'easeInOutQuad',
    duration: 1000,
    complete:function(anim){
      stopListeningAnimation();
      performingAnimation = false;
    }
    });

}





function openPopUp(){
  console.log("opening popup");
  anime({
    targets: '#aboutBox',
    translateX:0,
    easing: 'linear',
    duration: 800,
    complete:function(anim){
      }
  });
}

function closePopUp(){
  anime({
    targets: '#aboutBox',
    translateX:500,
    easing: 'linear',
    duration: 800,
    complete:function(anim){
      }
  });
}
