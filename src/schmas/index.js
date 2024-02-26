import * as Yup from "yup";

// Yup.object().shape({
//   file: Yup.mixed().required('File is required'),
// })

export const validationSchemaLogin = Yup.object({
  userName: Yup.string()
    .min(2, "Username  length 2 to 30 long.")
    .max(30, "Username length 2 to 30 long.")
    .required("Enter username"),

  password: Yup.string()
    .min(6, "Password length  6 to 18 long")
    .max(18, "Password length  6 to 18 long")
    .required("Enter password"),
});

export const validationSchemaforgotPassword = Yup.object({
  userName: Yup.string()
    .min(2, "Username  length 2 to 30 long.")
    .max(30, "Username length 2 to 30 long.")
    .required("Enter username"),

  newPassword: Yup.string()
    .min(6, "Password length  6 to 18 long")
    .max(18, "Password length  6 to 18 long")
    .required("Enter password"),

  confirmPassword: Yup.string()
    .required("Enter confirm password")
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});

export const validationSchemaChangePassword = Yup.object({
  currentPassword: Yup.string()
    .min(6, "Password length  6 to 18 long")
    .max(18, "Password length  6 to 18 long")
    .required("Enter password"),
  newPassword: Yup.string()
    .min(6, "Password length  6 to 18 long")
    .max(18, "Password length  6 to 18 long")
    .required("Enter password"),
  confirmPassword: Yup.string()
    .required("Enter confirm password")
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});

///////
export const validationSchemaDocuments = Yup.object({
  panNumber: Yup.string()
    .min(10, "Min length is required 10")
    .max(10, "Max length is required 10")
    .required("Please enter pan number"),
  aadharNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid aadhar number"
    )
    .min(12, "Min length is required 12")
    .max(12, "Max length is required 12")
    .required("Please enter aadhar number"),

  otherValidIdsNumber: Yup.string()
    .min(2, "Other id number  length 2 to 30 long")
    .max(30, "Other id number  length 2 to 30 long")
    .required("Please enter other id number"),

  panImg: Yup.mixed().required("File is required"),
  adharImg: Yup.mixed().required("File is required"),
  otherImg: Yup.mixed().required("File is required"),

  nomineeName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Nominee name  length 2 to 30 long")
    .max(30, "Nominee name  length 2 to 30 long")
    .required("Please enter nominee name"),

  emergencyContactNumber1: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Please enter max 10 digit mobile number")
    .max(10, "Please enter max 10 digit mobile number")
    .required("Please enter primary contact number"),
  emergencyContactNumber2: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Please enter max 10 digit mobile number")
    .max(10, "Please enter max 10 digit mobile number")
    .required("Please enter secondary contact number"),
});

/////

export const validationSchemaProfile = Yup.object({
  real_name: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Name  length 2 to 30 long")
    .max(30, "Name  length 2 to 30 long")
    .required("Please enter name"),
  gender: Yup.string().required("Please select gender"),
  department: Yup.string().required("Please select department"),
  // designation: Yup.string().required("Please select designation"),
  DOB: Yup.string().required("Please select dob"),
  DOJ: Yup.string().required("Please select doj"),
  personalEmail: Yup.string()
    .email("Must be valid email")
    .required("Please enter personal email"),
  primaryContactNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Contact number min length 10")
    .max(10, "Contact number max length 10")
    .required("Please enter primary contact number"),
  secondaryContactNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Contact number min length 10")
    .max(10, "Contact number max length 10")
    .required("Please enter secondary contact number"),
  secondaryContactName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Name  length 2 to 30 long")
    .max(30, "Name  length 2 to 30 long")
    .required("Please enter second name"),
  address: Yup.string().required("Please enter address"),
  pemanentaddress: Yup.string().required("Please enter permanent address"),
  bankName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Bank name can contains only alphabet."
    )
    .min(2, "Bank name length 2 to 30")
    .max(30, "Bank name length 2 to 30")
    .required("Please enter bank name"),
  accountHolderName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Holder name length 2 to 30")
    .max(30, "Holder name length 2 to 30")
    .required("Please enter account holder name"),
  accountNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid account number"
    )
    .min(8, "length 8 to 30")
    .max(30, "length 8 to 30")
    .required("Please enter account number"),
});

export const validationSchemaHRProfile = Yup.object({
  real_name: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Name  length 2 to 30 long")
    .max(30, "Name  length 2 to 30 long")
    .required("Please enter name"),
  gender: Yup.string().required("Please select gender"),
  department: Yup.string().required("Please select department"),
  // designation: Yup.string().required("Please select designation"),
  DOB: Yup.string().required("Please select dob"),
  DOJ: Yup.string().required("Please select doj"),
  personalEmail: Yup.string()
    .email("Must be valid email")
    .required("Please enter personal email"),
  primaryContactNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Contact number min length 10")
    .max(10, "Contact number max length 10")
    .required("Please enter primary contact number"),
  secondaryContactNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Contact number min length 10")
    .max(10, "Contact number max length 10")
    .required("Please enter secondary contact number"),
  secondaryContactName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Name  length 2 to 30 long")
    .max(30, "Name  length 2 to 30 long")
    .required("Please enter second name"),
  address: Yup.string().required("Please enter address"),
  pemanentaddress: Yup.string().required("Please enter permanent address"),

  panNumber: Yup.string()
    .min(10, "Min length is required 10")
    .max(10, "Max length is required 10")
    .required("Please enter pan number"),
  aadharNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid aadhar number"
    )
    .min(12, "Min length is required 12")
    .max(12, "Max length is required 12")
    .required("Please enter aadhar number"),

  otherValidIdsNumber: Yup.string()
    .min(2, "Other id number  length 2 to 30 long")
    .max(30, "Other id number  length 2 to 30 long")
    .required("Please enter other id number"),

  panImg: Yup.mixed().required("File is required"),
  adharImg: Yup.mixed().required("File is required"),
  otherImg: Yup.mixed().required("File is required"),

  nomineeName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Nominee name  length 2 to 30 long")
    .max(30, "Nominee name  length 2 to 30 long")
    .required("Please enter nominee name"),

  emergencyContactNumber1: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Please enter max 10 digit mobile number")
    .max(10, "Please enter max 10 digit mobile number")
    .required("Please enter primary contact number"),
  emergencyContactNumber2: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid phone number"
    )
    .min(10, "Please enter max 10 digit mobile number")
    .max(10, "Please enter max 10 digit mobile number")
    .required("Please enter secondary contact number"),

  bankName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Bank name can contains only alphabet."
    )
    .min(2, "Bank name length 2 to 30")
    .max(30, "Bank name length 2 to 30")
    .required("Please enter bank name"),
  accountHolderName: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Name can contains only alphabet."
    )
    .min(2, "Holder name length 2 to 30")
    .max(30, "Holder name length 2 to 30")
    .required("Please enter account holder name"),
  accountNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Please use valid account number"
    )
    .min(8, "length 8 to 30")
    .max(30, "length 8 to 30")
    .required("Please enter account number"),
});
