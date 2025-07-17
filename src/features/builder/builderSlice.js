import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blocks: [],
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    addBlock: (state, action) => {
      state.blocks.push(action.payload);
    },
    updateBlockContent: (state, action) => {
      const { id, content } = action.payload;
      const blockIndex = state.blocks.findIndex((b) => b.id === id);
      if (blockIndex !== -1) {
        state.blocks[blockIndex].content = content;
      }
    },
    deleteBlock: (state, action) => {
      state.blocks = state.blocks.filter((block) => block.id !== action.payload);
    },
    moveBlock: (state, action) => {
      const { fromIndex, toIndex } = action.payload;

      // Prevent invalid moves
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.blocks.length ||
        toIndex >= state.blocks.length
      ) {
        return;
      }

      const [moved] = state.blocks.splice(fromIndex, 1);
      state.blocks.splice(toIndex, 0, moved);
    },
    resetBlocks: (state) => {
      state.blocks = [];
    },
  },
});

export const {
  addBlock,
  updateBlockContent,
  deleteBlock,
  moveBlock,
  resetBlocks,
} = builderSlice.actions;

export default builderSlice.reducer;
