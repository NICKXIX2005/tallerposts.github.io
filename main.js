const postsTableBody = document.getElementById('postsTable').getElementsByTagName('tbody')[0];
        const postTitle = document.getElementById('postTitle');
        const postBody = document.getElementById('postBody');

        let currentPostId = null; // Guardar el ID del post seleccionado

        //obtener los posts y llenar la tabla
        function fetchPosts() {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(data => {
                    data.forEach(post => {
                        const row = postsTableBody.insertRow();
                        row.innerHTML = `<td>${post.id}</td><td>${post.title}</td>`;
                        row.onclick = () => showPost(post.id); // Mostrar post al hacer clic
                    });
                })
                .catch(error => console.error('Error al obtener los posts:', error));
        }

        //mostrar un post en la card
        function showPost(id) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(response => response.json())
                .then(post => {
                    currentPostId = post.id; // Guardar el ID del post seleccionado
                    postTitle.textContent = post.title;
                    postBody.textContent = post.body;
                })
                .catch(error => console.error('Error al mostrar el post:', error));
        }

        //editar el post
        function editPost() {
            if (currentPostId === null) {
                alert('Selecciona un post primero.');
                return;
            }

            const newTitle = prompt('Nuevo título:', postTitle.textContent);
            const newBody = prompt('Nuevo cuerpo:', postBody.textContent);

            if (newTitle && newBody) {
                postTitle.textContent = newTitle;
                postBody.textContent = newBody;
                alert('Post editado (simulado)');
            }
        }

        //crear un nuevo post
        function createPost() {
            const title = prompt('Introduce el título del nuevo post:');
            const body = prompt('Introduce el cuerpo del nuevo post:');

            if (title && body) {
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, body, userId: 1 })
                })
                    .then(response => response.json())
                    .then(newPost => {
                        alert('Post creado con éxito');
                        // Mostrar el nuevo post en la card
                        postTitle.textContent = newPost.title;
                        postBody.textContent = newPost.body;
                        currentPostId = newPost.id;

                        // Agregar el nuevo post a la tabla
                        const row = postsTableBody.insertRow();
                        row.innerHTML = `<td>${newPost.id}</td><td>${newPost.title}</td>`;
                        row.onclick = () => showPost(newPost.id);
                    })
                    .catch(error => console.error('Error al crear el post:', error));
            }
        }

        // Cargar los posts al abrir la página
        fetchPosts();