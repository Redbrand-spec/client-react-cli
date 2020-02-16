const initialState = {
  cources: [],
}

export default function Tocen (state = initialState, action ){
  switch(action.type){
    case 'COURCES_ADD':
      let cources = [ ...state.cources ]
      cources = action.cources
      return {
        ...state, cources
      }
    default:
      return state
  }
}