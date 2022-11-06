import React, { useEffect } from "react";
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
// Icons
import EditIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/DoneAllTwoTone";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useNavigate } from "react-router-dom";

const useStyles =  makeStyles(theme => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createData = (id, userName, email, firstName, lastName, address, role) => ({
  id, 
  userName, 
  email, 
  firstName, 
  lastName, 
  address, 
  role,
  isEditMode: false
});

const CustomTableCell = ({ row, name, objectKey, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={name}
          name={objectKey}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        name || "N/A"
      )}
    </TableCell>
  );
};

export default function TableComponent({data, tableHeader, updateHandler, deleteHandler}) {
  const navigate = useNavigate()
  const [rows, setRows] = React.useState([]);

  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    const tempRows = data?.map((employee) => createData(employee._id, employee.userName, employee.email, employee.firstName, employee.lastName, employee.address, employee.role))
    setRows(tempRows)
  }, [data])

  const onToggleEditMode = id => {
    setRows(state => {
      return state.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const updateUser = (id) => {
     data = rows.find(row => row.id === id)
     updateHandler(data)
     onToggleEditMode(id)
  }

  const deleteUser = (id) => {
     deleteHandler(id)
     setRows([])
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Employee List</caption>
        <TableHead>
          <TableRow>
            {tableHeader && tableHeader.length && tableHeader.map((header) => <TableCell key={header} align="left">{header}</TableCell>)}
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length && rows.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{index + 1}</TableCell>
              <CustomTableCell {...{ row, name: row.userName, objectKey: "userName", onChange }} />
              <CustomTableCell {...{ row, name: row.email , objectKey: "email", onChange }} />
              <CustomTableCell {...{ row, name: row.firstName, objectKey: "firstName", onChange }} />
              <CustomTableCell {...{ row, name: row.lastName, objectKey: "lastName", onChange }} />
              <CustomTableCell {...{ row, name: row.address, objectKey: "address", onChange }} />
              <CustomTableCell {...{ row, name: row.role, objectKey: "role", onChange }} />
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => updateUser(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(row.id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell className={classes.selectTableCell}>     
                  <IconButton
                    onClick={() => deleteUser(row.id)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>   
              </TableCell>
              <TableCell className={classes.selectTableCell}>     
                  <IconButton
                    onClick={() => navigate(`/profile/${row.id}`)}
                  >
                    <AccountBoxOutlinedIcon />
                  </IconButton>   
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
