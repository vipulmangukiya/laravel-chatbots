<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
	<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
	<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
	<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
	<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## ChatBots Laravel

## Installation

``` bash
# clone the repo
$ git clone https://github.com/vipulmangukiya/laravel-chatbots.git my-project

# go into app's directory
$ cd laravel-chatbots

# install app's dependencies
$ composer install

# install Botman and Botman Driver  
$ composer require botman/botman
$ composer require botman/driver-web
$ php artisan serve
```
## If want add already exting project need to additional Create Configuration File
> Let’s create a folder with name botman inside /config directory. Create two files inside `/config/botman`

>  `/config/botman/config.php`

``` bash
<?php

return [
    'conversation_cache_time' => 40,
    'user_cache_time' => 30,
];

```
>  `/config/botman/web.php`

``` bash
<?php

return [

    'matchingData' => [
        'driver' => 'web',
    ],
];

```

## Create Controller & Conversation Class File
``` bash
#create Controller
$ php artisan make:controller BotManController
```
> Open BotManController.php and write this complete code into it.

> ``/app/Http/Controllers/BotManController.php`

``` bash
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Botman\OnboardingConversation;

class BotManController extends Controller
{
    /**
     * Place your BotMan logic here.
     */
    public function handle()
    {
        $botman = app('botman');

        $botman->hears('{message}', function ($botman, $message) {

            $botman->startConversation(new OnboardingConversation);
        });

        $botman->listen();
    }
}
```

> Create a folder with any name, example Botman inside /app folder. Create a file OnboardingConversation.php inside /app/Botman folder. see copy paste  code from this path

> `/app/Botman/OnboardingConversation.php`

 
