<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <title>Rental Contract Agreement</title>
    <style>
        @page {
            margin: 2cm 0 0;
        }

        body {
            margin: 0;
        }

        * {
            font-family: 'Times New Roman', Times, serif;
        }

        p {
            font-size: 16px;
        }

        h3 {
            font-size: 20px;
        }

        h4 {
            font-size: 18px;
        }

        .page-body {
            margin-top: 1cm;
        }

        .wrapper {
            overflow: auto; /* Clearfix for floating elements */
        }

        .box {
            float: left;
            width: 50%; /* Distribute the width evenly between the two boxes */
            box-sizing: border-box; /* Include border in width calculation */
            padding-block: 10px;
        }

        .box.left {
            text-align: left;
        }

        .box.right {
            text-align: left;
        }

    </style>
</head>
<body>
<div class="container">
    <div class="page">
        <h1 class="text-center fw-semibold">Rental Agreement</h1>
        {{--        {{$enquiry}}--}}
        {{--        {{$landlord}}--}}
        <div class="page-body">
            <section>
                <p>This contract is made on
                    <b>
                        @php
                            $date = date_create();
                            echo date_format($date,"d/m/Y");
                        @endphp
                    </b> between
                    <b>{{$landlord->name}}</b>
                    , hereinafter referred to as
                    <b>"Landlord"</b>,
                    and <b>{{$enquiry->full_name}}</b>, whose address is <b>{{$enquiry->home_address}}</b>, hereinafter
                    referred to as
                    <b>"Tenant"</b>.
                </p>

                <p>In consideration of the mutual covenants and agreements contained herein, the parties agree as
                    follows:</p>
            </section>

            <section>
                <h3 class="fw-semibold">1. Premises</h3>
                <p>Landlord hereby leases to Tenant, and Tenant hereby leases from Landlord, the room of the property
                    <b>{{$property->name}}</b> located at <b>{{$property->full_address}}</b>, hereinafter referred to as
                    the <b>"Room"</b>.</p>
            </section>

            <section>
                <h3 class="fw-semibold">2. Term</h3>
                <p>The term of this Lease shall commence on
                    <b>
                        @php
                            $date = date_create($enquiry->commencement_date);
                            echo date_format($date,"d/m/Y");
                        @endphp

                    </b> and shall continue for a period of <b>{{$enquiry->agreement_duration}}</b>
                    months,
                    unless sooner terminated as provided herein.</p>
            </section>

            <section>
                <h3 class="fw-semibold">3. Rent</h3>
                <ul>
                    <li>
                        <h4 class="fw-semibold">
                            3.1 Monthly Rent</h4>
                        <p>Tenant shall pay to Landlord a monthly rent of
                            <b>
                                @php
                                    $formatter = new NumberFormatter("en", \NumberFormatter::SPELLOUT);
                                    $amount = $formatter->format($property->ppm);
                                    $amount = ucwords($amount);
                                    echo $amount;
                                @endphp
                            </b>
                            Rupees
                            (Rs. <b>{{$property->ppm}}</b>).
                            Rent shall be due and
                            payable on the first day of each month.</p>
                    </li>

                    <li>
                        <h4 class="fw-semibold">
                            3.2 Security Deposit</h4>
                        <p>Tenant shall deposit with Landlord a security deposit in the amount of
                            <b>
                                @php
                                    $formatter = new NumberFormatter("en", \NumberFormatter::SPELLOUT);
                                  $deposit = $formatter->format($property->deposit);
                                  $deposit = ucwords($deposit);
                                  echo $deposit;
                                @endphp
                            </b>
                            Rupees
                            (Rs. <b>{{$property->deposit}}</b>).
                            The security deposit shall be returned to Tenant within
                            <b>{{$property->deposit_refund_period}} days</b> after the
                            termination of this
                            Lease, less any amounts due to Landlord for unpaid rent, damages to the Room, or other
                            charges as
                            permitted by law.</p>
                    </li>

                    <li>
                        <h4 class="fw-semibold">
                            3.3 Use of Premises</h4>
                        <p>Tenant shall use the Room for residential purposes only. Tenant shall not use the Room for
                            any commercial
                            or business purposes.</p>
                    </li>

                    <li>
                        <h4 class="fw-semibold">
                            3.4 Maintenance and Repair
                        </h4>
                        <p>Landlord shall be responsible for all maintenance and repairs to the Premises, except for
                            repairs caused by the negligence or willful misconduct of Tenant or Tenant's guests.</p>
                    </li>

                    <li>
                        <h4 class="fw-semibold">
                            3.5 Subletting
                        </h4>
                        <p>Tenant shall not assign the lease or sublet the Room without the prior written consent of
                            Landlord</p>
                    </li>
                </ul>
            </section>

            <section>
                <h3 class="fw-semibold">4. Termination</h3>
                <p>This Lease may be terminated by either party upon <b>{{$property->termination_notice_period}}
                        days</b> written notice to the other
                    party.</p>
            </section>

            <section>
                <h3 class="fw-semibold">5. Governing Law</h3>
                <p>This Lease shall be governed by and construed in accordance with the laws of the State of
                    <b>Jammu and Kashmir, India</b>.</p>
            </section>

            <section>
                <h3 class="fw-semibold">6. Entire Agreement</h3>
                <p>This Lease constitutes the entire agreement between the parties with respect to the subject matter
                    hereof and supersedes all prior or contemporaneous communications, representations, or agreements,
                    whether oral or written.</p>
            </section>

            <section>
                <h3 class="fw-semibold">7. Severability</h3>
                <p>If any provision of this Lease is held to be invalid or unenforceable, such provision shall be struck
                    from this Lease and the remaining provisions shall remain in full force and effect.</p>
            </section>

            <section>
                <h3 class="fw-semibold">8. Waiver</h3>
                <p>The failure of either party to enforce any provision of this Lease shall not be construed as a waiver
                    or limitation of that party's right to subsequently enforce and compel strict compliance with every
                    provision of this Lease.</p>
            </section>
        </div>

        <div class="page-end">
            <p class="mb-4">IN WITNESS WHEREOF, the parties have executed this Lease as of the date first written
                above.</p>
            <div class="wrapper clearfix">
                <div class="box left">
                    <p><b>Landlord Name:</b> {{$landlord->name}}</p>
                    <p><b>Landlord Address:</b> {{$landlord->address}}</p>
                    <p><b>Landlord Signature:</b></p>
                </div>
                <div class="box right" style="padding-left: 3rem">
                    <p><b>Tenant Name:</b> {{$enquiry->full_name}}</p>
                    <p><b>Tenant Address:</b> {{$enquiry->home_address}}</p>
                    <p><b>Tenant Signature:</b></p>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>

