<table style="border-collapse: collapse;">
    <thead>
    </thead>
    <tbody>
    <tr>
        <td style="font-weight: bold; border: 1px solid black; padding: 8px;">Account Name:</td>
        <td style="border: 1px solid black; padding: 8px;">{{ $tenant->property->landlord->bank_account_name }}</td>
    </tr>
    <tr>
        <td style="font-weight: bold; border: 1px solid black; padding: 8px;">IFSC Code:</td>
        <td style="border: 1px solid black; padding: 8px;">{{ $tenant->property->landlord->bank_account_ifsc_code }}</td>
    </tr>
    <tr>
        <td style="font-weight: bold; border: 1px solid black; padding: 8px;">Account Number:</td>
        <td style="border: 1px solid black; padding: 8px;">{{ $tenant->property->landlord->back_account_no }}</td>
    </tr>
    @if( $tenant->property->landlord->bank_address)
        <tr>
            <td style="font-weight: bold; border: 1px solid black; padding: 8px;">Bank address:</td>
            <td style="border: 1px solid black; padding: 8px;">{{ $tenant->property->landlord->bank_address }}</td>
        </tr>
    @endif
    <tr>
        <td style="font-weight: bold; border: 1px solid black; padding: 8px;">REFERENCE NUMBER:</td>
        <td style="border: 1px solid black; padding: 8px;">{{ $tenant->reference_number }}</td>
    </tr>
    </tbody>
</table>
