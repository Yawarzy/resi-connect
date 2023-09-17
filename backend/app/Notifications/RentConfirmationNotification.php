<?php

namespace App\Notifications;

use App\Models\RentPayments;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RentConfirmationNotification extends Notification
{
    use Queueable;
    public RentPayments $rentPayment;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(RentPayments $rentPayment)
    {
        $this->rentPayment = $rentPayment;
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
        $rentPayment = $this->rentPayment;
        $month = $rentPayment->date->format('F');
        $year = $rentPayment->date->format('Y');
        $balance  = $rentPayment->tenant->rent_balance > 0 ? $rentPayment->tenant->rent_balance : 0;

        $due = $this->rentPayment->tenant->rent_month - $this->rentPayment->amount;


        $line0  = $due >= 0 ? " for Month $month / $year" : " ";
        $subject_suffix = $due >= 0 ? " - ".$month." / ".$year: "";


        $late_fee = $rentPayment->late_fee > 0 ? "(plus a late fee of ".$rentPayment->late_fee.' INR).': '.';


        $line1 = "This email is to confirm receipt of your rent payment".$line0." in the amount of $rentPayment->amount INR $late_fee Your current balance is $balance INR.";
        return (new MailMessage)
            ->subject('Rent Payment Confirmation'.$subject_suffix)
            ->greeting('Dear '.$this->rentPayment->tenant->full_name)
            ->line($line1)
            ->line('Please let us know if there are any issues or if you need any further information.')
            ->line('Thank you');
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
