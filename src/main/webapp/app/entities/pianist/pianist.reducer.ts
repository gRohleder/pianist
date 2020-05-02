import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPianist, defaultValue } from 'app/shared/model/pianist.model';

export const ACTION_TYPES = {
  FETCH_PIANIST_LIST: 'pianist/FETCH_PIANIST_LIST',
  FETCH_PIANIST: 'pianist/FETCH_PIANIST',
  CREATE_PIANIST: 'pianist/CREATE_PIANIST',
  UPDATE_PIANIST: 'pianist/UPDATE_PIANIST',
  DELETE_PIANIST: 'pianist/DELETE_PIANIST',
  RESET: 'pianist/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPianist>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PianistState = Readonly<typeof initialState>;

// Reducer

export default (state: PianistState = initialState, action): PianistState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PIANIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PIANIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PIANIST):
    case REQUEST(ACTION_TYPES.UPDATE_PIANIST):
    case REQUEST(ACTION_TYPES.DELETE_PIANIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PIANIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PIANIST):
    case FAILURE(ACTION_TYPES.CREATE_PIANIST):
    case FAILURE(ACTION_TYPES.UPDATE_PIANIST):
    case FAILURE(ACTION_TYPES.DELETE_PIANIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PIANIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PIANIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PIANIST):
    case SUCCESS(ACTION_TYPES.UPDATE_PIANIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PIANIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/pianists';

// Actions

export const getEntities: ICrudGetAllAction<IPianist> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PIANIST_LIST,
  payload: axios.get<IPianist>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPianist> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PIANIST,
    payload: axios.get<IPianist>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPianist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PIANIST,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPianist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PIANIST,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPianist> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PIANIST,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
