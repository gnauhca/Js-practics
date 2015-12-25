<?php

/**
 *      (C)ÍÆÕ¾ÍרÌב¹©  www.ituiz.com
 *      This is a freeware, But you have no right to modify or distribute
 *
 *      $Id: singcere_waterfall.inc.php 2 2012-12-09 14:27:05Z except10n $
 */

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

global $_G;

$wf_style = $_G['cache']['plugin']['singcere_waterfall']['wf_style'];

$wf_init_num = max(1, intval($_G['cache']['plugin']['singcere_waterfall']['wf_init_num']));
$wf_spart_num = max(1, intval($_G['cache']['plugin']['singcere_waterfall']['wf_spart_num']));
$block_reply_num = intval($_G['cache']['plugin']['singcere_waterfall']['block_reply_num']);
$view_hot_value = max(1, intval($_G['cache']['plugin']['singcere_waterfall']['view_hot_value']));
$wf_perpage = max($wf_init_num, intval($_G['cache']['plugin']['singcere_waterfall']['wf_perpage']));
$wf_curspart = max(1, intval($_GET['spart']));
$wf_forum_limit = unserialize($_G['cache']['plugin']['singcere_waterfall']['wf_forum_limit']);
$wf_forum_filter_on = $_G['cache']['plugin']['singcere_waterfall']['wf_forum_filter_on'];
$wf_tag_filter_on = $_G['cache']['plugin']['singcere_waterfall']['wf_tag_filter_on'];
$block_special_data_on = $_G['cache']['plugin']['singcere_waterfall']['block_special_data_on'];
$block_attach_on = $_G['cache']['plugin']['singcere_waterfall']['block_attach_on'];
$block_must_cover_on = $_G['cache']['plugin']['singcere_waterfall']['block_must_cover_on'];

$block_btn_like = $_G['cache']['plugin']['singcere_waterfall']['block_btn_like'];
$block_btn_reply = $_G['cache']['plugin']['singcere_waterfall']['block_btn_reply'];
$block_btn_relay = $_G['cache']['plugin']['singcere_waterfall']['block_btn_relay'];
$block_btn_coll = $_G['cache']['plugin']['singcere_waterfall']['block_btn_coll'];

$masonry_preread = $_G['cache']['plugin']['singcere_waterfall']['masonry_preread'];

$wf_bg = $_G['cache']['plugin']['singcere_waterfall']['wf_bg'];

$custom_tag_array = array();
$custom_tag = explode("\n", $_G['cache']['plugin']['singcere_waterfall']['wf_custom_tag']);
foreach($custom_tag as $tag) {
	if(trim($tag)) {
		$custom_tag_array[] = trim($tag); 
	}
}
require_once './source/plugin/singcere_waterfall/stroll.inc.php';
