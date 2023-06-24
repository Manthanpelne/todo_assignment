
/// add todo

let one = document.querySelector("#container");
let arr = [];
async function getTodos() {
  try {
    let data = await fetch("http://localhost:4500/api/todo/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    if (data.ok) {
      let todoData = await data.json();
      console.log(todoData);
      arr.push(todoData);
      renderTodos(todoData);
    }
  } catch (error) {
    console.log(error.message);
  }
}
getTodos();

function renderTodos(arr) {
  one.innerHTML = "";
  let newdata = arr.map((ele) => {
    return `
      <div class="cardData">
          
          <h3> Title: ${ele.title}</h3> 
          <p>Description:  ${ele.description}</p>

          <div class="btns">
         <button id="update" data-id=${ele._id} onclick="myButton()">Update</button> 
         <button id="delete" data-id=${ele._id}  onclick="deletefunction()">Delete</button> 
          </div>

          </div>
      `;
  });
  one.innerHTML = newdata.join(" ");
}

let title = document.querySelector("#title");
let desc = document.querySelector("#description");

function AddTodoFun() {
  let obj = {
    title: title.value,
    description: desc.value,
  };
  async function AddTodos() {
    try {
      let data = await fetch("http://localhost:4500/api/todo/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "content-type": "application/json",
        },
      });
      if (data.ok) {
        let todoData = await data.json();
        title.value=""
        desc.value=""
        console.log(todoData);
        getTodos(todoData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  AddTodos();
}

//delete todos
function deletefunction() {
  let id = event.target.dataset.id
deleteTodo(id)
  async function deleteTodo(id) {
    try {
      let data = await fetch(`http://localhost:4500/api/todo/delete/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (data.ok) {
        let todoData = await data.json();
        console.log(todoData);
        getTodos(todoData);
      }
    } catch (error) {
      console.log(error);
    }
  }

}



///update todo

function myButton() {
  document.getElementById("myPopup").style.display = "block";
  let id = event.target.dataset.id;
  localStorage.setItem("todoID", id);
}

let Title = document.querySelector("#Title");
let Desc = document.querySelector("#Desc");

function submit() {
  let editObj = {
    title: Title.value,
    description: Desc.value,
  };
  let Id = localStorage.getItem("todoID");
  updateTodo(Id);
  async function updateTodo(Id) {
    try {
      let data = await fetch(`http://localhost:4500/api/todo/update/${Id}`, {
        method: "PATCH",
        body: JSON.stringify(editObj),
        headers: {
          "content-type": "application/json",
        },
      });
      if (data.ok) {
          alert("Todo has been updated!!")
        let todoData = await data.json();
        console.log(todoData);
        getTodos(todoData);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("myPopup").style.display = "none";
});