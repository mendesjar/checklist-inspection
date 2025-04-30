import { useState } from 'react';
import { ChecklistLayout } from './layout';

function App() {
  const [checklist, setChecklist] = useState<{
    newVehicle: false;
    oldVehicle: false;
  }>({
    newVehicle: false,
    oldVehicle: false,
  });

  return (
    <>
      <ChecklistLayout checklist={checklist} setChecklist={setChecklist} />
    </>
  );
}

export default App;
