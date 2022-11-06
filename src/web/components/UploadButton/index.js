import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function UploadButtons({text, importHandler}) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
         {text}
        <input hidden accept=".xlsx, .xls, .csv" type="file" 
          onChange={e => {
            importHandler(e.target.files[0]);
          }}
         />
      </Button>
    </Stack>
  );
}