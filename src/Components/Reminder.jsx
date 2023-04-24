import React, { useEffect } from "react";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import { db } from "../firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Reminder = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [count, setCount] = useState(true);
  const [updateId, setUpdateId] = useState(0);

  const handleChange = (e) => setNewTask(e.target.value);

  const [value, setValue] = useState(null);
  const addTodo = async (task) => {
    try {
      const docRef = await addDoc(collection(db, "reminders"), {
        task: task,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
//   const querySnapshot = await getDocs(collection(db, "reminders"));
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
//   });

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
  const timeDate = formatDate(value?.$d);

  const updateAddTask = () => {
    setTodoList(
      todoList.map((data) =>
        updateId === data.id
          ? { ...data, taskName: newTask, timeDate: timeDate }
          : data
      )
    );
    setCount(true);
    setNewTask("");
  };
  const addTask = async () => {
    if (newTask !== "") {
      const now = new Date();
      const newTaskWithTime = {
        id: todoList.length + 1,
        taskName: newTask,
        complete: true,
        timeDate: timeDate,
      };
      if (count) {
        setTodoList([...todoList, newTaskWithTime]);
        await addTodo(newTaskWithTime);
        setNewTask("");
      } else updateAddTask();
    } else alert("Enter Task to add");
  };

  const deleteTask = (id) =>
    setTodoList(todoList.filter((task) => task.id !== id));

  const updateTask = (id, task, complete) => {
    if (complete) {
      setNewTask(task);
      setCount(false);
      setUpdateId(id);
    } else {
      alert("Completed task cannot be updated");
    }
  };

  const completeTask = (value) => {
    setTodoList(
      todoList.map((data) =>
        value.id === data.id ? { ...data, complete: false } : data
      )
    );
  };
  console.log(todoList);

//   useEffect(() => {
//     let URLdata = `https://console.firebase.google.com/project/fir-f66cd/firestore/data/~2Freminders~2FKmmg23p6S0uUJ332pEX8`;
//     axios
//       .get(URLdata)
//       .then((response) => {
//         setData(response.data);
//         setCopyData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="header">Reminder</div>
          <div className="inputbox">
            <input
              className="inputText"
              onChange={handleChange}
              value={newTask}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Select Date & Time"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button
              size="small"
              style={{ marginLeft: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => addTask()}
            >
              {" "}
              Add Reminder
            </Button>
          </div>
          <div className="list">
            {todoList.map((data, index) => {
              return (
                <div className="eachlist" key={data.id}>
                  <div>
                    {data.complete ? (
                      <h3>{data.taskName}</h3>
                    ) : (
                      <h3>
                        <s>{data.taskNametaskName}</s>
                      </h3>
                    )}
                  </div>
                  <div>
                    {data.complete ? (
                      <h3>{data.timeDate}</h3>
                    ) : (
                      <h3>
                        <s>{data.timeDate}</s>
                      </h3>
                    )}
                  </div>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      onClick={() =>
                        updateTask(data.id, data.taskName, data.complete)
                      }
                      startIcon={<EditIcon />}
                    >
                      Update
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => deleteTask(data.id)}
                      startIcon={<DeleteForeverIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() => completeTask(data)}
                      startIcon={<CheckIcon />}
                    >
                      Complete
                    </Button>
                  </Stack>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reminder;
