import React, {useState, useEffect} from "react";

//create your first component
const Home = () => {
		const [todos, setTodos]=useState([])
		const apiUrl="https://assets.breatheco.de/apis/fake/todos/user/Daniloemejias"

		async function LoadList(){
			let response=await fetch (apiUrl)
			if(response.ok){
				let date=await response.json()
				setTodos(data)
			}
			return response.status
		}


		useEffect(()=>{
			LoadList(async status=>{
				if(status==404){
					let response=await fetch(apiUrl,{
						method:"POST",
						body:"[]",
						headers:{
							"content-type":"application/json"
						}
						
					})
					.then((res) => {
						console.log(res);
						return res.json();
					})
					.then((data) => {
						console.log(data);
					})
					.catch();
					return LoadList()
				}
			})

		},[])

		function getModal(){
			return new bootstrap.Modal(document.getElementById('loading'))
		}

		function addTodo(e){
			if(e.key=="Enter"){
				//logica de agregar
				let modal=getModal()
				modal.show()
				let newItem={label:e.target.value,done:false}
				let newTodos=[...todos, newItem]
				setTodos(newTodos)
				e.target.value = ""
				modal.hide()
			}
		}
		function deleteTodo(index){
			//logica de borrar
			let newTodos=[...todos]
			newTodos.splice(index,1)
			setTodos(newTodos)
		}

		function checkTodo(index){
			let newTodos=[...todos]
			newTodos[index].done=!newTodos[index].done
			setTodos(newTodos)
		}

	return (
		<div className="card">
			<div className="card-header">
				<input className="form-control border-1 mb-1" type="text" onKeyDown={addTodo}/>
				<ol className="list-group list-group-flush">
					{todos.map((todo,index)=><li key={index} className="list-group-item d-flex justify-content-between align-item-center">
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
					</li>)}
				</ol>
			</div>
		</div>
	);
};

export default Home;
