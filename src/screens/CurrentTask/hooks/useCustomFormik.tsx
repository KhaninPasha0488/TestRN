import {useFormik} from 'formik';
import {TaskItemType} from '../../../api/api';

// <--------------- Formik --------------->

const getInitialValues = (item: TaskItemType | null) => ({
  id: item?.id || 0,
  title: item?.title || '',
  description: item?.description || '',
  is_done: item?.is_done || false,
  is_important: item?.is_important || false,
});

export const useCustomFormik = (
  item: TaskItemType | null,
  edit: (item: TaskItemType) => void,
  add: (item: TaskItemType) => void,
) => {
  return useFormik({
    initialValues: getInitialValues(item),
    onSubmit: async submitValues => {
      if (item) {
        edit({
          id: submitValues.id,
          title: submitValues.title,
          description: submitValues.description,
          is_done: submitValues.is_done,
          is_important: submitValues.is_important,
        });
      } else {
        add({
          id: submitValues.id,
          title: submitValues.title,
          description: submitValues.description,
          is_done: submitValues.is_done,
          is_important: submitValues.is_important,
        });
      }
    },
  });
};
