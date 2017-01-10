/**
 * Created with IntelliJ IDEA.
 * User: Andy
 * Date: 16/12/13
 * Time: 14:20

 * To change this template use File | Settings | File Templates.
 */

var end = 800;

//var notes = ["C","A","D","B","E","C","F","D","G","F","E"];
var notes = [{note:"C", time:300},{note:"E", time:300},{note:"G", time:300},{note:"B", time:300},{note:"A", time:300},{note:"G", time:300},{note:"E", time:300},{note:"C", time:300},{note:"D", time:300},{note:"F", time:300},{note:"A", time:300},{note:"C", time:300},{note:"B", time:300}];
var noteCount = 0;

var sm = SoundManager.getInstance();

function doTest()
{

    //Instantiate SoundManager and store a reference

    var sc = new SoundChannel("sfx");
    sm.root.addChannel(sc);

    //Register the files witht the sound manager
    var src = assetPath + "Scale" + ".ogg|" + assetPath + "Scale" + ".mp3";
     //createjs.Sound.registerSound(src, myRef);
    //var inst = createjs.Sound.play(myRef);
    //console.log("Duration " + inst.getDuration());
    /*sm.addFile(myRef, src);*/


    //get the sfx channel
    var sfx = sm.root.getChannel("sfx");

    //Add some sounds to it
    sfx.addSound("C", new Sound("C", myRef, 0, 2000, 0, 2000));
    sfx.addSound("D", new Sound("D", myRef, 4000, 6000, 0, 2000));
    sfx.addSound("E", new Sound("E", myRef, 8000, 10000, 0, 2000));
    sfx.addSound("F", new Sound("F", myRef, 10000, 12000, 0, 2000));
    sfx.addSound("G", new Sound("G", myRef, 14000, 16000, 0, 2000));
    sfx.addSound("A", new Sound("A", myRef, 18000, 20000, 0, 2000));
    sfx.addSound("B", new Sound("B", myRef, 22000, 24000, 0, 2000));

    //sfx.addSound("reelStop", new Sound("reelStop", "sounds1", 200, 250));

    //If you know the exact channel location you can play the sound directly
    //sfx.getSound("C").play();

    //It is recommended to use SoundManager.getSound(id) as this will work even if the sound is moved to a different channel etc
    var startTime = 0;
    //0 loops will loop forever
    //var numLoops = 0;
    //sm.root.getSound("C").mixer.setVolume(1);
    //sm.root.getSound("C").play(); //startTime, numLoops);//.mixer.setVolume(0).mixer.volumeFadeTo(1, 1000);

    playNextNote();
    //playManyNotes();
    sm.root.mixer.volumeFadeTo(0, 1000);

}

function playManyNotes()
{
    sm.root.getSound("C").play();
    sm.root.getSound("E").play();
    sm.root.getSound("G").play();
}

function playNextNote()
{
    if(noteCount == notes.length)
    {
        noteCount = 0;
        sm.root.stopAllSounds();
        setTimeout(playNextNote, 2000);
        return;
    }
    var noteObj = notes[noteCount];
    sm.root.getSound(noteObj.note).play();
    setTimeout(playNextNote, noteObj.time);
    //sm.root.getSound(notes[noteCount]).onComplete = playNextNote;
    noteCount++;
}
