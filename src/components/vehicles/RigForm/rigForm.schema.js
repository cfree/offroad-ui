import * as yup from 'yup';

export const rigSchema = yup.object().shape({
  year: yup.string().required('Year is required'),
  make: yup.string().required('Make is required'),
  model: yup.string().required('Model is required'),
  trim: yup.string(),
  name: yup.string(),
  outfitLevel: yup.string().matches(/(0|MODIFIED|STOCK)/),
  mods: yup.string(),
});
