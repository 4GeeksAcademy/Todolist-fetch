import React, {useState, useEffect} from "react";

//create your first component
const Home = () => {
		const [todos, setTodos]=useState([])
		const [task, setTask]=useState("")
		const apiUrl="https://assets.breatheco.de/apis/fake/todos/user/Daniloemejias"

		async function LoadList(){
			let response = await fetch (apiUrl)
			if(response.ok){
				let data = await response.json()
				setTodos(data)
			}
			return response.status
		}

		async function update(){
			let response = await fetch (apiUrl,{
				body: JSON. stringify(todos),
				method:"PUT",
				headers:{
				"content-type":"application/json"
			}

			})
			
			if(response.ok){
				let data = await response.json()
				console.log(data)
			}
			console.log (response.status)
		}

		useEffect(()=>{
			LoadList().then(async status=>{
				if(status==404){
					let response=await fetch(apiUrl,{
						method:"POST",
						body:"[]",
						headers:{
							"content-type":"application/json"
						}
						
					})
					.then((response) => {
						console.log(response);
						return response.json();
					})
					.then((data) => {
						console.log(data);
					})
					.catch();
					return LoadList()
				}
			})

		},[])

		function addTodo(e){
			if(e.key=="Enter"){
				//logica de agregar
				// LoadList()
				// let newItem={label:e.target.value,done:false}
				let newTodos=[...todos, {label:task,done:false}]
				setTodos(newTodos);
				update(newTodos);
				// e.target.value = ""
				setTask("")
			}
		}



		function deleteTodo(index){
			//logica de borrar
			// console.log(todos)
			let newTodos=[...todos]
			let objIndex = newTodos.findIndex(task => task.index == index)
			newTodos.splice(objIndex,1)
			setTodos(newTodos)
			update(newTodos)
		}

		function checkTodo(index){
			let newTodos=[...todos]
			newTodos[index].done=!newTodos[index].done
			setTodos(newTodos)
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
		</div>
	);
};

export default Home;
