Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality:90
    });
    camera=document.getElementById("camera");
    Webcam.attach('#camera');
    function take_snapshot(){
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
        });
    }
    console.log('ml5 version:',ml5.version);
    classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/s_0u0gsty/model.json',modelLoaded);
    function modelLoaded(){
        console.log('Model loaded!');
    }

    function check(){
        img=document.getElementById('captured_image');
        classifier.classify(img,gotResult);
    }

    function gotResult(){
        if(error){
            console.error(error);
    
        }else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML=results[0].label;
            document.getElementById("result_emotion_name2").innerHTML=results[1].label;
            prediction_1=result[0].label;
            prediction_2=result[1].label;
            speak();
            if(results[0].label=="thumbs up"){
                document.getElementById("update_emoji").innerHTML="&#128077;";
            }
            if(results[0].label=="thumbs down"){
                document.getElementById("update_emoji").innerHTML="&#128078";
            }
            if(results[0].label=="nice"){
                document.getElementById("update_emoji").innerHTML="&#128076;";
            }
            if(results[1].label=="thums up"){
                document.getElementById("update_emoji2").innerHTML="&#128077;";
            }
            if(results[1].label=="thumbs down"){
                document.getElementById("update_emoji2").innerHTML="&#128078";
            }
            if(results[1].label=="nice"){
                document.getElementById("update_emoji2").innerHTML="&#128076;";
            }
        }
    }

    function speak(){
        var synth=window.speechSynthesis;
        speak_data_1="The First Prediction Is "+prediction_1;
        speak_data_2="The Second Prediction Is "+prediction_2;
        var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
        synth.speak(utterThis);
    }