export const types = {
  GET_STORES: 'GET_STORES',
  GET_PROFILE: 'GET_PROFILE',
};

export const initialState = {
  stores: [],
  profile: null,
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_STORES:
      return {
        ...state,
        stores: action.payload.map(store => ({
          ...store,
          location: JSON.parse(store.location),
        })),
      };

    case types.GET_PROFILE:
      return { ...state, profile: action.payload };

    default:
      return state;
  }
}
