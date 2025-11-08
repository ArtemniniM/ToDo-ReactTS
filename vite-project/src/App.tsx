import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [input, setInput] = useState("");
  const [arr, setArr] = useState([]);

  async function getSomeData() {
    const response = await axios.get("https://dummyjson.com/todos");
    setArr(response.data.todos);
  }

  useEffect(() => {
    getSomeData();
  }, []);

  // function handleChange(el): void {
  //   el.completed = el.completed ? false : true;
  //   setArr([...arr]);
  // }

  function handleChange(id): void {
    const el = arr.find((item) => item.id === id);
    el.completed = !el.completed;
    setArr([...arr]);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <TextField
        fullWidth
        label="введите задачу"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        onClick={() =>
          setArr([
            ...arr,
            {
              id: arr.length + 1,
              todo: input,
              completed: false,
              userId: 152,
            },
          ])
        }
      >
        Показать ввод
      </Button>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", marginTop: "20px" }}>
        {arr.map((el: any) => {
          const labelId = `checkbox-list-label-${el.id}`;

          return (
            <ListItem key={el.id} disablePadding>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={el.completed}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleChange(el.id)}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ textDecoration: el.completed ? "line-through" : "none" }}
                  id={labelId}
                  primary={el.todo}
                />
              </ListItemButton>
              <IconButton
                onClick={() => {
                  setArr(arr.filter((item) => item.id !== el.id));
                }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default App;
