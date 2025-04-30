import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SliderLevel } from '@/components/slider-level';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const baseUrl = 'https://parallelum.com.br/fipe/api/v1';

interface IChecklistLayout {
  checklist: {
    newVehicle: false;
    oldVehicle: false;
  };
  setChecklist: Dispatch<
    SetStateAction<{
      newVehicle: false;
      oldVehicle: false;
    }>
  >;
}

export function ChecklistLayout(props: IChecklistLayout) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fuelLevel, setFuelLevel] = useState(100);
  const [modelos, setModelos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  async function buscarMarcas() {
    const apiData = await fetch(`${baseUrl}/carros/marcas`);
    const apiResult = await apiData.json();
    setMarcas(apiResult);
  }

  async function buscarModelos(codigo: string) {
    if (!codigo) setModelos([]);
    const apiData = await fetch(`${baseUrl}/carros/marcas/${codigo}/modelos`);
    const apiResult = await apiData.json();
    setModelos(apiResult.modelos);
  }

  useEffect(() => {
    buscarMarcas();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Check List de Inspeção</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label>Estado do veículo</Label>

              <div className="mt-2 flex items-center gap-4">
                <RadioGroup
                  defaultValue="veiculoNovo"
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="veiculoNovo" id="veiculoNovo" />
                    <Label htmlFor="veiculoNovo">Veículo Novo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="veiculoUsado" id="veiculoUsado" />
                    <Label htmlFor="veiculoUsado">Veículo Usado</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="grid w-full max-w-sm items-center gap-0.5">
              <Label htmlFor="placa">Placa</Label>
              <Input
                id="placa"
                name="placa"
                className="uppercase"
                maxLength={7}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-0.5">
              <Label htmlFor="km">KM</Label>
              <Input id="km" name="km" type="number" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-0.5">
              <Label htmlFor="data">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon />
                    {date ? (
                      format(date, 'dd/MM/yyyy')
                    ) : (
                      <span>Escolha a data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid w-full max-w-sm items-center gap-0.5">
              <Label htmlFor="hora">Hora</Label>
              <Input id="hora" name="hora" type="time" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid w-full max-w-sm items-center gap-0.5">
              <Label htmlFor="marca">Marca</Label>
              <Select onValueChange={async (e) => await buscarModelos(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Marca</SelectLabel>
                    {marcas?.length
                      ? marcas.map(
                          (marca: { codigo: string; nome: string }) => (
                            <SelectItem
                              key={marca.codigo}
                              value={marca.codigo}
                              className="uppercase"
                            >
                              {marca.nome}
                            </SelectItem>
                          ),
                        )
                      : null}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-0.5">
              <Label htmlFor="modelo">Modelo</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o Modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modelo</SelectLabel>
                    {modelos?.length
                      ? modelos.map(
                          (modelo: { codigo: string; nome: string }) => (
                            <SelectItem
                              key={modelo.codigo}
                              value={modelo.nome}
                              className="uppercase"
                            >
                              {modelo.nome}
                            </SelectItem>
                          ),
                        )
                      : null}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-0.5">
              <Label htmlFor="uf">UF / Cidade</Label>
              <Input id="uf" name="uf" />
            </div>
          </div>

          <div className="grid items-center gap-4 md:grid-cols-3">
            <SliderLevel fuelLevel={fuelLevel} setFuelLevel={setFuelLevel} />

            <div className="flex flex-col gap-y-4">
              <div>
                <Label>
                  Documento original (CRLV) <br /> se encontra no Veículo
                </Label>
                <RadioGroup defaultValue="comCRLV" className="mt-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comCRLV" id="comCRLV" />
                    <Label htmlFor="comCRLV">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="semCRLV" id="semCRLV" />
                    <Label htmlFor="semCRLV">Não</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label>
                  Veículo devolvido
                  <br /> excessivamente sujo?
                </Label>
                <RadioGroup defaultValue="veiculoSujo" className="mt-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="veiculoSujo" id="veiculoSujo" />
                    <Label htmlFor="veiculoSujo">Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="veiculoLimpo" id="veiculoLimpo" />
                    <Label htmlFor="veiculoLimpo">Não</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div>
            <Label>Observações</Label>
            <Textarea className="mt-2" placeholder="Digite aqui..." />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Nome e Assinatura do Condutor</Label>
              <Input placeholder="Nome" className="mt-2" />
              <Input placeholder="RG" className="mt-2" />
              <Input placeholder="Telefone" className="mt-2" />
              <Input placeholder="Email" className="mt-2" />
            </div>
            <div>
              <Label>Responsável pela Entrega</Label>
              <Input placeholder="Nome" className="mt-2" />
              <Label className="mt-4 block">Nome Fantasia do Fornecedor</Label>
              <Input placeholder="Fornecedor" className="mt-2" />
            </div>
          </div>

          <Button className="mt-6 cursor-pointer">
            <span>
              <FileText />
            </span>
            Salvar Checklist
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
