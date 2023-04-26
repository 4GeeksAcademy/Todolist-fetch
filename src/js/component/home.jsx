import React, {useState, useEffect} from "react";

//create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [todos, setTodos] = useState([])
	useEffect(() => {
		getTodoList()
	}, [])

	async function addTodo (e) {
		if (e.code == "Enter") {
			const newTask = [...todos, { label: task, done: false }]
			let response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/Daniloemejias', {
				body: JSON.stringify(newTask),
				method: "PUT",
				headers: { "Content-Type": "application/json" }
			})
			if (!response.ok) {
				console.log(response.status + ": " + response.statusText)
				return
			}
			let data = await response.json()
			// setTodos([...todos, task])
			setTodos(newTask)
			setTask("")
		}
	}

	async function deleteTodo(index) {
		const newListTaks = [...todos]
		let objIndex = newListTaks.findIndex(task => task.index == index)
		newListTaks.splice(index, 1)
		setTodos(newListTaks)
		let response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/Daniloemejias', {
			body: JSON.stringify(newListTaks),
			method: "PUT",
			headers: { "Content-Type": "application/json" }
		})
		if (!response.ok) {
			console.error(response.status + ": " + response.statusText)
		}

	}

	function checkTodo(index) {
		let newTodos = [...todos]
		newTodos[index].done = !newTodos[index].done
		setTodos(newTodos)
	}

	function getTodoList() {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/Daniloemejias')
			.then(response => {
				if (response.ok) {
					return response.json()
				}
				else {
					console.log(response.status + ": " + response.statusText)
				}
			})
			.then(data => {
				console.log(data)
				setTodos(data)
			})
			.catch(error => {
				console.error(error)
			})
		console.log("Iniciada la peticion")
	}

	return (
		<div className="card">
			<div className="card-header">
				<input 
				className="form-control border-1 mb-1"
				type="text"
				onKeyDown={addTodo}
				onChange={(e)=>setTask(e.target.value)}
				
				/>

				<ol className="list-group list-group-flush">
					{todos.map((todo,index)=>(
					<li key={index} className="list-group-item d-flex justify-content-between align-item-center">
						<div>
							<input 
							className="form-check-input me-3" 
							type="checkbox" 
							onChange={()=>checkTodo(index)} 
							checked={todo.done}
							/>
							{todo.label}
						</div>
						<span onClick={()=>deleteTodo(index)} className="btn btn-outline-danger btn-sm rounded-pill">X</span>
					</li>))}
				</ol>
			</div>
			<div className="card-footer">
				{todos.length} Tareas pendientes
			</div>
		</div>
	);
};

export default Home;
