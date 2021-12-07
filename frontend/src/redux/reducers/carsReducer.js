const initialState ={
  cars : [],
  bookingCars : []
}

export const carsReducer = (state = initialState , {type, payload}) =>{
  switch (type) {
    case 'GET_ALL_CARS':
      return {...state, cars : payload}
    case 'GET_BOOKING_CARS' :
      return {...state, bookingCars : payload}

    default:
      return state
  }
}