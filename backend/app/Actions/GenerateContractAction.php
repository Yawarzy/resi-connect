<?php

namespace App\Actions;

use TCG\Voyager\Actions\AbstractAction;

class GenerateContractAction extends AbstractAction
{
    public function getTitle()
    {
        return 'Generate Contract';
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
            'class' => 'btn btn-sm btn-primary pull-right',
        ];
    }

    public function getDefaultRoute()
    {
        return route('voyager.contracts.generate', ['id' => $this->data->{$this->data->getKeyName()}]);
    }

    public function shouldActionDisplayOnDataType()
    {
        return $this->dataType->slug == 'enquiries';
    }
}
