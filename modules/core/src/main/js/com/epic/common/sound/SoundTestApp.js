/**
 * Created with IntelliJ IDEA.
 * User: Andy
 * Date: 17/12/13
 * Time: 15:31

 * To change this template use File | Settings | File Templates.
 */
goog.provide('com.epic.common.sound.SoundTestApp');

goog.require('com.epic.common.sound.SoundChannel');
goog.require('com.epic.common.sound.SoundClip');
goog.require('com.epic.common.sound.SoundManager');
goog.require('com.epic.common.sound.SoundMixer');


var sounds = ["Scale"];
var myRef = "soundFile";
var loadedCount = 0;
var assetPath = "sounds/";

var end = 800;

var notes = [{note:"C", time:300},{note:"E", time:300},{note:"G", time:300},{note:"B", time:300},{note:"A", time:300},{note:"G", time:300},{note:"E", time:300},{note:"C", time:300},{note:"D", time:300},{note:"F", time:300},{note:"A", time:300},{note:"C", time:300},{note:"B", time:300}];
//var notes = [{note:"A", time:1500},{note:"B", time:1500},{note:"C", time:1500},{note:"D", time:1500}];

var noteCount = 0;

var sm;

var src = assetPath + sounds[0] + ".ogg";


function playManyNotes()
{
    sm.root.getSound("C").play();
    sm.root.getSound("E").play();
    sm.root.getSound("G").play();
}

// import SoundMixer

function SoundTestApp()
{

    this.currentSound = null;

    createjs.Sound.alternateExtensions = ["mp3"];

    sm = SoundManager.getInstance();
    console.log("Hello Woooooooooooooorld!");

    for (var i = 0; i < sounds.length; i++) {

        createjs.Sound.addEventListener("fileload", createjs.proxy(handleLoadComplete, this)); // add an event listener for when load is completed
        createjs.Sound.registerSound(src, myRef);
    }

    function handleLoadComplete(event) {
        loadedCount++;
        if(loadedCount == sounds.length)
        {
            alert("All Sound Loaded");
        }
        //this.doTest();
        //createjs.Sound.play(myRef);
    }

}

SoundTestApp.prototype.doTest = function()
{
    //Instantiate SoundManager and store a reference

    var sc = new SoundChannel("sfx");
    sm.root.addChannel(sc);

    //Register the files witht the sound manager
    //var src = assetPath + "Scale" + ".ogg|" + assetPath + "Scale" + ".mp3";
    console.log("Lets register " + src + " " + myRef);
    //createjs.Sound.registerSound(src, myRef);
    //var inst = createjs.Sound.play(myRef);
    //console.log("Duration " + inst.getDuration());
    /*sm.addFile(myRef, src);*/


    //get the sfx channel
    var sfx = sm.root.getChannel("sfx");

    //Add some sounds to it
    sfx.addSound("C", new SoundClip("C", myRef, 0, 2000, 0, 2000));
    sfx.addSound("D", new SoundClip("D", myRef, 4000, 6000, 0, 2000));
    sfx.addSound("E", new SoundClip("E", myRef, 8000, 10000, 0, 2000));
    sfx.addSound("F", new SoundClip("F", myRef, 10000, 12000, 0, 2000));
    sfx.addSound("G", new SoundClip("G", myRef, 14000, 16000, 0, 2000));
    sfx.addSound("A", new SoundClip("A", myRef, 18000, 20000, 0, 2000));
    sfx.addSound("B", new SoundClip("B", myRef, 22000, 24000, 0, 2000));

    //sfx.addSound("reelStop", new Sound("reelStop", "sounds1", 200, 250));

    //If you know the exact channel location you can play the sound directly
    //sfx.getSound("C").play();

    //It is recommended to use SoundManager.getSound(id) as this will work even if the sound is moved to a different channel etc
    var startTime = 0;
    //0 loops will loop forever
    //var numLoops = 0;
    //sm.root.getSound("C").mixer.setVolume(1);
    //sm.root.getSound("C").play(); //startTime, numLoops);//.mixer.setVolume(0).mixer.volumeFadeTo(1, 1000);

    //sm.root.getSound("C").play();
    this.playNextNote();
    //playManyNotes();
    //createjs.Sound.play(myRef);
    //sm.root.mixer.volumeFadeTo(0, 1000);
}


SoundTestApp.prototype.playNextNote = function()
{
    console.log("**** playNextNote " + noteCount + " == " + notes.length);
    if(noteCount == notes.length)
    {
        console.log("End of Song");
        noteCount = 0;
        //sm.root.stopAllSounds();
        var inst = this;
        setTimeout(function(){inst.playNextNote()}, 2000);
        return;
    }
    var noteObj = notes[noteCount];
    console.log("PLAY " + noteObj.note + " " + noteObj.time);
    //sm.root.stopAllSounds();
    if(this.currentSound)
    {
        this.currentSound.stop();
    }
    this.currentSound = sm.root.getSound(noteObj.note);
    sm.root.getSound(noteObj.note).play();
    var inst = this;
    setTimeout(function(){inst.playNextNote()}, noteObj.time);
    //sm.root.getSound(notes[noteCount]).onComplete = playNextNote;
    noteCount++;
}