<?php

namespace App\Notifications;

use App\Models\Tenant;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendCredentialsToTenantNotification extends Notification
{
    use Queueable;

    private Tenant $tenant;
    private $initPassword;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($tenant, $initPassword)
    {
        $this->tenant = $tenant;
        $this->initPassword = $initPassword;
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
        $app_url = config('app.debug') ? config('app.url_local') : config('app.url');
        return (new MailMessage)
            ->greeting('Hello, ' . $this->tenant->full_name)
            ->subject('')
            ->line('We are thrilled to have you as our tenant. Thank you for choosing our services.')
            ->line('Here are your login credentials:')
            ->line('**Email:** ' . $this->tenant->email)
            ->line('**Password:** ' . $this->initPassword)
            ->line("Please change your password once you've log in for the first time.")
            ->line('If you have any questions or need assistance, feel free to contact us.')
            ->line('Thank you again for joining us!')
            ->action('Login', url($app_url . 'tenant/login'));

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
