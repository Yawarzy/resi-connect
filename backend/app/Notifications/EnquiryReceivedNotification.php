<?php

namespace App\Notifications;

use App\Models\Enquiry;
use App\Models\Landlord;
use App\Models\Property;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EnquiryReceivedNotification extends Notification
{
    use Queueable;

    private Enquiry $enquiry;
    private Landlord $landlord;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Enquiry $enquiry, Landlord $landlord)
    {
        $this->enquiry = $enquiry;
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
            ->greeting('Hey, ' . $this->landlord->name)
            ->subject('New Enquiry Received')
            ->line('You have received a new enquiry from ' . $this->enquiry->full_name . ' for your property ' . Property::find($this->enquiry->property_id)->name)
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
