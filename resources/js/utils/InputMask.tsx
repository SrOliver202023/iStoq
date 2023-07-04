import { ChangeEvent } from "react";

const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>): String => {
  const inputPhoneNumber = event.target.value;
  const formattedPhoneNumber = inputPhoneNumber.replace(/\D/g, '');
  const maskedPhoneNumber = formattedPhoneNumber.replace(
    /^(\d{2})(\d{5})(\d{4}).*/,
    '($1) $2-$3'
  );
  return String(maskedPhoneNumber)
};

const handleCNPJChange = (event: ChangeEvent<HTMLInputElement>): String => {
  const inputCNPJ = event.target.value;
  const formattedCNPJ = inputCNPJ.replace(/\D/g, '');
  const maskedCNPJ = formattedCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
    '$1.$2.$3/$4-$5'
  );
  return String(maskedCNPJ)
};


export {
  handleCNPJChange,
  handlePhoneNumberChange
}