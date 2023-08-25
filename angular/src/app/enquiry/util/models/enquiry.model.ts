export interface Enquiry {
  full_name: string;
  date_of_birth: Date | string;
  email: string;
  phone_number: number;
  alternate_phone_number?: number;
  home_address: string;
  id_proof: string;
  address_proof: string;
}
