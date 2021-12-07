const initialState = {
  loading: false,
};

export const alertReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOADING':
      return { ...state, loading: payload };

    default:
      return state;
  }
};
