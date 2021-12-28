import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ptBR } from "date-fns/locale";
import DatePicker from '@mui/lab/DatePicker';

interface DateProps {
  value: string;
  onChange: any;
}

export default function Calendar({value, onChange}:DateProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
      <DatePicker
        label="Selecionar"
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}