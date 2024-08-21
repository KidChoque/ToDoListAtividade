import React, { useState, useEffect } from "react";
import "./modal.css";

const Modal = ({
  modalTitle = "Descreva Sua Tarefa",
  TaskText = "Digite....",
  showHideModal = false,
  addTask,
  updateTask,
  editingTask // Recebe a tarefa que está sendo editada
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (editingTask) {
      setInputValue(editingTask.name); // Preenche o campo de entrada com o nome da tarefa
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (editingTask) {
      updateTask(inputValue); // Atualiza a tarefa existente
    } else {
      addTask(inputValue); // Adiciona uma nova tarefa
    }
    setInputValue("");
  };

  return (
    <div className="modal">
      <h1 className="title">{modalTitle}</h1>
      <input
        type="text"
        className="taskText"
        placeholder={TaskText}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn-confirm-task" onClick={handleSubmit}>
        {editingTask ? "Atualizar Tarefa" : "Adicionar Tarefa"}
      </button>
    </div>
  );
};

export default Modal;
     