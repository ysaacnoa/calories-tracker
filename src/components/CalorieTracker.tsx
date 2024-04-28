import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {
  
  //contadores
  const caloriesConsumed = useMemo(() => activities.reduce((acc, curr ) => curr.category === 1 ? acc + curr.calories : acc, 0),[activities])

  const caloriesBurned = useMemo(() => activities.reduce((acc, curr) => curr.category === 2 ? acc + curr.calories : acc, 0),[activities])
  
  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesConsumed, caloriesBurned]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center ">
        Resumen de Calorías
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay
          calories={caloriesConsumed}
          text="Consumidas"
        />
        <CaloriesDisplay
          calories={caloriesBurned}
          text="Quemadas"
        />
        <CaloriesDisplay
          calories={netCalories}
          text="Netas"
        />
      </div>


    </>
  );
}
