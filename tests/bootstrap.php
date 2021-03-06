<?php
// @codingStandardsIgnoreFile
use Cake\Cache\Cache;
use Cake\Core\Configure;
use Cake\Core\Plugin;
use Cake\Routing\DispatcherFactory;
use Cake\Routing\Router;

$findRoot = function ($root) {
    do {
        $lastRoot = $root;
        $root = dirname($root);
        if (is_dir($root . '/vendor/cakephp/cakephp')) {
            return $root;
        }
    } while ($root !== $lastRoot);
    throw new Exception("Cannot find the root of the application, unable to run tests");
};
$root = $findRoot(__FILE__);
unset($findRoot);
chdir($root);

require_once $root . DS . 'vendor/cakephp/cakephp/src/basics.php';
require_once $root . DS . 'vendor/autoload.php';

// Path constants to a few helpful things.
if (!defined('DS')) {
    define('DS', DIRECTORY_SEPARATOR);
}
define('ROOT', $root . DS);
define('CAKE_CORE_INCLUDE_PATH', ROOT . 'vendor' . DS . 'cakephp' . DS . 'cakephp');
define('CORE_PATH', ROOT . 'vendor' . DS . 'cakephp' . DS . 'cakephp' . DS);
define('CAKE', CORE_PATH . 'src' . DS);
define('TESTS', ROOT . 'tests');
define('APP', ROOT . 'tests' . DS . 'test_files' . DS . 'app' . DS);
define('APP_DIR', 'app');
define('WEBROOT_DIR', 'webroot');
define('WWW_ROOT', dirname(APP) . DS . 'webroot' . DS);
define('TMP', sys_get_temp_dir() . DS);
define('CONFIG', ROOT . 'config' . DS);
define('CACHE', TMP);
define('LOGS', TMP);

date_default_timezone_set('UTC');
mb_internal_encoding('UTF-8');

Router::defaultRouteClass('DashedRoute');

Configure::write('debug', true);
Configure::write('App', [
    'namespace' => 'App',
    'encoding' => 'UTF-8',
    'base' => false,
    'baseUrl' => false,
    'dir' => 'src',
    'webroot' => WEBROOT_DIR,
    'www_root' => WWW_ROOT,
    'fullBaseUrl' => 'http://localhost',
    'imageBaseUrl' => 'img/',
    'jsBaseUrl' => 'js/',
    'cssBaseUrl' => 'css/',
    'paths' => [
        'plugins' => [dirname(APP) . DS . 'plugins' . DS],
        'templates' => [APP . 'Template' . DS]
    ]
]);
Cache::config([
    '_cake_core_' => [
        'engine' => 'File',
        'prefix' => 'cake_core_',
        'serialize' => true
    ],
    '_cake_model_' => [
        'engine' => 'File',
        'prefix' => 'cake_model_',
        'serialize' => true
    ]
]);
Plugin::load('CookieWarning', ['path' => ROOT, 'bootstrap' => true, 'routes' => true]);

DispatcherFactory::add('Routing');
DispatcherFactory::add('ControllerFactory');
