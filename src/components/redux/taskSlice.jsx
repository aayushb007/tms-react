import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = 'http://localhost:3002/task';

export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  });

  export const addTaskAsync = createAsyncThunk('task/addTask', async (task) => {
    const response = await fetch('http://localhost:3002/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data;
  });
  export const deleteTaskAsync = createAsyncThunk('task/deleteTask', async (taskId) => {
    const res = await fetch(`${apiUrl}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const data = await res.json();
    return data;
  });
  
const taskSlice = createSlice({
    name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
//     addTask: (state, action) => {
//       state.entities.push(action.payload);
//     },
//     deleteTask: (state, action) => {
//       state.entities = state.entities.filter((task) => task.id!== action.payload);
//     },
//     updateTask: (state, action) => {
//         const index = state.entities.findIndex((task) => task.id === action.payload.id);
//         state.entities[index] = action.payload;
  
//   }
},
    extraReducers: (builder)=>{
                builder.addCase(fetchTasks.fulfilled, (state, action) => {
                    state.entities = action.payload;
                    state.loading = false;
                });
                builder.addCase(fetchTasks.pending, (state) => {
                    state.loading = true;
                });
                builder.addCase(fetchTasks.rejected, (state) => {
                    state.loading = false;
                });
                builder.addCase(addTaskAsync.fulfilled, (state, action) => {
                    state.entities.push(action.payload);
                });
                builder.addCase(addTaskAsync.pending, (state) => {
                    state.loading = true;
                });
                builder.addCase(addTaskAsync.rejected, (state) => {
                    state.loading = false;
                });
                builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
                    state.entities = state.entities.filter((task) => task.id!== action.payload);
                });
                
    }
})

export default taskSlice.reducer;