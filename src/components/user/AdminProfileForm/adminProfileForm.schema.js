import * as yup from 'yup';

export const userSchema = yup.object().shape({
  title: yup.string().nullable(),
  isCharterMember: yup.string().required(),
  office: yup.string().nullable(),
  role: yup.string().required(),
  accountType: yup.string().required(),
  accountStatus: yup.string().required(),
});
