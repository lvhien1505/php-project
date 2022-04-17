<?php
	/*
		This blogger clone is built by Aizaz Dinho and designed by Meezan(@iammeezi) for course 
		fb.com/aizaz.dinho
		twitter.com/aizazdinho
		instagram.com/aizazdinho
		meralesson.com
	*/ 
	include '../backend/init.php';
	$_SESSION = array();
	session_destroy();
	$userObj->redirect();