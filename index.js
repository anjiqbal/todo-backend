import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]); // Respond with the created todo item
    console.log("successfully added")
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred" }); // Respond with an error message
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (err) {
    console.log(err.message);
  }
});

//delete a todo 
app.delete("/todos/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id])
        res.json("todo was deleted!")
    }catch(err){
        console.log(err.message)
    } 
})



app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
