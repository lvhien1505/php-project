<?php
	/*
		This blogger clone is built by Aizaz Dinho and designed by Meezan(@iammeezi) for course 
		fb.com/aizaz.dinho
		twitter.com/aizazdinho
		instagram.com/aizazdinho
		meralesson.com
	*/ 
	class Validate{
		public static function escape($input){
			$input = trim($input);
			$input = stripcslashes($input);
			$input = htmlentities($input, ENT_QUOTES);
			return $input;
		}

		public static function filterEmail($email){
			return filter_var($email, FILTER_VALIDATE_EMAIL);
		}
	}