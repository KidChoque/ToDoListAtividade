import "./toDoListPage.css";
import Vector from "../assets/Vector.png";
import Modal from "../Components/Modal/modal";
import { useState } from "react";

const Form = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // Armazena a tarefa que está sendo editada

    const today = new Date();
    const day = today.getDate();
    const dayOfWeek = today.toLocaleDateString('pt-BR', { weekday: 'long' });
    const month = today.toLocaleDateString('pt-BR', { month: 'long' });

    const [tasks, setTasks] = useState([
        { id: 1, name: "Começar a execução do projeto", status: false },
        { id: 2, name: "Revisar documentação", status: true },
        { id: 3, name: "Enviar relatório semanal", status: false },
    ]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    function addTask(taskName) {
        const newTask = {
            id: tasks.length + 1,
            name: taskName,
            status: false
        };
        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function updateTask(id, newName) {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, name: newName } : task
        ));
    }

    function handleEditClick(task) {
        setEditingTask(task); // Armazena a tarefa que está sendo editada
        toggleModal(); // Abre o modal para edição
    }

    function handleUpdateTask(newName) {
        updateTask(editingTask.id, newName); // Atualiza a tarefa com o novo nome
        setEditingTask(null); // Limpa a tarefa que estava sendo editada
        toggleModal(); // Fecha o modal
    }

    return (
        <main className="main-content">
            <div className="body">
                <div className="box">
                    <p className="date">{dayOfWeek}, {day} de {month}</p>

                    <div className="search-task">
                        <img src={Vector} alt="" />
                        <input type="text" placeholder="Procurar tarefa" />
                    </div>
                    <div className="task-list">
                        {tasks.map((task) =>
                            <div className="task-item" key={task.id}>
                                <input type="checkbox" id={`task-${task.id}`} defaultChecked={task.status} />
                                <label>{task.name}</label>
                                <button onClick={() => deleteTask(task.id)} className="delete-btn">&#10006;</button>
                                <button onClick={() => handleEditClick(task)} className="edit-btn">&#9998;</button>
                            </div>
                        )}
                    </div>
                </div>
                
                <button className="btn-new-task" onClick={toggleModal}>Nova tarefa</button>

                {showModal && (
                    <Modal
                        showHideModal={toggleModal}
                        addTask={addTask}
                        updateTask={handleUpdateTask}
                        editingTask={editingTask} // Passa a tarefa que está sendo editada
                    />
                )}
            </div>
        </main>
    );
};

export default Form;
