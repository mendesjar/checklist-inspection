import { useState } from 'react';
import { Checkbox } from './components/ui/checkbox';
import { Label } from './components/ui/label';
import { CheckedState } from '@radix-ui/react-checkbox';

function App() {
  const [checklist, setChecklist] = useState({
    newVehicle: false,
    oldVehicle: false,
  });

  function onChangeCheckBox(name: string, checked: CheckedState) {
    setChecklist({
      ...checklist,
      [name]: checked,
    });
  }

  return (
    <>
      <div className="relative z-20 h-dvh w-full bg-blue-500">
        <div className="flex h-full w-screen justify-center bg-red-500 p-5">
          <div className="aspect-3/4 rounded-xl bg-purple-200">
            <div className="flex items-center justify-between bg-amber-100 px-6 py-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/2560px-Disney%2B_logo.svg.png"
                alt="logomarca"
                className="h-14"
              />
              <Label className="text-2xl font-bold uppercase">
                CheckList de Inspeção
              </Label>
            </div>
            <div className="flex items-center justify-center bg-amber-400 py-4">
              <Label>Teste de escrita</Label>
            </div>
            <div className="flex items-center justify-center gap-x-10 bg-amber-800 py-5">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="newVehicle"
                  name="newVehicle"
                  onCheckedChange={(checked) =>
                    onChangeCheckBox('newVehicle', checked)
                  }
                  checked={checklist.newVehicle}
                />
                <label
                  htmlFor="newVehicle"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Veículo Novo
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="oldVehicle"
                  name="oldVehicle"
                  onCheckedChange={(checked) =>
                    onChangeCheckBox('oldVehicle', checked)
                  }
                  checked={checklist.oldVehicle}
                />
                <label
                  htmlFor="oldVehicle"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Veículo Usado
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
