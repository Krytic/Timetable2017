<?php

class Registry {
	private static $instance = null;
	private $objects = array();

	private function __construct() {
		$this->load_classes();
	}

	public static function singleton() {
		if(is_null(self::$instance)) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public function __clone() {
		throw new Exception("Cloning disallowed.");
	}

	protected function load_classes() {
		foreach(new DirectoryIterator('classes') as $file) {
			if($file->getExtension() == "php") {
				require_once "classes/" . $file->getBasename();
				$obj = $file->getBasename('.php');
				$this->objects[$obj] = new $obj;
			}
		}

	}

	public function get($class) {
		return $this->objects[$class];
	}
}

$registry = Registry::singleton();
$tpl = $registry->get("TemplateEngine");