<?php

namespace App\Notifications;

use App\Models\RepairRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminTenantFinishedRepairNotification extends Notification
{
    use Queueable;

    private RepairRequest $repairRequest;


    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(RepairRequest $repairRequest)
    {
        $this->repairRequest = $repairRequest;
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
        $rc = $this->repairRequest;

        $app_url = config('app.debug') ? config('app.url_local') : config('app.url');

        return (new MailMessage)
            ->subject('Repair Confirmed By Tenant - ' . $rc->full_name)
            ->greeting('Dear Landlord')
            ->line('A repair request has been confirmed by ' . $rc->full_name)
            ->line('**Property Name:** ' . $rc->property->name)
            ->line('**Problem:** ' . $rc->problem_breadcrumb)
            ->line('**Problem Description:** ' . $rc->problem_description)
            ->line('**Tenant Name:** ' . $rc->full_name)
            ->line('**Email:** ' . $rc->email)
            ->line('**Phone:** ' . $rc->phone)
            ->action('View Repair Request', url($app_url . '/admin/repair-requests/' . $rc->id));
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
