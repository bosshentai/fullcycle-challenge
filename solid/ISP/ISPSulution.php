

<?php 

interface Movie 
{
  public function play();
}

interface AudioControl {
  public function increaseVolume();
}


class TheLionKing implements Movie, AudioControl{

  public function play()
  {
    // play the movie
  }


  public function increaseVolume(){}

}


class ModerTimes implements Movie {

  public function play(){
    // play the movie
  }
}