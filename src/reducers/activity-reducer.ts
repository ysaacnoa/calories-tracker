import { Activity } from "../types";

//actions
export type ActivityActions = 
  { type: 'save-activity', payload: { newActivity: Activity } };

type ActivityState = {
  activities: Activity[];
};

//initial state
export const initialState: ActivityState = {
  activities: [],
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  
  if(action.type === 'save-activity'){
    //handle logic to update state
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity]
    };
  }

  return state;
};
