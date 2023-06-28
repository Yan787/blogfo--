import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../context/Theme/Context";
import { RootState } from "../store";
const initialState = ({
    themeValue: Theme.Light
})

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        chengeTheme: (state, action: PayloadAction<Theme>)=>{
            state.themeValue = action.payload
        }
    }
})

export const {chengeTheme} = themeSlice.actions

export default themeSlice.reducer

export const ThemeSelector = {
    getThemeValue: (store: RootState)=> store.theme.themeValue
}