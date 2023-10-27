<?php

namespace App\Notifications;

use App\Models\Landlord;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendContactToLandlordNotification extends Notification
{
    use Queueable;

    public $contact;
    public Landlord $landlord;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($contact, Landlord $landlord)
    {
        $this->contact = $contact;
        $this->landlord = $landlord;
    }


    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Hello ' . $this->landlord->name . ',')
            ->subject('New Contact Request')
            ->line('You have received a new contact request from ' . $this->contact['full_name'] . '.')
            ->line('Email' . $this->contact['email'])
            ->line('Phone: ' . $this->contact['phone'])
            ->line('Message: ' . $this->contact['message']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
