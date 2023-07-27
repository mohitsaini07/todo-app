const add_todo = () => {
  let title = document.getElementById("todo_title").value;
  let descp = document.getElementById("dscp").value;

  if (title.trim() === "" || descp.trim() === "") {
    return; // Exit the function if title or description is empty
  }

  let todos = [];

  let localTodos = localStorage.getItem("todos");

  if (localTodos != null) {
    try {
      todos = JSON.parse(localTodos);
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
    }
  }

  let todoObject = {
    title: title,
    descp: descp,
    id: Math.trunc(Math.random() * 1000),
  };

  todos.push(todoObject);

  try {
    localStorage.setItem("todos", JSON.stringify(todos));
    show_todo();
  } catch (error) {
    console.error("Error storing todos in localStorage:", error);
  }
};

// Show the data:
const show_todo = () => {
  let todoString = localStorage.getItem("todos");
  let content = "";
  if (todoString == null) {
    content += "<h3 style='color: white'>NO TODO TO SHOW</h3>";
  } else {
    let todos = JSON.parse(todoString);
    for (let todo of todos) {
      content += `
      <div class = 'card' id="card-${todo.id}">
      <div class = 'card_body'>
      <h3>${todo.title}</h3>
      <p>${todo.descp}</p>
      <button class="delete_btn" onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
      </div>`;
    }
  }
  document.getElementById("main_content").innerHTML = content;
};
show_todo();

function deleteTodo(todoId) {
  // Remove the todo from the localStorage
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((todo) => todo.id !== todoId);
  localStorage.setItem("todos", JSON.stringify(todos));

  // Remove the todo card from the DOM
  let card = document.getElementById(`card-${todoId}`);
  if (card) {
    card.remove();
  }
}
