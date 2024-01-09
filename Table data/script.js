'use strict';

const reloadBtn = document.querySelector(".reload");
const cleanBtn = document.querySelector(".clean");
const deleteBtn = document.querySelector(".delete");
const tableBody = document.querySelector('.tableBody');





const selectedPosts = [];

const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        displayTableData(data.slice(0, 5));
    } catch (error) {
        console.error('ERROR:', error);
    }
};

fetchPosts();

const displayTableData = (data) => {
    tableBody.innerHTML = "";

    data.forEach((dataItem) => {
        const { id, userId, title } = dataItem;
        tableBody.innerHTML += `<tr>
        <td>${id}</td>
        <td>${userId}</td>
        <td>${title.slice(0, 20)}</td>
        <td><input class="checkbox" type="checkbox" data-id=${id}></td>
        </tr>`;
    });

    const inputChecks = document.querySelectorAll('.checkbox');

    inputChecks.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const id = event.target.dataset.id;
            if (event.target.checked && !selectedPosts.includes(id)) {
                selectedPosts.push(id);
            } else if (!event.target.checked && selectedPosts.includes(id)) {
                const indexToRemove = selectedPosts.indexOf(id);
                selectedPosts.splice(indexToRemove, 1);
            }
            console.log(selectedPosts);
        });
    });
};

reloadBtn.addEventListener('click', fetchPosts);

cleanBtn.addEventListener('click', () => { 
    tableBody.innerHTML = "";
    selectedPosts.length = 0; 
});

deleteBtn.addEventListener('click', () => {
    const inputChecks = document.querySelectorAll('.checkbox');
    inputChecks.forEach((checkbox) => {
        if (checkbox.checked) {
            const id = checkbox.dataset.id;
            const row = checkbox.parentNode.parentNode; 
            row.parentNode.removeChild(row); 
            const indexToRemove = selectedPosts.indexOf(id);
            selectedPosts.splice(indexToRemove, 1); 
        }
    });
});





const postId = document.querySelector(".postId")
const userId = document.querySelector(".userId")
const getBtn = document.querySelector(".get");

getBtn.addEventListener('click', async () => {
    const postIdValue = postId.value;
    const userIdValue = userId.value;

  
        let url = 'https://jsonplaceholder.typicode.com/posts';
        if (postIdValue && userIdValue) {
            url += `?userId=${userIdValue}&id=${postIdValue}`;
        } else if (postIdValue) {
            url += `?id=${postIdValue}`;
        } else if (userIdValue) {
            url += `?userId=${userIdValue}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        displayTableData(data.slice(0, 5));
 
});
