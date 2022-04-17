<?php
	/*
		This blogger clone is built by Aizaz Dinho and designed by Meezan(@iammeezi) for course 
		fb.com/aizaz.dinho
		twitter.com/aizazdinho
		instagram.com/aizazdinho
		meralesson.com
	*/ 
	session_start();

	spl_autoload_register(function($class){
		require 'classes/'.$class.'.php';
	});
  
	define("DB_HOST", "localhost");
	define("DB_NAME", "blogger");
	define("DB_USER", "root");
	define("DB_PASS", "");

	
	$userObj       = new Users;
	$dashObj       = new Dashboard;
	$blogObj       = new Blog;
	$layoutObj     = new Layout;
	$templateObj   = new Template;
	$statsObj      = new Stats;
   
	if($blog = $blogObj->getBlog()){
		define("BASE_URL", "http://{$blog->Domain}.localhost/MyBlogger/");
	}else{
		define("BASE_URL", "http://localhost/MyBlogger/");
	}