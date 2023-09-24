<?php

namespace App\Notifications;

use App\Models\RepairRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContractorAssignRepairRequestNotification extends Notification
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
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $app_url = config('app.debug') ? config('app.url_local') : config('app.url');
        $mail_message = (new MailMessage)
            ->subject("Repair Request Assigned")
            ->greeting('Hello ' . $this->repairRequest->contractor->name . '!')
            ->line("A new repair request has been assigned to you")
            ->line('**Comments from Landlord:** ' . $this->repairRequest->comments)
            ->line("After you have completed the repair, please click the button below to confirm the repair.")
            ->action('View & Confirm Repair', url($app_url . '/contractor/approve-repair/' . $this->repairRequest->contractor_approve_slug));


        return $mail_message;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
