import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaveModal: false,
  isDeleteModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSaveModal: (state) => {
      state.isSaveModal = !state.isSaveModal;
    },

    toggleDeleteModal: (state) => {
      state.isDeleteModal = !state.isDeleteModal;
    },
  },
});

export const { toggleSaveModal, toggleDeleteModal } = modalSlice.actions;
export default modalSlice.reducer;
