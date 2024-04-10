import {
    fetchMotorbikes,
    fetchMotorbike,
    createMotorbike,
    updateMotorbike,
    deleteMotorbike
} from "@/redux/actions";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listMotorbike: [],
    motorbike: {},
    isLoading: false,
    error: null
}

const motorbikeSlide = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMotorbikes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMotorbikes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listMotorbike = action.payload;
            })
            .addCase(fetchMotorbikes.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            });
        builder
            .addCase(fetchMotorbike.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMotorbike.fulfilled, (state, action) => {
                state.isLoading = false;
                state.motorbike = action.payload;
            })
            .addCase(fetchMotorbike.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            });
        builder
            .addCase(createMotorbike.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMotorbike.fulfilled, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.listMotorbike = [...state.listMotorbike, action.payload];
            })
            .addCase(createMotorbike.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            });
        builder
            .addCase(updateMotorbike.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMotorbike.fulfilled, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.listMotorbike = state.listMotorbike.map((item) => {
                    // @ts-ignore
                    if (item.id === action.payload.id) {
                        return action.payload
                    }
                    return item
                })
            })
            .addCase(updateMotorbike.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            });
        builder
            .addCase(deleteMotorbike.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMotorbike.fulfilled, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.listMotorbike = state.listMotorbike.filter((item) => item.id !== action.payload.id);
            })
            .addCase(deleteMotorbike.rejected, (state, action) => {
                state.isLoading = false;
                // @ts-ignore
                state.error = action.payload;
            });
    }
});
export default motorbikeSlide.reducer;
