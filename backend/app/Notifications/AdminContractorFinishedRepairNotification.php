<?php

namespace App\Notifications;

use App\Models\RepairRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminContractorFinishedRepairNotification extends Notification
{
    use Queueable;

    protected RepairRequest $repairRequest;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(RepairRequest $repair_request)
    {
        $this->repairRequest = $repair_request;
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
            ->subject('Repair Confirmed By Contractor - ' . $rc->contractor->name)
            ->greeting('Dear Landlord')
            ->line('A repair request has been confirmed by ' . $rc->contractor->name)
            ->line('**Property Name:** ' . $rc->property->name)
            ->line('**Problem:** ' . $rc->problem_breadcrumb)
            ->line('**Problem Description:** ' . $rc->problem_description)
            ->line('By Tenant: ' . $rc->tenant->full_name)
            ->line('Leasing property: ' . $rc->property->name)
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
