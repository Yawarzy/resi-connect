<?php

namespace App\Actions;

use TCG\Voyager\Actions\AbstractAction;

class ApproveRepairRequestAction extends AbstractAction
{
    public function getTitle()
    {
        return 'Approve Request';
    }

    public function getIcon()
    {
        return 'voyager-file-text';
    }

    public function getPolicy()
    {
        return 'read';
    }

    public function getAttributes()
    {
        return [
            'class' => 'btn btn-sm btn-success pull-right',
        ];
    }

    public function getDefaultRoute()
    {
        return route('voyager.repair-requests.approve', ['repairRequest' => $this->data->{$this->data->getKeyName()}, 'approved' => true]);
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
