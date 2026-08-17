// =========================
// Get Book ID
// =========================

const params =
    new URLSearchParams(window.location.search);

const bookId =
    params.get("id");


// =========================
// Get HTML Containers
// =========================

const bookContainer =
    document.getElementById("book-page-container");

const chapterContainer =
    document.getElementById("chapter-container");


// =========================
// Check Book ID
// =========================

if (!bookId) {

    bookContainer.innerHTML = `
        <h1>
            Book Not Found
        </h1>

        <p>
            No book was selected.
        </p>
    `;

} else {


    // =========================
    // Load Book Data
    // =========================

    fetch("../data/books.json")

        .then((response) => {

            if (!response.ok) {
                throw new Error(
                    "Failed to load books.json"
                );
            }

            return response.json();

        })


        .then((books) => {

            // =========================
            // Find Selected Book
            // =========================

            const book = books.find(
                (book) => book.id === bookId
            );


            // =========================
            // Book Not Found
            // =========================

            if (!book) {

                bookContainer.innerHTML = `
                    <h1>
                        Book Not Found
                    </h1>

                    <p>
                        The book you are looking for
                        does not exist.
                    </p>
                `;

                throw new Error(
                    "Book not found"
                );
            }
// Set book cover as hero background

document.querySelector(".book-page").style.backgroundImage =
    `url("${book.cover}")`;


            // =========================
            // Display Book Information
            // =========================

            bookContainer.innerHTML = `


                <h1>
                    ${book.title}
                </h1>


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


                ${
                    book.download
                    ? `
                        <a
                            href="${book.download}"
                            class="btn primary-btn"
                            target="_blank"
                            rel="noopener"
                        >
                            Download Full Book
                        </a>
                    `
                    : ""
                }

            `;


            // =========================
            // Load Chapters
            // =========================

            return fetch(
                "../data/chapters.json"
            );

        })


        .then((response) => {

            if (!response.ok) {
                throw new Error(
                    "Failed to load chapters.json"
                );
            }

            return response.json();

        })


        .then((chapters) => {

            // =========================
            // Find Book Chapters
            // =========================

            const bookChapters =
                chapters.filter(
                    (chapter) =>
                        chapter.bookId === bookId
                );


            // =========================
            // No Chapters
            // =========================

            if (bookChapters.length === 0) {

                chapterContainer.innerHTML = `
                    <p>
                        No chapters available yet.
                    </p>
                `;

                return;
            }


            // =========================
            // Display Chapters
            // =========================

            bookChapters.forEach(
                (chapter) => {

                    const chapterCard =
                        document.createElement(
                            "article"
                        );


                    chapterCard.classList.add(
                        "chapter-card"
                    );


chapterCard.innerHTML = `

    <h3>
        Chapter ${chapter.number}
    </h3>


    <p>
        ${chapter.title}
    </p>


    <span>
        Pages: ${chapter.pages}
    </span>


    ${
        chapter.status === "published"

        ? `

            <a
                href="${chapter.download}"
                class="btn primary-btn"
                target="_blank"
                rel="noopener"
            >
                Download Chapter
            </a>

        `

        : `

            <span>
                Coming Soon
            </span>

        `
    }

`;

                    chapterContainer.appendChild(
                        chapterCard
                    );

                }
            );

        })


        // =========================
        // Error Handling
        // =========================

        .catch((error) => {

            console.error(
                "Error loading book system:",
                error
            );

        });

}