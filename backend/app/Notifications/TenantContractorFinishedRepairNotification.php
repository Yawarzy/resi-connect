<?php

namespace App\Notifications;

use App\Models\RepairRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TenantContractorFinishedRepairNotification extends Notification
{
    use Queueable;

    protected RepairRequest $repairRequest;

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
            ->subject('Repair Confirmed By Contractor - ' . $rc->contractor->name)
            ->greeting('Dear Tenant')
            ->line('The repair request which was raised by you has been marked as completed by the contractor ' . $rc->contractor->name)
            ->line('Please confirm the same by logging into your account and marking the repair request as completed.')
            ->line('Repair Request Details:')
            ->line('**Property Name:** ' . $rc->property->name)
            ->line('**Problem:** ' . $rc->problem_breadcrumb)
            ->line('**Problem Description:** ' . $rc->problem_description)
            ->line('If you have any questions, please contact us at ' . config('app.contact_email'));
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
