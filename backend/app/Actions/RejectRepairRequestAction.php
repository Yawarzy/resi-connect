<?php

namespace App\Actions;

use TCG\Voyager\Actions\AbstractAction;

class RejectRepairRequestAction extends AbstractAction
{
    public function getTitle()
    {
        return 'Reject Request';
    }

    public function getIcon()
    {
        return 'voyager-x';
    }

    public function getPolicy()
    {
        return 'read';
    }

    public function getAttributes()
    {
        return [
            'class' => 'btn btn-sm btn-danger pull-right',
        ];
    }

    public function getDefaultRoute()
    {
        return route('voyager.repair-requests.approve', ['repairRequest' => $this->data->{$this->data->getKeyName()}, 'approved' => false]);
    }

    public function shouldActionDisplayOnDataType()
    {
        return $this->dataType->slug == 'repair-requests';
    }

    public function shouldActionDisplayOnRow($row)
    {
        return $row->approved_by_admin === "0";
    }
}
