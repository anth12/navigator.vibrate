(function(){

  var vibrationQueue = [];
  var vibrateTimerId = -1; 

  function vibrate(vibrationPattern) {
    
    stop();

    switch(typeof(vibrationPattern)){
      case "number":
        vibrationQueue = [ vibrationPattern ];
      break;
      case "string":
        vibrationQueue = [ parseInt(vibrationPattern) ];
      break;
      case "object":
        vibrationQueue = vibrationPattern;
      break;
    }

    processQueue();
  }

  function processQueue(){

    // Process a vibration
    if(vibrationQueue.length >= 1){
      document.body.className += ' simulate-vibreate-animation';

      vibrateTimerId = setTimeout(function(){
        
        stop();

        // Remove the executed vibration
        vibrationQueue.splice(0, 1);

        // Process a sleep
        if(vibrationQueue.length >= 1){
          vibrateTimerId = setTimeout(function(){

            // Remove the executed sleep
            vibrationQueue.splice(0, 1);

            // Recurse the queue processing
            processQueue();

          }, vibrationQueue[0]);

        }

      }, vibrationQueue[0]);
    }

  }

  function vibrateWindow(lengthOfTime) {
    return new Promise(function(success, fail){
      document.body.className += ' simulate-vibreate-animation';

      vibrateTimerId = setTimeout(function(){
        stop();
        success();

      }, lengthOfTime);
    });
  }

  function sleep(lengthOfTime) {
    return new Promise(function(success, fail){
      
      vibrateTimerId = setTimeout(function(){
        success();
      }, lengthOfTime);

    });
  }

  function stop(){
    document.body.className = document.body.className.replace(' simulate-vibreate-animation', '');
    clearTimeout(vibrateTimerId);
  }

  // Override the native vibrate impementation
  window.navigator.vibrate = vibrate;
})()