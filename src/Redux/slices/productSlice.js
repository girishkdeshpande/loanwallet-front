import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const RegisterProduct = createAsyncThunk(
  "product/registerProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await api.post("products/registerProduct", productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const AllProducts = createAsyncThunk(
  "product/allProducts",
  async (productTypes, thunkAPI) => {
    try {
      const types = Array.isArray(productTypes) ? productTypes : [productTypes];
      const results = {};

      for (const type of types) {
        const response = await api.get(
          `products/getAllProducts?product_type=${type}`
        );

        // Ensure we are reading the array correctly
        const dataArray = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        results[type] = dataArray.map((item) => item.value);
      }
      return results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const SingleProduct = createAsyncThunk(
  "product/singleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await api.get("products/getOneProduct", productId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const UpdateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productData, thunkAPI) => {
    console.log("Product Data in UpdateProduct:", productData);
    try {
      const response = await api.put(
        `products/updateProduct/${productData.id}`,
        productData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const DeleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await api.delete(`products/deleteProduct/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const SearchProduct = createAsyncThunk(
  "product/searchProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await api.post(
        "products/searchProductNameHSN",
        productData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const ShareProductDetails = createAsyncThunk(
  "product/shareProductDetails",
  async (productData, thunkAPI) => {
    try {
      const response = await api.post(
        "products/shareProductDetails",
        productData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const ProductSuggestions = createAsyncThunk(
  "product/productSuggestions",
  async (productData, thunkAPI) => {
    try {
      const response = await api.post(
        "products/productSuggestions",
        productData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const ConsumableProducts = createAsyncThunk(
  "product/consumableProducts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("products/get_DG_products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const ProductsByNameAndType = createAsyncThunk(
  "product/getProductsByNameType",
  async (queryParams, thunkAPI) => {
    console.log("Query Params:", queryParams);
    try {
      const response = await api.get(
        `products/getProductsByNameType${queryParams}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    registerProductState: {
      registerProductData: null,
      registerProductLoading: false,
      registerProductError: null,
    },
    allProductState: {
      allProductData: null,
      allProductLoading: false,
      allProductError: null,
    },
    singleProductState: {
      singleProductData: null,
      singleProductLoading: false,
      singleProductError: null,
    },
    updateProductState: {
      updateProductData: null,
      updateProductLoading: false,
      updateProductError: null,
    },
    deleteProductState: {
      deleteProductData: null,
      deleteProductLoading: false,
      deleteProductError: null,
    },
    searchProductState: {
      searchProductData: null,
      searchProductLoading: false,
      searchProductError: null,
    },
    shareProductDetailsState: {
      shareProductDetailsData: null,
      shareProductDetailsLoading: false,
      shareProductDetailsError: null,
    },
    productSuggestionState: {
      productSuggestionData: null,
      productSuggestionLoading: false,
      productSuggestionError: null,
    },
    consumableProductsState: {
      consumableProductsData: null,
      consumableProductsLoading: false,
      consumableProductsError: null,
    },
    productsByNameAndTypeState: {
      productsByNameAndTypeData: null,
      productsByNameAndTypeLoading: false,
      productsByNameAndTypeError: null,
    },
  },
  reducers: {
    resetRegisterProductState: (state) => {
      state.registerProductState = {
        registerProductData: null,
        registerProductLoading: false,
        registerProductError: null,
      };
    },
    resetAllProductsState: (state) => {
      state.allProductState = {
        allProductData: null,
        allProductLoading: false,
        allProductError: null,
      };
    },
    resetSingleProductState: (state) => {
      state.singleProductState = {
        singleProductData: null,
        singleProductLoading: false,
        singleProductError: null,
      };
    },
    resetProductsByNameAndTypeState: (state) => {
      state.productsByNameAndTypeState = {
        productsByNameAndTypeData: null,
        productsByNameAndTypeLoading: false,
        productsByNameAndTypeError: null,
      };
    },
    resetDeleteProductState: (state) => {
      state.deleteProductState = {
        deleteProductData: null,
        deleteProductLoading: false,
        deleteProductError: null,
      };
    },
    resetShareProductDetailsState: (state) => {
      state.shareProductDetailsState = {
        shareProductDetailsData: null,
        shareProductDetailsLoading: false,
        shareProductDetailsError: null,
      };
    },
    resetUpdateProductState: (state) => {
      state.updateProductState = {
        updateProductDetailsData: null,
        updateProductDetailsLoading: false,
        updateProductDetailsError: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterProduct.pending, (state) => {
        state.registerProductState.registerProductLoading = true;
      })
      .addCase(RegisterProduct.fulfilled, (state, action) => {
        state.registerProductState.registerProductLoading = false;
        state.registerProductState.registerProductData = action.payload;
      })
      .addCase(RegisterProduct.rejected, (state, action) => {
        state.registerProductState.registerProductLoading = false;
        state.registerProductState.registerProductError = action.payload.error;
      })

      .addCase(AllProducts.pending, (state) => {
        state.allProductState.allProductLoading = true;
      })
      .addCase(AllProducts.fulfilled, (state, action) => {
        state.allProductState.allProductLoading = false;
        state.allProductState.allProductData = action.payload;
      })
      .addCase(AllProducts.rejected, (state, action) => {
        state.allProductState.allProductLoading = false;
        state.allProductState.allProductError = action.payload.error;
      })

      .addCase(SingleProduct.pending, (state) => {
        state.singleProductState.singleProductLoading = true;
      })
      .addCase(SingleProduct.fulfilled, (state, action) => {
        state.singleProductState.singleProductLoading = false;
        state.singleProductState.singleProductData = action.payload;
      })
      .addCase(SingleProduct.rejected, (state, action) => {
        state.singleProductState.singleProductLoading = false;
        state.singleProductState.singleProductError = action.payload.error;
      })

      .addCase(UpdateProduct.pending, (state) => {
        state.updateProductState.updateProductLoading = true;
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        state.updateProductState.updateProductLoading = false;
        state.updateProductState.updateProductData = action.payload;
      })
      .addCase(UpdateProduct.rejected, (state, action) => {
        state.updateProductState.updateProductLoading = false;
        state.updateProductState.updateProductError = action.payload.error;
      })

      .addCase(DeleteProduct.pending, (state) => {
        state.deleteProductState.deleteProductLoading = true;
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.deleteProductState.deleteProductLoading = false;
        state.deleteProductState.deleteProductData = action.payload;
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.deleteProductState.deleteProductLoading = false;
        state.deleteProductState.deleteProductError = action.payload.error;
      })

      .addCase(SearchProduct.pending, (state) => {
        state.searchProductState.searchProductLoading = true;
      })
      .addCase(SearchProduct.fulfilled, (state, action) => {
        state.searchProductState.searchProductLoading = false;
        state.searchProductState.searchProductData = action.payload;
      })
      .addCase(SearchProduct.rejected, (state, action) => {
        state.searchProductState.searchProductLoading = false;
        state.searchProductState.searchProductError = action.payload.error;
      })

      .addCase(ShareProductDetails.pending, (state) => {
        state.shareProductDetailsState.shareProductDetailsLoading = true;
      })
      .addCase(ShareProductDetails.fulfilled, (state, action) => {
        state.shareProductDetailsState.shareProductDetailsLoading = false;
        state.shareProductDetailsState.shareProductDetailsData = action.payload;
      })
      .addCase(ShareProductDetails.rejected, (state, action) => {
        state.shareProductDetailsState.shareProductDetailsLoading = false;
        state.shareProductDetailsState.shareProductDetailsError =
          action.payload.error;
      })

      .addCase(ProductSuggestions.pending, (state) => {
        state.productSuggestionState.productSuggestionLoading = true;
      })
      .addCase(ProductSuggestions.fulfilled, (state, action) => {
        state.productSuggestionState.productSuggestionLoading = false;
        state.productSuggestionState.productSuggestionData = action.payload;
      })
      .addCase(ProductSuggestions.rejected, (state, action) => {
        state.productSuggestionState.productSuggestionLoading = false;
        state.productSuggestionState.productSuggestionError =
          action.payload.error;
      })

      .addCase(ConsumableProducts.pending, (state) => {
        state.consumableProductsState.consumableProductsLoading = true;
      })
      .addCase(ConsumableProducts.fulfilled, (state, action) => {
        state.consumableProductsState.consumableProductsLoading = false;
        state.consumableProductsState.consumableProductsData = action.payload;
      })
      .addCase(ConsumableProducts.rejected, (state, action) => {
        state.consumableProductsState.consumableProductsLoading = false;
        state.consumableProductsState.consumableProductsError =
          action.payload.error;
      })

      .addCase(ProductsByNameAndType.pending, (state) => {
        state.productsByNameAndTypeState.productsByNameAndTypeLoading = true;
      })
      .addCase(ProductsByNameAndType.fulfilled, (state, action) => {
        state.productsByNameAndTypeState.productsByNameAndTypeLoading = false;
        state.productsByNameAndTypeState.productsByNameAndTypeData =
          action.payload;
      })
      .addCase(ProductsByNameAndType.rejected, (state, action) => {
        state.productsByNameAndTypeState.productsByNameAndTypeLoading = false;
        state.productsByNameAndTypeState.productsByNameAndTypeError =
          action.payload.error;
      });
  },
});

export const {
  resetRegisterProductState,
  resetProductsByNameAndTypeState,
  resetDeleteProductState,
  resetShareProductDetailsState,
  resetUpdateProductState,
} = productSlice.actions;
export default productSlice.reducer;
