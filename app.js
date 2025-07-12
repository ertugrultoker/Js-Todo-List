//Tüm Elementleri Seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];


runEvents();

function runEvents(){

form.addEventListener("submit",addTodo);    
document.addEventListener("DOMContentLoaded",pageLoaded);
secondCardBody.addEventListener("click",removeTodoUI); //FA REMOVE CLİCK
clearButton.addEventListener("click",allTodosEverywhere);//ALL CLEAN BUTTON
filterInput.addEventListener("keyup",filter);//filtreleme inputunda klavyeden elimizi çekince çalışacak filtreleme eventi eklendi
}

 function pageLoaded(){
   checkTodosFromStorage();
   todos.forEach(function(todo){

     addTodoToUI(todo);

   });

}

function filter(e){
  const filterValue = e.target.value.toLowerCase().trim(); 
  const todoListesi = document.querySelectorAll(".list-group-item");

  if(todoListesi.length>0){
    todoListesi.forEach(function(todo){
      if(todo.textContent.toLowerCase().trim().includes(filterValue)){;

         todo.setAttribute("style","display: block");
      }else{
        todo.setAttribute("style","display: none !important");
      }
    });
  }else{
    showAlert("warning","filtreleme yapabilmek için en az bir adet todo bulunmalıdır");
  }
}

 function allTodosEverywhere(){ //TÜM TODOLARI TEMİZLE BUTONUNUN METODLARI

  const todoListesi = document.querySelectorAll(".list-group-item");
  if(todoListesi.length>0){
    //ekrandan silmek
    todoListesi.forEach(function(todo){
      todo.remove();
    });
    //storage'dan silmek
    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos));
    showAlert("success","Tümü Başarıyla Silindi");
  }else{
    showAlert("warning","En Az Bir Adet Todo Olmalıdır!!");
  }

 }
 
 function removeTodoUI(e){ //EKRANDA FA ETİKETİNE BASINCA EKRANDAN VE STORAGE'DAN SİLEN METOD

  if(e.target.className == "fa fa-remove"){
    //ekrandan silmek
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    //storage'dan silmek
    removeTodoStorage(todo.textContent);

    showAlert("success","Başarıyla Silindi.");
  }
 }

 function removeTodoStorage(removeTodo){
  checkTodosFromStorage();
  todos.forEach(function(todo,index){
    if(removeTodo==todo){
      todos.splice(index,1);
    }
  });
  localStorage.setItem("todos",JSON.stringify(todos));
 }


 function addTodo(e){
    const inputText = addInput.value.trim();//trimin anlamı sağından ve solundan eklenmiş boşlukları temizle öyle çıktı ver demektir.
      if(inputText==null || inputText==""){
        showAlert("warning","Lütfen boş bırakmayınız!!");
      }else{
        //arayüze ve localStorage ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo Eklendi.");
        
      }
    //console.log("submit event'ı çalıştı"); tuş denendi.
    
    

    e.preventDefault(); //yeni sayfa açılmasının engellemek için kullanıldı
}

function addTodoToUI(newTodo){

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href= "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i); //elemenleri appendChild metod ile iç içe koyduk
    li.appendChild(a);
    todoList.appendChild(li); //tolistimiz tablomuzun li'sini barındıran elementimiz en son hepsi onun içine eklenmiş oldu.

    addInput.value = "";// değer eklemesi yapıldıktan sonra inputun içinin temizlenmesi için

}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

    
}

function checkTodosFromStorage(){

    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

}

function showAlert(type, message){
//   <div class="alert alert-success" role="alert">    //bootstrapten alert kodları olarak buldum.
//   A simple success alert—check it out!
// </div>
   const div = document.createElement("div");
   div.className = "alert alert-"+ type;
  //  div.className = `alert alert-${type}`; template literals
   div.textContent = message;
   firstCardBody.appendChild(div);

   setTimeout(function(){
      div.remove();//setTimeout açılan popUpımızın ne kadar süre sonra kapanmasının istiyorsak kullanabileceğimiz bir metod.
   },2500);

} 


