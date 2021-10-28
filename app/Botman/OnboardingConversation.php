<?php

namespace App\Botman;

use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Incoming\Answer;
use Illuminate\Support\Facades\Validator;

class OnboardingConversation extends Conversation
{
    protected $name;

    protected $email;

    protected $query;

    /**
     * [Ask Visitor  Name]
     * @return [type] [description]
     */
    public function askName()
    {
        $this->ask('Hi! What is your name?', function(Answer $answer) {
            $this->name = $answer->getText();
            $this->say('Nice to meet you '.$answer->getText());
            $this->askEmail();
        });
    }

    /**
     * [ask Visitor Email ]
     * @return [type] [description]
     */
    public function askEmail()
    {
        $this->ask('What is your email?', function(Answer $answer) {

            $validator = Validator::make(['email' => $answer->getText()], [
                'email' => 'email',
            ]);

            if ($validator->fails()) {
                return $this->repeat('That doesn\'t look like a valid email. Please enter a valid email.');
            }

            $this->askMobile();
        });
    }

    /**
     * [ask to visitor mobile ]
     * @return [type] [description]
     */
    public function askMobile()
    {
        $this->ask('Great. What is your mobile?', function(Answer $answer) {
            $validator = Validator::make(['mobile' => $answer->getText()], [
                'mobile' => 'numeric',
            ]);

            if ($validator->fails()) {
                return $this->repeat('That doesn\'t look like a valid mobile. Please enter a valid mobile.');
            }
            $this->askHelp();
        });
    }

    /**
     * [ask to visitor Help]
     * @return [type] [description]
     */
    public function askHelp()
    {
        // Create New  Question with Buttons
        $question = Question::create('Do you want need any service?')
        ->fallback('Unable to get you answer. please select proper answer')
        ->callbackId('need_services')
        ->addButtons([
            Button::create('Yes')->value('yes'),
            Button::create('No')->value('no'),
        ]);

        $this->ask($question, function (Answer $answer) {
            if ($answer->isInteractiveMessageReply()) {
                if($answer->getValue() == 'yes'){
                    $this->say('Great ! you want more service');
                    $this->needMoreSerivces();
                    
                } else {
                    $this->say('Your query has been forwarded, we will contact you soon.'.$answer->getValue());
                }
            }
        });

    }
    
    public function needMoreSerivces() 
    {
        $question = Question::create('Which type of service you need ?')
        ->fallback('Unable to get you answer. please select proper answer')
        ->callbackId('need_more_services')
        ->addButtons([
            Button::create('Mobile App')->value('mobile_app'),
            Button::create('Product Design')->value('product_design'),
            Button::create('Web Developement')->value('web_developement'),
            Button::create('Enterprise Solution')->value('enterprise_solution'),
            Button::create('Quality Assurance')->value('quality_assurance'),
            Button::create('Game Developement')->value('game_developement'),
        ]);
        $this->ask($question, function(Answer $answer) {
            if($answer->getValue()=='mobile_app'){
                $this->say('Great ! you want Mobile App Services');

                $question = Question::create('Which type ofMobile app Services ?')
                ->fallback('Unable to get you answer. please select proper answer')
                ->callbackId('mobile_app_services')
                ->addButtons([
                    Button::create('iOS')->value('ios'),
                    Button::create('Android')->value('android'),
                ]);
                $this->say('Your query has been forwarded, our sale team.');
            }
        });
    }



    public function run()
    {
        // This will be called immediately
        $this->askName();
    }
}