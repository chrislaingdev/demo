function addToDo() {
  const todoElement = document.getElementById("new-todo");
  const todo = todoElement.value;
  todoElement.value = "";
  if (todo.length < 3) {
    return alert("you must have at least 3 characters for your TODO item.")
  }
  const list = document.getElementById("list");
  const li = document.createElement("li");
  const text = document.createTextNode(todo);

  li.setAttribute("onclick", "this.remove()")

  li.appendChild(text);
  list.appendChild(li);
}