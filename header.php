<!DOCTYPE html>
<html>
<head>
	<title>Sarah Blikre - Arlington WA Web Developer</title>
	<meta name="descripton" content="Personal web development portfolio of Sarah Blikre">

	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

	<link rel="stylesheet" type="text/css" href="css/style.css" />
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
	<link href="fontawesome/css/all.css" rel="stylesheet" type="text/css">

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</head>
<body class="<?php echo (isset($_GET['resume']) && $_GET['resume'] == '1' ? 'resume-modal-active' : ''); ?>">

	<div class="page-wrap">
		<main class="site-main">

			<section class="page-section secondary">
				<div class="inner">

					<img src="images/me.jpg" class="selfie" />

					<h2 class="name">Sarah Blikre</h2>
					<p class="address">Arlington, WA</p>
					<p class="job-title">Web Developer</p>
					<p class="email"><a href="mailto:sarahblikre@gmail.com">sarahblikre@gmail.com</a></p>

					<p class="view-resume"><a href="#">View My Résumé</a></p>

				</div>
			</section>

			<section class="page-section primary" style="">
				<div class="inner">