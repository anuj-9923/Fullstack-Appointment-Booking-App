var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var edit = document.getElementById('edit');


var userDetail = {
    name: '',
    email: '',
    number: ''
}

form.addEventListener('submit', addedUser);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editDetails);


function addedUser(e) {
    e.preventDefault();
    var li = document.createElement('li');
    userDetail.name = document.getElementById('name').value;
    userDetail.email = document.getElementById('email').value;
    userDetail.number = document.getElementById('number').value;
    var userData = userDetail.name + ' ' + userDetail.email + ' ' + userDetail.number + ' ';
    axios.post('https://crudcrud.com/api/b5cd451ea20a4f91be8a08a4715a5b5f/appointmentData', userDetail)
        .then(response => {
            console.log(userDetail);
        })
        .catch((err) => {
            console.log(err);
        })

    li.appendChild(document.createTextNode(userData));
    //console.log(li);

    var deleteBtn = document.createElement('Button');
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = 'delete';
    var editBtn = document.createElement('Button');
    editBtn.className = 'edit';
    editBtn.innerHTML = 'Edit';
    li.appendChild((deleteBtn));
    li.appendChild((editBtn));
    //console.log(li);
    itemList.appendChild(li);
    console.log(itemList);
}
window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/b5cd451ea20a4f91be8a08a4715a5b5f/appointmentData', userDetail._id)
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                var li = document.createElement('li');
                var data = response.data[i].name + ' ' +
                    response.data[i].email + ' ' + response.data[i].number + ' ';
                li.appendChild(document.createTextNode(data));
                var deleteBtn = document.createElement('Button');
                deleteBtn.className = 'delete';
                deleteBtn.innerHTML = 'delete';
                deleteBtn.id = response.data[i]._id;
                var editBtn = document.createElement('Button');
                editBtn.className = 'edit';
                editBtn.innerHTML = 'Edit';

                li.appendChild((deleteBtn));
                li.appendChild((editBtn));
                itemList.appendChild(li);
                //console.log(itemList);
            }
        })
        .catch((err) => {
            console.log(err);
        })


})
function removeItem(e) {
    var newList = document.getElementById('items');
    console.log(newList);
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure')) {
            var li = e.target.parentElement;
            //itemList.removeChild(li);
            itemList.removeChild(li);
            //console.log(li);
            var chis = li.children[0];
            console.log(chis.id);
            axios.delete('https://crudcrud.com/api/b5cd451ea20a4f91be8a08a4715a5b5f/appointmentData/' + chis.id);


        }
    }
}


function editDetails(e) {

    if (e.target.classList.contains('edit')) {
        //console.log(userDetail.name);
        var li = e.target.parentElement;
        console.log(li);
        var chis = li.children[0];
        var idNo = chis.id;
        //console.log(idNo);
        const { name, email, number } = userDetail;
        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('number').value = number;

        axios.put('https://crudcrud.com/api/b5cd451ea20a4f91be8a08a4715a5b5f/appointmentData/' + idNo)
    }
}