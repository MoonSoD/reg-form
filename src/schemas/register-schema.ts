import {object, string, bool, ref} from "yup";

export default object({
  email: string().email().required(),

  firstName: string().required(),
  lastName: string().required(),

  language: string().required(),
  country: string().required(),

  password: string().required().min(6),
  confirmPassword: string().required().min(6).oneOf([ref("password")], "passwords have to match"),

  privateProfile: bool().default(false),
  privatePolicyAccepted: bool().isTrue(),
})