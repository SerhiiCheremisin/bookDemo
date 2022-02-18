import { createSlice} from '@reduxjs/toolkit';
import { bookState } from '../../types/index';

const initialState:bookState = {
    editedBook: 0,
    books : []
}

const bookReducer = createSlice({
    name: 'bookReducer',
    initialState: initialState,
    reducers : {
         setBooks (state, action) {
             state = {...state, ...state.books = action.payload}
         },
         setEditedBook (state, action) {
            state = {...state, ...state.editedBook = action.payload}
         }
    }
})

export const { setBooks, setEditedBook } = bookReducer.actions;

export default bookReducer.reducer;