let tareas = [
  {
    tarea: "Agrega tu primera tarea",
    terminada: false,
    id: "1",
  },

];

//<div class="tarea sinTerminar">
  //          <span class="task-title">Scope Q1 upcoming work</span>
    //        <span class="priority">Medium</span>
      //      <span class="date">Wednesday</span>
        //</div>



const renderizarTareas = (tareas, divTareas) => {
  divTareas.innerHTML = "";

  tareas.forEach((tarea) => {
    const divNewTarea = document.createElement("div");
    divNewTarea.className += "tarea";

    divNewTarea.dataset.id = tarea.id;

    const h1Tarea = document.createElement("h1");

    if (tarea.terminada) {
      h1Tarea.className = "done";
    }

    h1Tarea.textContent = tarea.tarea;

    if (!tarea.terminada) {
      divNewTarea.className += " sinTerminar";
    } else {
      divNewTarea.className += " terminada";
    }

    divNewTarea.appendChild(h1Tarea);
    // divNewTarea.appendChild(document.createElement("hr"));

    const btnBrr = document.createElement("input");
    btnBrr.value = "Borrar";
    btnBrr.type = "Button";
    btnBrr.onclick = () => {
      deleteTarea(tarea.id);
    };
    divNewTarea.appendChild(btnBrr);

    const btnCompletar = document.createElement("input");

    if (tarea.terminada) {
      btnCompletar.value = "Marcar como no terminada";
    } else {
      btnCompletar.value = "Marcar como terminada";
    }

    btnCompletar.type = "Button";
    btnCompletar.onclick = () => {
      toggleDone(tarea.id);
    };
    divNewTarea.appendChild(btnCompletar);

    divTareas.appendChild(divNewTarea);


    const btnEditar = document.createElement("input");
    btnEditar.value = "Editar";
    btnEditar.type = "Button";
    divNewTarea.appendChild(btnEditar);

    // Lógica de edición
    btnEditar.onclick = () => {
      // Si el botón es "Guardar", actualiza la tarea
      if (btnEditar.value === "Guardar") {
        const inpNuevoTexto = divNewTarea.querySelector("input[type='text']");
        
          editTarea(tarea.id, inpNuevoTexto.value);

          btnEditar.value = "Editar"; 
        
      } else {
        
        const inpNuevoTexto = document.createElement("input");
        inpNuevoTexto.type = "text";
        inpNuevoTexto.value = tarea.tarea; 
        divNewTarea.appendChild(inpNuevoTexto);
        btnEditar.value = "Guardar"; 
      }
    };

    divTareas.appendChild(divNewTarea);




  });
};

const aggtarea = (tarea) => {
  tareas.push({
    tarea: tarea,
    terminada: false,
    id: Date.now(),
  });
};

const divTareas = document.querySelector(".tareas");

renderizarTareas(tareas, divTareas);

const newTarea = () => {
  const entrada = document.querySelector(".entrada");

  if (entrada.value === "") {
    return;
  }

  aggtarea(entrada.value);

  renderizarTareas(tareas, divTareas);

  entrada.value = "";
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      
   newTarea();   
  }
});



const toggleDone = (id) => {
  const obj = tareas.find((tarea) => tarea.id === id);

  obj.terminada = !obj.terminada;

  renderizarTareas(tareas, divTareas);
};

const deleteTarea = (id) => {
  tareas = tareas.filter((tarea) => tarea.id !== id);

  renderizarTareas(tareas, divTareas);
};


const editTarea = ( id, newTarea ) => {
  const obj = tareas.find((tarea) => tarea.id === id);

  obj.tarea = newTarea;

  renderizarTareas(tareas, divTareas);
}

