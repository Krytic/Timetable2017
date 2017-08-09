<?php

class TemplateEngine {
	private $tpl = "";

	public function __construct() {
		$this->load("header");
	}

	public function load($name) {
		$c = file_get_contents("templates/{$name}.tpl.php");
		$this->tpl .= $c;
	}

	public function render() {
		$this->load("footer");
		echo $this->tpl;
	}
}