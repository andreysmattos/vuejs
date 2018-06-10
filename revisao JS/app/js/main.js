
var lista = [
{
	desc: "arroz",
	qtd: '1',
	value: '5.40'
},
{
	desc: "cerveja",
	qtd: '12',
	value: '1.99'
},{
	desc: "carne",
	qtd: '1',
	value: '15'
}
]




function getTotal (obj){
	var total = 0;
	for(k in obj){
		total += parseFloat(obj[k].value) * parseInt(obj[k].qtd);

	}

	return total.toFixed(2);


}


function setList(obj){
	var table = ' <thead> <tr><td>Descrição</td><td>Quantidade</td><td>Preço</td><td>Ação</td></tr></thead><tbody>';

	for(k in obj){
		table += '<tr>';
		table += '<td>'+formatDesc(obj[k].desc) +'</td>';
		table += '<td>'+formatQtd(obj[k].qtd)+'</td>';
		table += '<td>'+formatValue(obj[k].value)+'</td>';
		table += '<td><button class="btn btn-default" onClick="setUpdate('+k+')"> Editar </button> <button class="btn btn-default" onClick="deleteItem('+k+')">Deletar</button></td>';
		table += '</tr>';
	}

	table += "<tr><td></td><td></td><td>Total</td><td>"+getTotal(lista)+"</td></tr>";
	table += "</tbody>";

	return table;
}


function deleteItem(id){

	if(confirm('Deletar esse item?')){
		lista.splice(id, 1);
		document.getElementById('list-table').innerHTML = setList(lista);
		
	}


}

function deletelist(){

	if(confirm("Deseja deletar TODOS itens da tabela?")){
		lista = [];

		document.getElementById('list-table').innerHTML = setList(lista);
	}
}

function resetItens(){
	document.getElementById('desc').value = '';
	document.getElementById('qtd').value = '';
	document.getElementById('valor').value = '';
}


function valida(){

	var desc = document.getElementById('desc').value;
	var qtd = document.getElementById('qtd').value;
	var valor = document.getElementById('valor').value;

	var error = '';

	if(desc === ""){
		error += '<p> Descrição está vazia.</p>';
	}

	if(qtd == ''){
		error += '<p> Quantidade está vazia.</p>';
	} else if(qtd != parseInt(qtd)){
		error += '<p> Quantidade precisa ser um valor inteiro.</p>';
	}

	if(valor == ''){
		error += '<p> Valor está vazio.</p>';
	} else if(valor != parseFloat(valor)){
		error += '<p> Quantidade precisa ser um valor inteiro.</p>';
	}


	if(error != ""){
		document.getElementById('error').innerHTML = "<h3>Erros: </h3> "+error;
		return 0;
	} else {
		document.getElementById('error').innerHTML = '';
		return 1;
	}


}


function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}


function formatQtd(valor){
	return parseInt(valor);
}


function formatValue(value){
	console.log(value);
	var valor = parseFloat(value).toFixed(2) + '';
	valor = valor.replace('.', ',');
	valor = 'R$ ' + valor;
	return valor;
}

function setUpdate(id){

	

	var obj = lista[id];

	console.log(obj);

	document.getElementById('desc').value = obj.desc;
	//console.log(desc);

	document.getElementById('qtd').value = obj.qtd;
	//console.log(qtd);

	document.getElementById('valor').value = obj.value;

	document.getElementById('btnAdd').style.opacity = 0;
	document.getElementById('btnUpdate').style.display = 'inline-block';
	document.getElementById('guardaid').value = id;

	
}

function updateForm(){


	if(!valida()){
		return;
	}

	key = document.getElementById('guardaid').value;
	lista[key] = 
	{
		desc: document.getElementById('desc').value,
		qtd: document.getElementById('qtd').value,
		value: document.getElementById('valor').value
	}

	//console.log(lista)
	document.getElementById('list-table').innerHTML = setList(lista);
	resetForm();
}


function resetForm(){
	document.getElementById('desc').value = '';
	//console.log(desc);

	document.getElementById('qtd').value = '';
	//console.log(qtd);

	document.getElementById('valor').value = '';

	document.getElementById('btnAdd').style.opacity = 1;
	document.getElementById('btnUpdate').style.display = 'none';

	document.getElementById('guardaid').value = null;
}




document.getElementById('list-table').innerHTML = setList(lista);


function addDados(form){

	if(!valida()){
		return;
	}

	var desc = document.getElementById('desc').value;
	//console.log(desc);

	var qtd = document.getElementById('qtd').value;
	//console.log(qtd);

	var valor = document.getElementById('valor').value;
//	console.log(typeof valor);


lista.unshift({desc: desc, qtd: qtd, value: valor});

	//console.log(lista);

	document.getElementById('list-table').innerHTML = setList(lista);

}