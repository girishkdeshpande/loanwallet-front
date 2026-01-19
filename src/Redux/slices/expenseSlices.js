import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const AllExpenses = createAsyncThunk(
  "expense/get_all_expenses",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("expense/getAllExpensesNew", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const ApproveExpense = createAsyncThunk(
  "expense/approve_expense",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("expense/approve_expenses", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    allExpensesState: {
      allExpensesData: null,
      allExpensesLoading: false,
      allExpensesError: null,
    },
    approveExpenseState: {
      approveExpenseData: null,
      approveExpenseLoading: false,
      approveExpenseError: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AllExpenses.pending, (state) => {
        state.allExpensesState.allExpensesLoading = true;
      })
      .addCase(AllExpenses.fulfilled, (state, action) => {
        state.allExpensesState.allExpensesLoading = false;
        state.allExpensesState.allExpensesData = action.payload;
      })
      .addCase(AllExpenses.rejected, (state, action) => {
        state.allExpensesState.allExpensesLoading = false;
        state.allExpensesState.allExpensesError = action.payload.error;
      })

      .addCase(ApproveExpense.pending, (state) => {
        state.approveExpenseState.approveExpenseLoading = true;
      })
      .addCase(ApproveExpense.fulfilled, (state, action) => {
        state.approveExpenseState.approveExpenseLoading = false;
        state.approveExpenseState.approveExpenseData = action.payload;
      })
      .addCase(ApproveExpense.rejected, (state, action) => {
        state.approveExpenseState.approveExpenseLoading = false;
        state.approveExpenseState.approveExpenseError = action.payload.error;
      });
  },
});
export default expenseSlice.reducer;
