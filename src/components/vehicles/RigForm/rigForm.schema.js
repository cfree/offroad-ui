import * as yup from 'yup';

export const rigSchema = yup.object().shape({
  year: yup.string(),
  make: yup.string(),
  model: yup.string(),
  trim: yup.string(),
  name: yup.string(),
  outfitLevel: yup.string().matches(/(0|MODIFIED|STOCK)/),
  mods: yup.string(),
});
