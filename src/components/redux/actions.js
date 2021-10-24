import types from './types';

export const addContact = contact => {
  return {
    type: types.ADD,
    payload: contact,
  };
};

export const deleteContact = id => {
  return {
    type: types.DELETE,
    payload: id,
  };
};

export const filterContact = name => {
  return {
    type: types.FILTER,
    payload: name,
  };
};
