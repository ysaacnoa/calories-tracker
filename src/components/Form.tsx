import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'

import { categories } from "../data/categories"
import { Activity } from '../types'
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialActivity: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0,
}

export default function Form( {dispatch, state}: FormProps ){

  const [activity, setActivity] = useState<Activity>(initialActivity)

  useEffect(()=>{
    if(state.activeId){
      const [selectedActivity] = state.activities.filter(
        stateActivity => stateActivity.id === state.activeId
      )
     setActivity(
      selectedActivity
     ) 
    }
  },[state.activeId])

  type EventForm = ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>

  const handleChange = (e: EventForm) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    
    setActivity({
      ...initialActivity,
      id: uuidv4(),
    })
  }

  return(
    <form 
      className="space-y-5 bg-white shadow-md rounded-lg p-10"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select
          id="category" 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => (
            <option 
              key={category.id} 
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input 
          id="name" 
          type="text" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: Correr 5km, nadar 30min, etc."
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="fonr-bold">Calorias:</label>
        <input 
          id="calories"
          type="number" 
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: 500, 1000, etc."
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <input 
          type="submit"
          className="bg-black text-white text-center font-bold uppercase py-2 rounded-lg transition-opacity duration-300 cursor-pointer hover:bg-slate-900 
          disabled:opacity-10 disabled:cursor-not-allowed disabled:transition-opacity disabled:duration-300"  
          value={activity.category === 1 ? 'Agregar Comida' : 'Agregar Actividad'}
          disabled={!isValidActivity()}
        />
      </div>
    </form>
  )
}