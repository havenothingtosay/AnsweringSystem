<?php
$answer = array("Amy","Bubbery","Cat","Denny","Edsion","Fairy","Godiv","Haier","Ice","Json","Kiston","Lamer","Merger","Nike","Original","Poka","Queen","Radius","Sea","Ted");
$q = $_POST['question_input'];
//echo strtolower(substr($q, 0,1));
//echo strtolower(substr($answer[0], 0,1));
if(strlen($q)>0){
	//echo "success";
	for($i = 0;$i<count($answer);$i++)
	{
		if(strtolower(substr($q, 0,1)) == strtolower(substr($answer[$i], 0,1))){
			$ans = $answer[$i];
			break;
		}
		else
			$ans = "no response";
		    
	}
}
	echo $ans;
?>