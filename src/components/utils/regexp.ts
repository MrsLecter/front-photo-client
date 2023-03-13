export const PHONE_REGEXP = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
export const CODE_REGEXP = /[0-9]{6}/g;
export const EMAIL_REGEXP =
  /([a-z0-9._%+-]{3,200})+(@[a-z0-9.-]{4,20})+.[a-z]{2,20}$/;
export const FULLNAME_REGEXP =
  /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{2,16})/;
