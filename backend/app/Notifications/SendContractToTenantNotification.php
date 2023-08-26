<?php

namespace App\Notifications;

use App\Models\Enquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendContractToTenantNotification extends Notification
{
    use Queueable;

    private Enquiry $enquiry;
    private $file;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Enquiry $enquiry, $file)
    {
        $this->enquiry = $enquiry;
        $this->file = $file;
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
            // email greeting, subject, and body for the tenant, this should contain the attached contract and information
            ->greeting('Hello ' . $this->enquiry->full_name . ',')
            ->subject('Rental Agreement | ' . env('APP_NAME'))
            ->line('As we discussed, the Rental Agreement which needs to be signed by you is attached to this email.')
            ->line('Kindly review the agreement and submit it to us at your earliest convenience.')
            ->line('If you have any questions, please feel free to contact us.')
            ->line('We look forward to hearing from you.')
            ->attach($this->file, [
                'as' => 'Rental Agreement.pdf',
                'mime' => 'application/pdf',
            ])
            ->line('Please click the button below to upload the signed contract.')
            ->action('Upload Contract', url($app_url . '/upload-contract/' . $this->enquiry->upload_contract_slug));
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
