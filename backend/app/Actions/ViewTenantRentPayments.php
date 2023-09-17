<?php

namespace App\Actions;

use TCG\Voyager\Actions\AbstractAction;


class ViewTenantRentPayments extends AbstractAction
{
    public function getTitle()
    {
        return 'View Rent Payments';
    }

    public function getIcon()
    {
        return 'voyager-wand';
    }

    public function getPolicy()
    {
        return 'read';
    }

    public function getAttributes()
    {
        return [
            'class' => 'btn btn-success btn-dark pull-right',
        ];
    }

    public function getDefaultRoute()
    {
//        return "/admin/rent-payments?key=tenant_id&filter=equals&s={$this->data->id}";
        return "/admin/tenants/rent-payments/{$this->data->id}";


    }


    public function shouldActionDisplayOnDataType()
    {

        return $this->dataType->slug == 'tenants';
    }

    public function shouldActionDisplayOnRow($row)
    {
        return true;
    }


}
