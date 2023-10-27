<?php

namespace App\Notifications;

use App\Models\Enquiry;
use App\Models\Landlord;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendTenantUploadedSignedContractNotification extends Notification
{
    use Queueable;

    private Enquiry $enquiry;
    private Landlord $landlord;
    private $file;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Enquiry $enquiry, $file, Landlord $landlord)
    {
        $this->enquiry = $enquiry;
        $this->landlord = $landlord;
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
            ->greeting('Hello ' . $this->landlord->name . ',')
            ->subject('Tenant has uploaded signed contract | ' . config('app.name'))
            ->line('Tenant with the following details has uploaded the signed contract:')
            ->line('**Tenant Name: **' . $this->enquiry->full_name)
            ->line('**Tenant Email: **' . $this->enquiry->email)
            ->line('**Tenant Phone: **' . $this->enquiry->phone_number)
            ->line('Please find the attached signed contract.')
            ->attach($this->file, [
                'as' => 'Rental Agreement.pdf',
                'mime' => 'application/pdf',
            ])
            ->action('View Enquiry', url('/admin/enquiries/' . $this->enquiry->id));
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
