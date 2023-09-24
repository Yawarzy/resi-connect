<?php

namespace App\Notifications;

use App\Models\RepairRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TenantRepairRequestApprovedNotification extends Notification
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
        $name = $this->repairRequest->full_name;
        $isRequestApproved = $this->repairRequest->approved_by_admin;
        $approved = $isRequestApproved ? 'Approved' : 'Declined';

        $mail_message = (new MailMessage)
            ->subject("Tenant Repair Request " . $approved . " - " . $this->repairRequest->title)
            ->greeting('Hello ' . $name . '!')
            ->line("Your repair request has been " . $approved)
            ->line("Here are the details of your request:")
            ->line('**Property Name:** ' . $this->repairRequest->property->name)
            ->line('**Problem:** ' . $this->repairRequest->problem_breadcrumb)
            ->line('**Problem Description:** ' . $this->repairRequest->problem_description)
            ->line('**Tenant Name:** ' . $name)
            ->line('**Email:** ' . $this->repairRequest->email)
            ->line('**Phone:** ' . $this->repairRequest->phone)
            ->line("");

        if (!$isRequestApproved) {
            $mail_message->line('**Reason for rejection:** ' . $this->repairRequest->comments)
                ->line("Please contact your landlord for more information.");
        }

        if ($isRequestApproved) {
            $mail_message->line("This is now assigned to the contractor: " . $this->repairRequest->contractor->name)
                ->line("Here are the contractor's details:")
                ->line('**Name:** ' . $this->repairRequest->contractor->name)
                ->line('**Email:** ' . $this->repairRequest->contractor->email)
                ->line('**Phone:** ' . $this->repairRequest->contractor->phone)
                ->line("Contractor will contact you soon to schedule the repair.")
                ->line("")
                ->line("After the repair is done, please confirm the same in the Tenant Dashboard.");
        }

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
