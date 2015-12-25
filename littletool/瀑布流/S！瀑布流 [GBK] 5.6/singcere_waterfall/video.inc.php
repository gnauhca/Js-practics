<?php

/**
 *      (C)ÍÆÕ¾ÍøÌá¹©  www.ituiz.com
 *      This is a freeware, But you have no right to modify or distribute
 *
 *      $Id: video.inc.php 2 2012-12-09 14:27:05Z except10n $
 */

require_once libfile('function/discuzcode');
$tid = intval($_GET['tid']);

$post = C::t('#singcere_waterfall#dx')->fetch_first_post_by_tid($tid);
$pos = intval($_GET['pos']);
if($post) {
	$message = $post['message'];
	preg_match_all("/((\[media=(swf|flv|x),\d{1,4}[x|\,]\d{1,4}\])\s*([^\[\<\r\n]+?)\s*\[\/media\])|((\[flash\])|(\[flash=\d{1,4}\,\d{1,4})\]\s*([^\[\<\r\n]+?)\s*\[\/flash\])/is", $message, $medialist, PREG_SET_ORDER);
	$pos = ($pos<count($medialist)) ? $pos : 0;
	$video['code'] = discuzcode($medialist[$pos][0], true, false, 0, 0, 1, 0, 0, 0, '0', '0', '1');
	
	$video['width'] = $medialist[$pos][3];
	$video['height'] = $medialist[$pos][4]; // + 95;
	foreach($medialist as $key=>$media) {
		$flv = parseflv($medialist[$key][5], 0, 0);
		$video['img'][] = $flv['imgurl'];
	}
} 

if(empty($video)) showmessage(lang('plugin/singcere_waterfall', 'video_not_found'));

include template('singcere_waterfall:video');