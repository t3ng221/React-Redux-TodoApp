/* eslint-disable react/prop-types */
// components/TodoCard.js
import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditNoteIcon from "@material-ui/icons/Edit";
import Proptypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  card: {
    transition: "transform 0.3s",
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0 0 10px 3px ${theme.palette.primary.main}`,
      transform: "scale(1.02)",
    },
  },
  deleteButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const TodoCard = ({ todo, onDeleteTodo, editTodo }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    description: "",
    id: Date.now(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdatedTodo({ title: "", description: "", id: Date.now() });
  };

  const handleSave = () => {
    editTodo(updatedTodo);
    setUpdatedTodo({ title: "", description: "", id: Date.now() });
    handleClose();
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {todo.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{
              whiteSpace: "normal",
              maxHeight: showFullDescription ? "none" : "3em",
              overflow: "hidden",
              justifyContent: "stretch",
            }}
          >
            {todo.description}
          </Typography>
          {todo.description.length > 100 && (
            <IconButton onClick={handleToggleDescription}>
              {showFullDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteTodo(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleClickOpen()}
          >
            <EditNoteIcon />
          </IconButton>
        </CardContent>
      </Card>

      {/* here is the edit dialog start */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            defaultValue={todo.title}
            onChange={(e) => setUpdatedTodo({ ...todo, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            defaultValue={todo.description}
            onChange={(e) =>
              setUpdatedTodo({ ...todo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* here is the edit dialog end */}
    </>
  );
};

TodoCard.propTypes = {
  todo: Proptypes.object,
  onDeleteTodo: Proptypes.func,
};

export default TodoCard;
