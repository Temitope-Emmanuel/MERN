import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import Proptypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1.5,0.5),
    },
  },
}));

const Chips = (props) => {
    const [label,setLabel] = useState("Grocery")
  const classes = useStyles();

  const handleLabel = (value) => (e)  => {
      setLabel(value)
      props.onChange(value)
  }
  const handleDelete = () => {

  }

  return (
        <Typography>
        <h3>Please Select a Category</h3>
    <Paper elevation={3} className={classes.root}>
      <Chip
        icon={<LocalGroceryStoreIcon/>}
        label="Grocery"
        // clickable
        color="primary"
        onDelete={handleDelete}
        onClick={handleLabel("Grocery")}
        deleteIcon={label === "Grocery" ?<DoneIcon/> : <AddIcon />}
      />
      <Chip
        icon={<ImportantDevicesIcon/>}
        label="Technology"
        clickable
        color="secondary"
        onDelete={handleDelete}
        onClick={handleLabel("Technology")}
        deleteIcon={label === "Technology" ?<DoneIcon/> : <AddIcon />}
      />
      <Chip
        icon={<CastForEducationIcon/>}
        label="Education"
        clickable
        color="default"
        onDelete={handleDelete}
        onClick={handleLabel("Education")}
        deleteIcon={label === "Education" ?<DoneIcon/> : <AddIcon />}
      />
      <Chip
        icon={<FastfoodIcon/>}
        label="Food"
        clickable
        color="primary"
        onDelete={handleDelete}
        onClick={handleLabel("Food")}
        deleteIcon={label === "Food" ?<DoneIcon/> : <AddIcon />}
      />
      <Chip
        icon={<HomeWorkIcon/>}
        label="Office"
        clickable
        color="primary"
        onDelete={handleDelete}
        onClick={handleLabel("Office")}
        deleteIcon={label === "Office" ?<DoneIcon/> : <AddIcon />}
      />
      <Chip
        icon={<FaceIcon/>}
        label="Entertainment"
        clickable
        color="primary"
        onDelete={handleDelete}
        onClick={handleLabel("Entertainment")}
        deleteIcon={label === "Entertainment" ?<DoneIcon/> : <AddIcon />}
      />
      </Paper>
        </Typography>
  );

  Chips.propTypes = {
    onChange:Proptypes.func.isRequired
  }
}
export default Chips