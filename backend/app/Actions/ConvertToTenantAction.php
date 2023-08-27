<?php

namespace App\Actions;

use TCG\Voyager\Actions\AbstractAction;

class ConvertToTenantAction extends AbstractAction
{
    public function getTitle()
    {
        return 'Convert to Tenant';
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
            'class' => 'btn btn-sm btn-info pull-right',
        ];
    }

    public function getDefaultRoute()
    {
        return route('voyager.tenants.convert-enquiry-to-tenant', ['id' => $this->data->{$this->data->getKeyName()}]);
    }

    public function shouldActionDisplayOnDataType()
    {
        return $this->dataType->slug == 'enquiries';
    }
}
