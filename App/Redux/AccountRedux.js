import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: ['account'],
  accountSuccess: ['payload'],
  accountFailure: null
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  account: null,
  authenticated: false,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getAccount: state => state.account
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { account }) =>
  state.merge({ fetching: true, account, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ authenticated: true, fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure
})
