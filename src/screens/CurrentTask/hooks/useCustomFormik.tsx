import {useFormik} from 'formik';
import {TaskItemType} from '../../../api/api';

// <--------------- Formik --------------->

const getInitialValues = (item: TaskItemType | undefined) => ({
  _id: item?._id || '',
  title: item?.title || '',
  description: item?.description || '',
  is_done: item?.is_done || false,
  is_important: item?.is_important || false,
});

export const useCustomFormik = (
  item: TaskItemType | undefined,
  edit: (item: TaskItemType) => void,
  add: (item: TaskItemType) => void,
) => {
  return useFormik({
    initialValues: getInitialValues(item),
    onSubmit: async submitValues => {
      if (item) {
        edit({
          _id: submitValues._id,
          title: submitValues.title,
          description: submitValues.description,
          is_done: submitValues.is_done,
          is_important: submitValues.is_important,
        });
      } else {
        add({
          _id: submitValues._id,
          title: submitValues.title,
          description: submitValues.description,
          is_done: submitValues.is_done,
          is_important: submitValues.is_important,
        });
      }
    },
  });
};
