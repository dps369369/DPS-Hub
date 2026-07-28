const bookContainer = document.getElementById("book-container");

fetch("../data/books.json")
    .then((response) => response.json())

    .then((books) => {
        books.forEach((book) => {
            const bookCard = document.createElement("article");

            bookCard.classList.add("book-card");

            bookCard.innerHTML = `

                <img src="${book.cover}" alt="${book.title}">


                <h3>
                    ${book.title}
                </h3>
                <p>
    ${book.description}
</p>


<div class="book-info">

    <span>
        Author: ${book.author}
    </span>

    <span>
        Published: ${book.published}
    </span>

    <span>
        ${book.pages}
    </span>

</div>

                <a href="${book.download}"
                class="btn primary-btn"
                download>

                    Download

                </a>

            `;

            bookContainer.appendChild(bookCard);
        });
    })

    .catch((error) => {
        console.error("Error loading books:", error);
    });
