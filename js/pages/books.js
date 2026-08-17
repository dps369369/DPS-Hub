// =========================
// Get Book Container
// =========================

const bookContainer =
    document.getElementById("book-container");


// =========================
// Load Books
// =========================

fetch("../data/books.json")

    .then((response) => {

        if (!response.ok) {
            throw new Error("Failed to load books.json");
        }

        return response.json();

    })

    .then((books) => {

        // Clear container

        bookContainer.innerHTML = "";


        // Check if books exist

        if (!Array.isArray(books) || books.length === 0) {

            bookContainer.innerHTML = `
                <p>
                    No books are currently available.
                </p>
            `;

            return;
        }


        // =========================
        // Generate Book Cards
        // =========================

        books.forEach((book) => {

            const bookCard =
                document.createElement("article");

            bookCard.classList.add("book-card");


            bookCard.innerHTML = `

                <img
                    src="${book.cover}"
                    alt="${book.title} book cover"
                >


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
                        Status: ${book.status}
                    </span>

                </div>


                <a
                    href="./book.html?id=${book.id}"
                    class="btn primary-btn"
                >
                    View Book
                </a>

            `;


            bookContainer.appendChild(bookCard);

        });

    })

    .catch((error) => {

        console.error(
            "Error loading books:",
            error
        );


        bookContainer.innerHTML = `
            <p>
                Unable to load the book collection.
            </p>
        `;

    });