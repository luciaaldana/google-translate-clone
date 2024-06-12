import { useReducer } from 'react';
import { FromLanguage, Language, type Action, type State } from '../types.d';
import { AUTO_LANGUAGE } from '../constants';

// 1. Create a initial state
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

// 2. Create a reducer
function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGES') {
    // state logic within the reducer. It helps me avoid this in components.
    if (state.fromLanguage === AUTO_LANGUAGE) return state;

    const loading = state.fromText !== '';

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state;

    const loading = state.fromText !== '';

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state;

    const loading = state.fromText !== '';

    return {
      ...state,
      toLanguage: action.payload,
      loading,
    };
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== '';

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: '',
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  // 3. Use useReducer
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(reducer, initialState);

  // Export a contract that you can use anywhere and that if tomorrow changes, you can do it without any problem (no return dispatch ).
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    // 4. NO! Return the dispatch, Because we are tying the component to dispatch, and if one day we want to update to redux, for example, the rest of the components do not have to know.
    // dispatch, ❌
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
