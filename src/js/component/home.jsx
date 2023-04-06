import { array } from "prop-types";
import React, {useState} from "react";

//create your first component
const Home = () => {
		const [task, setTask]=useState("");
		const [todos, setTodos]=useState(["Tarea 1","Tarea 2"])

		function addTask(e){
			if(e.code=="Enter"){
				//Aqui se agrega La tarea
				setTodos([...todos, task])
				setTask("")
			}
		}

		function delTask(index){
			//Aqui se elimina La tarea
			let newTodos=[...todos]
			newTodos.splice(index,1)
			setTodos(newTodos)

			/*setTodos([
				...todos.slice(0, index), 
				...todos.slice(index+1)
			])
			*/
		}

	return (
		<div className="card">
			<div className="card-header">
				<input
				type="text"
				className="form-control border-0"
				placeholder="Escribe una nueva tarea"
				value={task}
				onChange={(e)=>setTask(e.target.value)}
				onKeyDown={addTask}
				/>
			</div>
			<ul className="list-group list-group-flush">
				{todos.map((todo, index)=>(
					<li className="list-group-item d-flex justify-content-between align-item-center">
					{todo}
					<button onClick={()=>delTask(index)} className="btn btn-outline-danger btn-sm rounded-pill">X</button>
				</li>
				))}	
			</ul>
			<div className="card-footer">{todos.length} Items</div>
		</div>
	);
};

export default Home;
