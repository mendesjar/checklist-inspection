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
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SliderLevel } from '@/components/slider-level';

export default function ChecklistInspecao() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fuelLevel, setFuelLevel] = useState(100);

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

          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Modelo" />
            <Input placeholder="UF / Cidade" />
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

          <Button className="mt-6">Salvar Checklist</Button>
        </CardContent>
      </Card>
    </div>
  );
}
